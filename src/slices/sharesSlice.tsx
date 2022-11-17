import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    createSelector, PayloadAction
} from '@reduxjs/toolkit'
import {RootState} from "../app/store";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    Timestamp,
    deleteDoc
} from "firebase/firestore";
import {db} from "../firebase";



export interface Invite{
    user_id: string;
    user_email: string;
    date:  { seconds:number, nanoseconds: number}|null;
    id:string;
    direction: "outgoing" | "incoming";
    status: "accepted" | "rejected" | "pending" | "noUserExist"
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

export const deleteShareWithStatusNoUserExist = createAsyncThunk<string, IncomingSharesParams> ('shares/deleteShareWithStatusNoUserExist', async (incomingSharesParams: IncomingSharesParams)=> {
    try {
        await deleteDoc(doc(db, "users/" + incomingSharesParams.userId + "/shares/", incomingSharesParams.shareId))


    }    catch(error){
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
            .addCase(deleteShareWithStatusNoUserExist.fulfilled,(state, action)=>{
                sharesAdapter.removeOne(state, action.payload as string)
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
export const selectAcceptedIncomingInvites = createSelector(
    [(state: RootState) => selectAllShares(state)],
    (shares)=> shares.filter((invite: Invite) => invite.direction === "incoming" && invite.status === "accepted")
)
// export const selectOutgoingSharesByUserEmail= (userEmail: string) => createSelector(
//     [(state: RootState) => selectAllShares(state)],
//     (shares)=> shares.filter((invite: Invite) => invite.direction === "outgoing" && invite.user_email === userEmail)
// )
export const {addShare, modifyShare} = sharesSlice.actions
export default sharesSlice.reducer
