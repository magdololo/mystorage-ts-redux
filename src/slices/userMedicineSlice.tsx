import {
    createAsyncThunk,
    createEntityAdapter, createSelector,
    //createSelector,
    createSlice,
    EntityState,
    PayloadAction
} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../app/store";
import {addDoc, collection, deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {fetchMedicineFromDictionaryId} from "./allMedicinesSlice";
import {notify} from "../helpers";
// import {fetchProductFromDictionaryId} from "./allProductsSlice";
import i18n from "../i18n";

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
    validityAfterOpen: number;
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
    let editingMedicine = await thunkApi.getState().userMedicines.editMedicine
    console.log(editingMedicine)
    console.log(userMedicine)

    if (userMedicine.categoryId === editingMedicine?.categoryId) {
        const docRef = doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine.categoryId + "/products/", editingMedicine.id);
        await setDoc(docRef, userMedicine);
    } else {
        try {
            await deleteDoc(doc(db, "users/" + userMedicine.userId + "/categories/" + editingMedicine?.categoryId + "/products/", editingMedicine!!.id))
        } catch (error) {
            console.log(error)
        }
        try {
            await setDoc(doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine?.categoryId + "/products/" + editingMedicine?.id), userMedicine);
        } catch (error) {
            console.log(error)
        }
    }

    return userMedicine as UserMedicine

});

export interface ChangeMedicineQuantity {
    userMedicine: UserMedicine,
    changeQuantity: "increment" | "decrement"
}

export const changeMedicineQuantity = createAsyncThunk('userMedicine/changeProductQuantity', async (changeQuantity: ChangeMedicineQuantity) => {
        try {
            const userMedicine = changeQuantity.userMedicine;
            const productRef = doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine.categoryId + "/products/", userMedicine.id);
            const medicineDoc = await getDoc(productRef);

            const userMedicineFromFirebase = medicineDoc.data() as UserMedicine;
            userMedicineFromFirebase.id = medicineDoc.id

            if (userMedicineFromFirebase) {
                let newQuantity = userMedicine.quantity ?? 1
                changeQuantity.changeQuantity === "increment" ? newQuantity++ : newQuantity--
                userMedicineFromFirebase.quantity = newQuantity;

                await setDoc(productRef, userMedicineFromFirebase);

            }
            return userMedicineFromFirebase
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)

export const deleteUserMedicine = createAsyncThunk('userMedicine/deleteUserMedicine', async (userMedicine: UserMedicine) => {
    try {
        await deleteDoc(doc(db, "users/" + userMedicine.userId + "/categories/" + userMedicine.categoryId + "/products/", userMedicine.id))
        return userMedicine.id

    } catch (error) {
        console.log(error)
        return {error: error}

    }
})

const userMedicinesSlice = createSlice({
    name: "userMedicines",
    initialState,
    reducers: {
        addMedicine: (state, action: PayloadAction<UserMedicine>) => {
            console.log("addMedicine")
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
        searchMedicineByString: (state, action: PayloadAction<string | null>) => {
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
                notify(i18n.t("medicines.userMedicinesSlice.addMedicine"))
            })
            .addCase(changeMedicineQuantity.fulfilled, (state, action) => {
                let userMedicine = action.payload as UserMedicine
                userMedicinesAdapter.updateOne(state, {id: userMedicine.id, changes: {quantity: userMedicine.quantity}})
            })
            .addCase(deleteUserMedicine.fulfilled, (state, action) => {
                userMedicinesAdapter.removeOne(state, action.payload as string)
                notify(i18n.t("medicines.userMedicinesSlice.deleteMedicine"))
            })
    }
})

export const {
    selectAll: selectUserMedicines,
    selectById: selectUserMedicineById,
    // selectIds: selectUserProductIds,

    // Pass in a selector that returns the posts slice of state
} = userMedicinesAdapter.getSelectors<RootState>((state) => state.userMedicines);

// export const selectMedicinesOfCategory = (categoryId: string) => createSelector(
//     [(state: RootState) => selectUserMedicines(state)],
//     (userMedicine) => userMedicine.filter(product => product.categoryId === categoryId)
// )

export const {
    editMedicine,
    searchMedicine,
    searchMedicineByString,
    addMedicine,
    modifyMedicine,
    removeMedicine
} = userMedicinesSlice.actions //editProduct

export const selectMedicinesOfCategory = (categoryId: string) => createSelector(
    selectUserMedicines, userMedicines => {
        return userMedicines.filter(medicine => medicine.categoryId === categoryId)
    }
)
export default userMedicinesSlice.reducer
