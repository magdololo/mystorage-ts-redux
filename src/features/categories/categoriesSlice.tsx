import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'

import {RootState} from "../../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebase";
import {ProductFromDictionary} from "../products/allProductsSlice";

export interface Category {
    id: string | null;
    path: Required<string> | undefined;
    url: Required<string>;
    title: Required<string>;
    user: string;
    required: string;
}

export interface Image {
    url: Required<string>;
    id: Required<string>;
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
const initialState: EntityState<Category> & { images: Image[]; error: null | string | undefined; status: string; currentCategory : Category | null } = categoriesAdapter.getInitialState({
    images: [],
    status: 'idle',
    error: null ,
    currentCategory:  null
})
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
export const fetchImages = createAsyncThunk('categories/fetchImages', async()=>{
    try{
        const images: Array<Image> = []
        let q = await query(collection(db, "images"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            let productDoc = doc.data() as Image;
            productDoc.id = doc.id;
            images.push(productDoc);

        })
        return images
    } catch (error) {
        console.log(error)
        return {error: error}
    }
})
export const addNewCategory = createAsyncThunk<Category,Category>("categories/addNewCategory",
    async (newCategory: Category) => {
            let result = await addDoc(collection(db, "users/" + newCategory.user + "/categories"), newCategory);
            return {...newCategory, id: result.id} as Category

    }
)
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
            .addCase(fetchImages.fulfilled,(state,action)=>{
                state.images = action.payload as Image[]
            })
            .addCase(addNewCategory.fulfilled, categoriesAdapter.addOne )
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
        console.log(categories)
        const requiredCategory = categories.find(category => category.required === "true")
        const filteredCategories = categories.filter(category => category.required !== "true")
        console.log(requiredCategory)
        return [requiredCategory, ...filteredCategories]
    }

)

export const {currentCategoryChange} = categoriesSlice.actions
export default categoriesSlice.reducer