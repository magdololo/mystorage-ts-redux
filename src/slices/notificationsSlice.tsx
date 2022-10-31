import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    createSelector, PayloadAction
} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../app/store";
import {collection, getDocs, query, Timestamp, updateDoc, where} from "firebase/firestore";
import {db} from "../firebase";
import {Invite} from "./sharesSlice";
import {UserProduct} from "./userProductsSlice";





export interface Notification{
    isRead: boolean;
    date:  { seconds:number, nanoseconds: number}|null;
    id:string;
    cta: string;
    type: "invite" | "info"
    change: string
}
const notificationsAdapter = createEntityAdapter<Notification>()
const initialState: EntityState<Notification> & {  error: null | string | undefined;  } = notificationsAdapter.getInitialState({
    error: null
})

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (userId: string) => {
    try {
    const notifications: Array<Notification> = [];
    if (userId === "")
        return notifications

    let q = await query(collection(db, "users/" + userId + "/notifications"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((result) => {

        let notificationDoc = result.data() as Notification;
        notificationDoc.id = result.id;

        let notificationDate: Date | null = null;

        if( notificationDoc.date !== null){
            let notificationTimestamp = Timestamp.fromMillis(notificationDoc.date.seconds*1000);
            //
            notificationDate = notificationTimestamp.toDate();
        }
        let notification = {...notificationDoc, date: notificationDate} as Notification

        notifications.push(notification);
    })
    return notifications
        // try {
        //     const notifications: Array<Notification> = [
        //         {id: "123",isRead: false, date: new Date("2022-09-22 12:24:16"), cta:"d.jarzyna@gmail.com", type: "invite" },
        //         {id: "124",isRead: false, date: new Date("2022-08-29 18:24:16"),cta:"", type: "info"},
        //         {id: "125",isRead: true, date: new Date("2022-06-22 19:24:16"),cta:"", type: "info" },
        //         {id: "126",isRead: false, date: new Date("2022-11-22 09:24:16"),cta:"zosiajarzyna@gmail.com", type: "invite" },
        //         {id: "127",isRead: false, date: new Date("2022-09-22 12:24:16"), cta:"d.jarzyna@gmail.com", type: "invite" },
        //         {id: "128",isRead: false, date: new Date("2022-08-29 18:24:16"), cta:"", type: "info"},
        //         {id: "129",isRead: true, date: new Date("2022-06-22 19:24:16"),cta:"", type: "info" },
        //         {id: "131 ",isRead: false, date: new Date("2022-11-22 09:24:16"),cta:"zosiajarzyna@gmail.com", type: "invite" },
        //     ]
        //     return notifications
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)


export const changeUnreadNotificationsToRead = createAsyncThunk<Notification[], string,{ //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('notifications/changeUnreadNotificationsToRead', async(userId, thunkApi)=> {

    let unReadNotifications = selectUnReadNotifications(thunkApi.getState())
    console.log(unReadNotifications, "hej z changeto read")

    const newNotifications: Notification[] = [];
     unReadNotifications.forEach((notification) => {
        const newNotification = {...notification, isRead:true}
        newNotifications.push(newNotification)
    })

    let q = await query(collection(db, "users/" + userId + "/notifications"), where("isRead", "==", false));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((result) => {
        let notificationDoc = result.data() as Notification ;
        console.log(notificationDoc)
        updateDoc (result.ref, {isRead: true})
    })

    return newNotifications

})


const  notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
            addNotification: (state, action: PayloadAction<Notification>)=>{
                notificationsAdapter.addOne(state, action.payload)
            },
           modifyNotification: (state, action:PayloadAction<Notification>)=>{
                notificationsAdapter.setOne(state, action.payload)
           }
        },
    extraReducers(builder) {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
               notificationsAdapter.upsertMany(state, action.payload as Notification[])
            })
            .addCase(changeUnreadNotificationsToRead.fulfilled, (state, action)=>{
                notificationsAdapter.setAll(state, action.payload as Notification[])
            })
    }
})
export const {
    selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors<RootState>((state) => state.notifications);
export const selectUnReadNotifications = createSelector(
    [(state: RootState) => selectAllNotifications(state)],
    (notifications) => notifications.filter((notification: Notification) => notification.isRead === false)
);
export const selectInfoNotifications = createSelector(
    [(state: RootState) => selectAllNotifications(state)],
    (notifications) => notifications.filter((notification: Notification) => notification.type === "info")
)
export const {addNotification, modifyNotification} = notificationsSlice.actions
export default notificationsSlice.reducer