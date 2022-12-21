import {
    createAsyncThunk,
    createEntityAdapter,
    //createSelector,
    createSlice,
    EntityState,
    PayloadAction
} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/store";
import {addDoc, collection, deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {fetchMedicineFromDictionaryId} from "./allMedicinesSlice";
import {notify} from "../helpers";
// import {fetchProductFromDictionaryId} from "./allProductsSlice";
// import {UserProduct} from "./userProductsSlice";

export interface UserMedicine {
    id: string,
    medicineId: Required<string>;
    name: Required<string>;
    categoryId: Required<string>;
    capacity: Required<number | null>;
    unit: Required<string>;
    quantity: Required<number | null>;
    expireDate: Date | null;
    openDate: Date | null;
    validityDate: number;
    userId: string;
}
const userMedicinesAdapter = createEntityAdapter<UserMedicine>({
    sortComparer: (a: UserMedicine, b: UserMedicine) => {
        let aTitle = a.name.toLowerCase();
        let bTitle = b.name.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
})
const initialState: EntityState<UserMedicine> & { error: null | string | undefined; status: string; editMedicine: UserMedicine | null; searchMedicine: string | null; searchMedicineByString: string | null } = userMedicinesAdapter.getInitialState({
    status: 'idle',
    error: null,
    editMedicine: null,
    searchMedicine: null,
    searchMedicineByString: null,

})

export const addUserMedicine = createAsyncThunk<UserMedicine, UserMedicine, { //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userMedicines/addUserMedicine', async (userMedicine, thunkApi) => {
    await thunkApi.dispatch(fetchMedicineFromDictionaryId(userMedicine))
    userMedicine.medicineId = await thunkApi.getState().allMedicines.medicineFromDictionaryId
    try {
        let result = await addDoc(collection(db, "users/" + userMedicine.userId + "/categories/" + userMedicine.categoryId + "/products"), userMedicine);
        return {...userMedicine, id: result.id} as UserMedicine
    } catch (error) {
        console.log(error)
    }


    return {...userMedicine, id: ""} as UserMedicine
})

export const editUserMedicine = createAsyncThunk<UserMedicine, UserMedicine, { //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userMedicines/editUserMedicine', async (userMedicine, thunkApi) => {
    await thunkApi.dispatch(fetchMedicineFromDictionaryId(userMedicine))
    let editingMedicine = await thunkApi.getState().userProducts.editProduct
    console.log(editingMedicine)
    console.log(userMedicine)
    if (userMedicine.categoryId === editingMedicine?.categoryId) {
        const docRef = doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine.categoryId + "/products/", userMedicine.id);
        await setDoc(docRef, userMedicine);
    } else {
        await deleteDoc(doc(db, "users/" + userMedicine.userId + "/categories/" + editingMedicine?.categoryId + "/products", userMedicine.id))
        await setDoc(doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine?.categoryId + "/products/" + userMedicine.id), userMedicine);

    }
    return userMedicine as UserMedicine

});

const userMedicinesSlice = createSlice({
    name: "userMedicines",
    initialState,
    reducers: {
        addMedicine: (state, action: PayloadAction<UserMedicine>) => {
            userMedicinesAdapter.addOne(state, action.payload);
        },
        modifyMedicine: (state, action: PayloadAction<UserMedicine>) => {
            userMedicinesAdapter.setOne(state, action.payload);
        },
        editMedicine: (state, action: PayloadAction<UserMedicine>) => {
            state.editMedicine = action.payload
        },
        searchMedicine: (state, action: PayloadAction<string | null>) => {
            const searchMedicineId = action.payload ?? ""
            state.searchMedicineByString = null
            state.searchMedicine = searchMedicineId
        },
        searchByString: (state, action: PayloadAction<string | null>) => {
            state.searchMedicine = null
            state.searchMedicineByString = action.payload

        },
        removeMedicines: (state) => {
            userMedicinesAdapter.removeAll(state)
        },
        removeMedicine: (state, action: PayloadAction<string>) => {
            userMedicinesAdapter.removeOne(state, action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addUserMedicine.fulfilled, (state, action) => {
                userMedicinesAdapter.addOne(state, action.payload)
                notify('🦄 Lek dodany!')
            })
    }
})

export const {
    selectAll: selectUserMedicines,
    // selectById: selectUserProductById,
    // selectIds: selectUserProductIds,

    // Pass in a selector that returns the posts slice of state
} = userMedicinesAdapter.getSelectors<RootState>((state) => state.userMedicines);

// export const selectMedicinesOfCategory = (categoryId: string) => createSelector(
//     [(state: RootState) => selectUserMedicines(state)],
//     (userMedicine) => userMedicine.filter(product => product.categoryId === categoryId)
// )

export const {
    editMedicine,
    // searchMedicine,
    // searchByString,
    // removeMedicines,
    addMedicine,
    modifyMedicine,
    removeMedicine
} = userMedicinesSlice.actions //editProduct
export default userMedicinesSlice.reducer
