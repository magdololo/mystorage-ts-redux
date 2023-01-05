import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../app/store";
import {addDoc, collection, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase";
import {notify} from "../helpers";
import i18next from "i18next";


export interface Category {
    id: string | null;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;
    user: string;
    required: string;
    type: string;
}


const categoriesAdapter = createEntityAdapter<Category>({
    sortComparer: (a: Category, b: Category) => {
        let aTitle = a.title.toLowerCase();
        let bTitle = b.title.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});
const initialState: EntityState<Category> & {  error: null | string | undefined; status: string; currentCategory : Category | null; deletingCategory : Category | null} = categoriesAdapter.getInitialState({
    status: 'idle',
    error: null,
    currentCategory: null,
    deletingCategory: null
})

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (userId: string) => {


        try {
            const categoriesStorage: Array<Category> = [];
            if (userId === "")
                return categoriesStorage

            let q = await query(collection(db, "users/" + userId + "/categories"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((result) => {

                let categoryDoc = result.data() as Category;
                categoryDoc.id = result.id;
                categoriesStorage.push(categoryDoc);

            })

            return categoriesStorage
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
export type AddNewCategoryParams = {
    category: Category
    notify: boolean
}
export const addNewCategory = createAsyncThunk<AddNewCategoryParams,AddNewCategoryParams>("categories/addNewCategory",
    async (addNewCategoryParams: AddNewCategoryParams) => {
            let result = await addDoc(collection(db, "users/" + addNewCategoryParams.category.user + "/categories"), addNewCategoryParams.category);
            const newCategory = {...addNewCategoryParams.category, id: result.id} as Category
            return {"category":newCategory, "notify": addNewCategoryParams.notify}

    }
)
export const editCategory = createAsyncThunk<Category, Category,{ //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
     dispatch: AppDispatch
    state: RootState
}>('categories/editCategory', async (category ,thunkApi)=> {

    let editingCategory = await thunkApi.getState().categories.currentCategory??{} as Category

    if ((category.title !== editingCategory.title || category.url !== editingCategory.url) && category.title !== "produkty bez kategorii"){
        const docRef = doc(db, "users/" + category.user + "/categories", category.id!);
        await setDoc(docRef, category);
    }
    return category as Category
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (category: Category)=> {
     if(category.title !== "produkty bez kategorii"){
    try {
        const docRef = doc(db, "users/" + category.user + "/categories/" , category.id!)
        await updateDoc(docRef, {"isDeleted": true})
return category.id
    }    catch(error){
        console.log(error)
        return null

    }
}
})


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory:  (state, action: PayloadAction<Category>) => {
            categoriesAdapter.addOne(state, action.payload);
        },
        currentCategoryChange: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        },
        modifyCategory: (state, action:PayloadAction<Category>)=>{
            categoriesAdapter.setOne(state, action.payload)
        },
        removeCategories: (state)=>{
            categoriesAdapter.removeAll(state)
        },
        removeCategory: (state, action:PayloadAction<string> )=> {
            categoriesAdapter.removeOne(state, action.payload);
        },
        deletingCategoryChange: (state, action: PayloadAction<Category | null>) => {
            state.deletingCategory = action.payload;
        },


    },
    extraReducers(builder){
        builder
            // .addCase(fetchCategories.pending, (state, action) => {
            //     state.status = 'loading'
            // })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                categoriesAdapter.upsertMany(state, action.payload as Category[])
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewCategory.fulfilled, (state, action) => {
                categoriesAdapter.addOne(state, action.payload.category)
                if (action.payload.notify)
                    notify(i18next.t("categories.categoriesSlice.notify.addCategory"))
            })
            .addCase(editCategory.fulfilled, (state, action) => {
                categoriesAdapter.setOne(state, action.payload)
                notify(i18next.t("categories.categoriesSlice.notify.changeCategory"))
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                if (action.payload) {
                    categoriesAdapter.removeOne(state, action.payload as string)
                    notify(i18next.t("categories.categoriesSlice.notify.removeCategory"))
                }
            })

    }
})
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds

} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);
export const selectCategoryByPath = (categoryPath: string) => createSelector(
    [(state: RootState) => selectAllCategories(state)],
    (categories) => categories.find((category: Category) => category.path === categoryPath)
);
export const selectAllCategoriesSortedByRequired = createSelector(
    selectAllCategories, categories => {
        const requiredCategory = categories.find(category => category.required === "true")
        const filteredCategories = categories.filter(category => category.required !== "true")
        return [requiredCategory, ...filteredCategories]
    }
)
export const selectCategoriesCurrentStorageByRequired = (currentStorageId: string) => createSelector(
    selectAllCategories, categories => {
        const categoriesOfStorage = categories.filter(category => category.user === currentStorageId)
        const requiredCategory = categoriesOfStorage.find(category => category.required === "true")
        const filteredCategories = categoriesOfStorage.filter(category => category.required !== "true")
        return [requiredCategory, ...filteredCategories]
    }
)
export const selectDefaultCategory = createSelector(
    [(state: RootState) => selectAllCategories(state)],
    (categories) => categories.find(category => category.required === "true")
)
export const {currentCategoryChange, removeCategories, addCategory, modifyCategory, removeCategory, deletingCategoryChange} = categoriesSlice.actions
export default categoriesSlice.reducer
