import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'

import {AppDispatch, RootState} from "../../app/store";
import {addDoc, collection, deleteDoc, doc, getDocs, query, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {notify} from "../../helpers";
import i18next from "i18next";



export interface Category {
    id: string | null;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;
    user: string;
    required: string;
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
const initialState: EntityState<Category> & {  error: null | string | undefined; status: string; currentCategory : Category | null } = categoriesAdapter.getInitialState({

    status: 'idle',
    error: null,
    currentCategory: null,



})
// images: [],images: Image[];
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (userId: string) => {


        try {
            const categories: Array<Category> = [];
            if (userId === "")
                return categories

            let q = await query(collection(db, "users/" + userId + "/categories"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                let categoryDoc = doc.data() as Category;
                categoryDoc.id = doc.id;
                categories.push(categoryDoc);

            })

            return categories
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
    console.log(category)//zmieniony
    let editingCategory = await thunkApi.getState().categories.currentCategory??{} as Category
    console.log(editingCategory)//niezmieniony
    if ((category.title !== editingCategory.title || category.url !== editingCategory.url) && category.title !== "produkty bez kategorii"){
        const docRef = doc(db, "users/" + category.user + "/categories", category.id!);
        await setDoc(docRef, category);
    }
    return category as Category
})

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (category: Category)=> {
     if(category.title !== "produkty bez kategorii"){
    try {
        await deleteDoc(doc(db, "users/" + category.user + "/categories/" , category.id!))
        return category.id

    }    catch(error){
        console.log(error)
        return {error: error}

    }
}})


const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        currentCategoryChange: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        }


    },
    extraReducers(builder){
        builder
            .addCase(fetchCategories.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded'
                categoriesAdapter.upsertMany(state, action.payload as Category[])
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewCategory.fulfilled, (state, action) =>{
                categoriesAdapter.addOne(state, action.payload.category)
                if(action.payload.notify)
                    notify(i18next.t("categories.categoriesSlice.notify.addCategory"))
            } )
            .addCase(editCategory.fulfilled, (state, action)=>{
                categoriesAdapter.setOne(state, action.payload)
                notify(i18next.t("categories.categoriesSlice.notify.changeCategory"))
            })
            .addCase(deleteCategory.fulfilled,(state,action)=>{
                categoriesAdapter.removeOne(state, action.payload as string)
                notify(i18next.t("categories.categoriesSlice.notify.removeCategory"))
            })

    }
})
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds

} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);
export const selectCategoryByPath = createSelector(
    [selectAllCategories, (state:RootState, categoryPath) => categoryPath],
    (categories, categoryPath) => categories.filter((category) => category.path === categoryPath)
);
export const selectAllCategoriesSortedByRequired = createSelector(
    selectAllCategories, categories => {
        const requiredCategory = categories.find(category => category.required === "true")
        const filteredCategories = categories.filter(category => category.required !== "true")
        return [requiredCategory, ...filteredCategories]
    }

)

export const {currentCategoryChange} = categoriesSlice.actions
export default categoriesSlice.reducer