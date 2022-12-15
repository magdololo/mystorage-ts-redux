import {createAsyncThunk, createEntityAdapter, createSlice, EntityState} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../firebase";
import {
    ProductFromDictionary,
} from "./allProductsSlice";


export interface UserMedicine {
    medicineId: Required<string>;
    name: Required<string>;
    categoryId: Required<string>;
    capacity: Required<number | null>;
    unit: Required<string>;
    quantity: Required<number | null>;
    expireDate: Date | null;
    userId: string;
    id: string;

}

export interface MedicineFromDictionary {
    id: Required<string>;
    name: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    userId: null | string;

}

const allMedicinesAdapter = createEntityAdapter<MedicineFromDictionary>({
    sortComparer: (a: MedicineFromDictionary, b: MedicineFromDictionary) => {
        let aTitle = a.name.toLowerCase();
        let bTitle = b.name.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});
const initialState: EntityState<MedicineFromDictionary> & { error: null | string | undefined; status: string; medicineFromDictionaryId: string } = allMedicinesAdapter.getInitialState({
    status: 'idle',
    error: null,
    medicineFromDictionaryId: ""

})
export const fetchMedicineFromDictionaryId = createAsyncThunk<MedicineFromDictionary, UserMedicine, { //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('allMedicines/fetchMedicineFromDictionaryId', async (userMedicine, thunkApi) => {

    let allMedicines = selectAllMedicines(thunkApi.getState())
    let medicineFromDictionary = allMedicines.find((medicine) => medicine.name === userMedicine.name && medicine.capacity === userMedicine.capacity && medicine.unit === userMedicine.unit)
    if (medicineFromDictionary)
        return medicineFromDictionary as MedicineFromDictionary
    let dictionaryMedicine = {
        name: userMedicine.name,
        capacity: userMedicine.capacity,
        unit: userMedicine.unit,
        userId: userMedicine.userId,
    }
    let result = await addDoc(collection(db, "allMedicines/"), dictionaryMedicine);
    return {...dictionaryMedicine, id: result.id} as ProductFromDictionary

})


export const fetchAllMedicines = createAsyncThunk('allMedicines/fetchAllMedicines', async () => {

        try {
            const allMedicines: Array<MedicineFromDictionary> = [];
            let q = await query(collection(db, "allMedicines"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let productDoc = doc.data() as MedicineFromDictionary;
                productDoc.id = doc.id;
                allMedicines.push(productDoc);

            })
            return allMedicines
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)

const allMedicinesSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllMedicines.fulfilled, (state, action) => {
                state.status = 'succeeded'
                allMedicinesAdapter.upsertMany(state, action.payload as MedicineFromDictionary[])
            })
            .addCase(fetchMedicineFromDictionaryId.fulfilled, (state, action) => {
                state.medicineFromDictionaryId = action.payload.id
                allMedicinesAdapter.upsertOne(state, action.payload)
            })
            .addCase(fetchMedicineFromDictionaryId.rejected, (state, action) => {
                console.log(action.error)
            })


    }
})

export const {
    selectAll: selectAllMedicines,
    // selectById: selectProductById,
    // selectIds: selectProductIds,

    // Pass in a selector that returns the posts slice of state
} = allMedicinesAdapter.getSelectors<RootState>((state) => state.allMedicines);

export default allMedicinesSlice.reducer