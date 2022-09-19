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
    date: Date
}
const notificationsAdapter = createEntityAdapter<Notification>()
const initialState: EntityState<Notification> & {  error: null | string | undefined; isRead: boolean; text : string; date: Date | null } = notificationsAdapter.getInitialState({
    error: null,
    isRead: false,
    text: "",
    date: null
})

const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async () => {


        try {
            const notifications: Array<Notification> = [
                {isRead: false, date: new Date("2022-09-22 12:24:16"), text: "Otrzymałes zaproszenie od {email1}" },
                {isRead: false, date: new Date("2022-08-29 18:24:16"), text: "Otrzymałes zaproszenie od {email2}" },
                {isRead: true, date: new Date("2022-06-22 19:24:16"), text: "Otrzymałes zaproszenie od {email3}" },
                {isRead: false, date: new Date("2022-11-22 09:24:16"), text: "Otrzymałes zaproszenie od {email4}" }
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
export default notificationsSlice.reducer