import {createSlice, createSelector, createAsyncThunk, createEntityAdapter, EntityState} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebase";
import {Category, fetchCategories, Image} from "../categories/categoriesSlice";
import {executeReducerBuilderCallback} from "@reduxjs/toolkit/dist/mapBuilders";
import {UserProduct} from "./userProductsSlice";

export interface ProductFromDictionary{
    id: Required<string>;
    name: Required<string>;
    // categoryTitle: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    // quantity: Required<number>;
    // expireDate: Date|null;
    userId: null | string;

}
// const initialState = [
//     { id: '1', name: 'czekolada', categoryTitle: 'słodycze' , capacity: 400, unit: "gr", quantity: 1, expireDate: null},
//     { id: '2', name: 'makaron muszelki', categoryTitle: 'makarony' , capacity: 1, unit: "kg", quantity: 1, expireDate: null},
//     { id: '3', name: 'zupa jarzynowa', categoryTitle: 'mrożonki' , capacity: 450, unit: "gr", quantity: 1, expireDate: null}
// ]

const allProductsAdapter = createEntityAdapter<ProductFromDictionary>({
    sortComparer: (a: ProductFromDictionary, b: ProductFromDictionary) => {
        let aTitle = a.name.toLowerCase();
        let bTitle = b.name.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});
export const fetchProductFromDictionaryId = createAsyncThunk<string, UserProduct,{ //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userProducts/fetchProductFromDictionaryId', async(userProduct, thunkApi)=> {
    console.log("halo z fetch product id thunk")




    return ""
})
const initialState: EntityState<ProductFromDictionary>& { error: null | string | undefined; status: string } = allProductsAdapter.getInitialState({
    status: 'idle',
    error: null ,
})

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {

        try {
            const allProducts: Array<ProductFromDictionary> = [];
            let q = await query(collection(db, "allProducts"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                let productDoc = doc.data() as ProductFromDictionary;
                productDoc.id = doc.id;
                allProducts.push(productDoc);

            })
            return allProducts
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                // Use the `upsertMany` reducer as a mutating update utility
                allProductsAdapter.upsertMany(state, action.payload as ProductFromDictionary[])
            })
    }
})
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the posts slice of state
} = allProductsAdapter.getSelectors<RootState>((state) => state.allProducts);

export default allProductsSlice.reducer