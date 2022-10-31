import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    createSelector, PayloadAction
} from '@reduxjs/toolkit'
import {RootState} from "../app/store";
import {addDoc, collection, doc, getDoc, getDocs, query, updateDoc, deleteDoc, Timestamp} from "firebase/firestore";
import {db} from "../firebase";
import {Notification} from "./notificationsSlice";

export interface Invite{
    user_id: string;
    user_email: string;
    date:  { seconds:number, nanoseconds: number}|null;
    id:string;
    direction: "outgoing" | "incoming";
    status: "accepted" | "rejected" | "pending"
}
const sharesAdapter = createEntityAdapter<Invite>()
const initialState: EntityState<Invite>&{  error: null | string | undefined;  } = sharesAdapter.getInitialState({
    error: null
})

export const fetchShares = createAsyncThunk('shares/fetchShares', async (userId: string) => {

    try {
        const shares: Array<Invite> = [];
        if (userId === "")
            return shares

        let q = await query(collection(db, "users/" + userId + "/shares"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((result) => {

            let shareDoc = result.data() as Invite;
            shareDoc.id = result.id;
            let shareDate: Date | null = null;

            if( shareDoc.date !== null){
                let notificationTimestamp = Timestamp.fromMillis(shareDoc.date.seconds*1000);
                //
                shareDate = notificationTimestamp.toDate();
            }
            let share = {...shareDoc, date: shareDate} as Invite

            shares.push(share);
        })
        return shares
        // try {
        //     const shares: Array<Invite> = [
        //         {id: "154",direction: "outgoing", date: new Date("2022-09-22 12:24:16"),  user_email:"d.jarzyna@gmail.com", user_id: "12",status: "accepted" },
        //         {id: "155",direction: "incoming", date: new Date("2022-08-29 18:24:16")  ,user_email:"d.jarzyna@gmail.com", user_id: "13", status: "pending"},
        //         {id: "165",direction: "outgoing", date: new Date("2022-06-22 19:24:16") ,user_email:"d.jarzyna@gmail.com", user_id: "14" , status: "rejected"},
        //         {id: "167",direction: "incoming", date: new Date("2022-11-22 09:24:16"), user_email:"zosiajarzyna@gmail.com", user_id: "15", status: "accepted" },
        //         {id: "168",direction: "outgoing", date: new Date("2022-09-22 12:24:16"), user_email:"d.jarzyna@gmail.com", user_id: "16", status: "rejected" },
        //         {id: "178",direction: "incoming", date: new Date("2022-08-29 18:24:16") ,user_email:"koteczek@gmail.com", user_id: "17", status: "pending"},
        //         {id: "189",direction: "outgoing", date: new Date("2022-06-22 19:24:16"),user_email:"gabijarzyna@gmail.com", user_id: "18", status: "accepted" },
        //         {id: "156 ",direction: "incoming", date: new Date("2022-11-22 09:24:16") ,user_email:"zosiajarzyna@gmail.com", user_id: "19", status: "rejected"},
        //     ]
        //     return shares
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
export type AddOutgoingToSharesParams = {
    userId: string
    outgoingEmail: string
}
 export const addOutgoingToShares = createAsyncThunk<Invite,AddOutgoingToSharesParams>('shares/addOutgoingToShares', async ( addOutgoingToSharesParams: AddOutgoingToSharesParams) => {

         const newInvite = {
             user_email: addOutgoingToSharesParams.outgoingEmail,
             date: Timestamp.now(),
             direction: "outgoing",
             status: "pending",
             user_id: ""
         }
         try {
             let result = await addDoc(collection(db, "users/" + addOutgoingToSharesParams.userId + "/shares"), newInvite);
             return {...newInvite, id: result.id} as Invite;
         } catch (error){
             console.log(error)
             return {} as Invite
         }

     }
 )
export type IncomingSharesParams = {
    userId: string
    shareId: string
}
export const acceptIncomingShares = createAsyncThunk<string, IncomingSharesParams>('shares/acceptIncomingShares', async (incomingSharesParams: IncomingSharesParams)=>{
   try{
       const docRef = doc(db, "users/" + incomingSharesParams.userId + "/shares/" + incomingSharesParams.shareId);
       await getDoc(docRef);
       await updateDoc(docRef, "status", "accepted");

   }catch (error){
        console.log(error)
   }


   return incomingSharesParams.shareId
})
 export const cancelAcceptedShare = createAsyncThunk<string, IncomingSharesParams> ('shares/cancelAcceptedShare', async (incomingSharesParams: IncomingSharesParams)=> {
     try{
         const docRef = doc(db, "users/" + incomingSharesParams.userId + "/shares/" + incomingSharesParams.shareId);
         await getDoc(docRef);
         await updateDoc(docRef, "status", "rejected");


     }catch (error){
         console.log(error)
     }

     return incomingSharesParams.shareId
 })
export const restorationAccount = createAsyncThunk<string, IncomingSharesParams> ('shares/restorationAccount', async (incomingSharesParams: IncomingSharesParams)=> {
    try{
        const docRef = doc(db, "users/" + incomingSharesParams.userId + "/shares/" + incomingSharesParams.shareId);
        await getDoc(docRef);
        await updateDoc(docRef, "status", "accepted");


    }catch (error){
        console.log(error)
    }

    return incomingSharesParams.shareId
})
const  sharesSlice = createSlice({
    name: 'shares',
    initialState,
    reducers: {
        addShare: (state, action: PayloadAction<Invite>)=>{
            sharesAdapter.addOne(state, action.payload)
        },
        modifyShare: (state, action:PayloadAction<Invite>)=>{
            sharesAdapter.setOne(state, action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchShares.fulfilled, (state, action) => {
                sharesAdapter.upsertMany(state, action.payload as Invite[])
            })
            .addCase(addOutgoingToShares.fulfilled, (state,action) =>{
                sharesAdapter.addOne(state, action.payload as Invite)
            })
            .addCase(acceptIncomingShares.fulfilled,(state, action)=>{
                console.log(action.payload)
                sharesAdapter.updateOne(state, {id:action.payload, changes: {status: "accepted"}})
            })
            .addCase(cancelAcceptedShare.fulfilled,(state, action)=>{
                sharesAdapter.updateOne(state, {id:action.payload, changes: {status: "rejected"}})
            })
            .addCase(restorationAccount.fulfilled,(state, action)=>{
                sharesAdapter.updateOne(state, {id:action.payload, changes: {status: "accepted"}})
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
export const {addShare, modifyShare} = sharesSlice.actions
export default sharesSlice.reducer