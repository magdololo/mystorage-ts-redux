import {
    createSlice,
    createSelector,
    PayloadAction,
    createAsyncThunk,
    createEntityAdapter,
    EntityState
} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import {selectUser, User} from "../users/usersSlice";
import store, {RootState} from "../../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebase";

export interface Category {
    id: string | null;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;
    user: string;
}

export interface Image {
    path: Required<string>;
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
const initialState: EntityState<Category> & { images: Image[]; error: null; status: string } = categoriesAdapter.getInitialState({
    images: [],
    status: 'idle',
    error: null
})
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (queryFn: void) => {
        const user = useSelector(selectUser);
        const uid = user?.uid
        try {
            const categories: Array<Category> = [];
            if (uid === "")
                return {
                    data: categories
                }

            let q = await query(collection(db, "users/" + uid + "/categories"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                let categoryDoc = doc.data() as Category;
                categoryDoc.id = doc.id;
                categories.push(categoryDoc);

            })
            return {data: categories}
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)

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
        categoryAdded: (state, action: PayloadAction<Category>) => {
            categoriesAdapter.addOne(state, action)
        }


    },
    extraReducers(builder){
        builder
            .addCase(addNewCategory.fulfilled, categoriesAdapter.addOne )
    }
})
export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
    // Pass in a selector that returns the posts slice of state
} = categoriesAdapter.getSelectors<RootState>((state) => state.categories);
export const selectCategoryByPath = createSelector(
    [selectAllCategories, (state, categoryPath) => categoryPath],
    (categories, categoryPath) => categories.filter((category) => category.path === categoryPath)
);


export default categoriesSlice.reducer