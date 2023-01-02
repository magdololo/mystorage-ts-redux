import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../firebase";
import {RootState} from "../app/store";

export interface ImagePharmacy {
    url: Required<string>;
    id: Required<string>;
    uid: string | null;
}

export interface ImagePharmacyFromUser {
    newPicture: File,
    newPictureName: string,
    uid: string
}

const imagesPharmacyAdapter = createEntityAdapter<ImagePharmacy>()
const initialState: EntityState<ImagePharmacy> & { error: null | string | undefined; status: string; imagePharmacyFromUser: ImagePharmacyFromUser | null; } = imagesPharmacyAdapter.getInitialState({
    status: 'idle',
    error: null,
    imagePharmacyFromUser: null

})

export const fetchImagesPharmacy = createAsyncThunk("imagesPharmacy/fetchImagesPharmacy", async () => {
    try {
        const imagesPharmacyDefault: Array<ImagePharmacy> = []
        const q = await query(collection(db, "imagesPharmacy"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let imageDoc = doc.data() as ImagePharmacy;
            imageDoc.id = doc.id;
            imagesPharmacyDefault.push(imageDoc);


        })
        return imagesPharmacyDefault

    } catch (error) {
        console.log(error)
    }

})


const imagesPharmacySlice = createSlice({
    name: "imagesPharmacy",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchImagesPharmacy.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchImagesPharmacy.fulfilled, (state, action) => {
                state.status = 'succeeded'
                imagesPharmacyAdapter.upsertMany(state, action.payload as ImagePharmacy[])
            })
            .addCase(fetchImagesPharmacy.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
});

export const {
    selectAll: selectAllImagesPharmacy,
    selectById: selectImagePharmacyById,
    selectIds: selectImagesPharmacyIds

} = imagesPharmacyAdapter.getSelectors<RootState>((state) => state.imagesPharmacy);

export default imagesPharmacySlice.reducer