import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    PayloadAction,
    createSelector
} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";





export interface Notification{
    isRead: boolean;
    text: string;
    date: Date;
    id:string;
    cta: string;
    type: "invite" | "info"
}
const notificationsAdapter = createEntityAdapter<Notification>()
const initialState: EntityState<Notification> & {  error: null | string | undefined;  } = notificationsAdapter.getInitialState({
    error: null
})

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (userId: string) => {


        try {
            const notifications: Array<Notification> = [
                {id: "123",isRead: false, date: new Date("2022-09-22 12:24:16"), text: "Otrzymałes zaproszenie od {email1}", cta:"d.jarzyna@gmail.com", type: "invite" },
                {id: "124",isRead: false, date: new Date("2022-08-29 18:24:16"), text: "{email} dodal cukier" ,cta:"", type: "info"},
                {id: "125",isRead: true, date: new Date("2022-06-22 19:24:16"), text: "{email} usunąl makaron",cta:"", type: "info" },
                {id: "126",isRead: false, date: new Date("2022-11-22 09:24:16"), text: "Otrzymałes zaproszenie od {email4}",cta:"zosiajarzyna@gmail.com", type: "invite" }
            ]
            return notifications
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
const  notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {

        },
    extraReducers(builder) {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {

               notificationsAdapter.upsertMany(state, action.payload as Notification[])
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
export default notificationsSlice.reducer