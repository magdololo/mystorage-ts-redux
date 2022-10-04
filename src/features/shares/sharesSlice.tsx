import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    createSelector
} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";




export interface Invite{
    user_id: string;
    user_email: string;
    text: string;
    date: Date;
    id:string;
    direction: "outgoing" | "incoming";
    status: "accepted" | "rejected" | ""
}
const sharesAdapter = createEntityAdapter<Invite>()
const initialState: EntityState<Invite>&{  error: null | string | undefined;  } = sharesAdapter.getInitialState({
    error: null
})

export const fetchShares = createAsyncThunk('shares/fetchShares', async (userId: string) => {


        try {
            const shares: Array<Invite> = [
                {id: "154",direction: "outgoing", date: new Date("2022-09-22 12:24:16"), text: "Otrzymałes zaproszenie od {email1}", user_email:"d.jarzyna@gmail.com", user_id: "12",status: "accepted" },
                {id: "155",direction: "incoming", date: new Date("2022-08-29 18:24:16"), text: "{email} dodal cukier" ,user_email:"d.jarzyna@gmail.com", user_id: "13", status: ""},
                {id: "165",direction: "outgoing", date: new Date("2022-06-22 19:24:16"), text: "{email} usunąl makaron",user_email:"d.jarzyna@gmail.com", user_id: "14" , status: "rejected"},
                {id: "167",direction: "incoming", date: new Date("2022-11-22 09:24:16"), text: "Otrzymałes zaproszenie od {email4}",user_email:"zosiajarzyna@gmail.com", user_id: "15", status: "accepted" },
                {id: "168",direction: "outgoing", date: new Date("2022-09-22 12:24:16"), text: "Otrzymałes zaproszenie od {email1}", user_email:"d.jarzyna@gmail.com", user_id: "16", status: "rejected" },
                {id: "178",direction: "incoming", date: new Date("2022-08-29 18:24:16"), text: "{email} dodal cukier" ,user_email:"koteczek@gmail.com", user_id: "17", status: ""},
                {id: "189",direction: "outgoing", date: new Date("2022-06-22 19:24:16"), text: "{email} usunąl makaron",user_email:"gabijarzyna@gmail.com", user_id: "18", status: "accepted" },
                {id: "156 ",direction: "incoming", date: new Date("2022-11-22 09:24:16"), text: "Otrzymałes zaproszenie od {email4}",user_email:"zosiajarzyna@gmail.com", user_id: "19", status: "rejected"},
            ]
            return shares
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)

const  sharesSlice = createSlice({
    name: 'shares',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(fetchShares.fulfilled, (state, action) => {
                sharesAdapter.upsertMany(state, action.payload as Invite[])
            })

    }
})
export const {
    selectAll: selectAllShares,
} = sharesAdapter.getSelectors<RootState>((state) => state.shares);
export const selectOutgoingInvites = createSelector(
    [(state: RootState) => selectAllShares(state)],
    (shares) => shares.filter((invite: Invite) => invite.direction === "outgoing")
);
export const selectIncomingInvites = createSelector(
    [(state: RootState) => selectAllShares(state)],
    (shares)=> shares.filter((invite: Invite) => invite.direction === "incoming")
)
export default sharesSlice.reducer
