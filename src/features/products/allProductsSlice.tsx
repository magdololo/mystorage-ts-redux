import {createSlice, createAsyncThunk, createEntityAdapter, EntityState} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../app/store";
import {addDoc, collection, getDocs, query} from "firebase/firestore";
import {db} from "../../firebase";
import {UserProduct} from "./userProductsSlice";

export interface ProductFromDictionary{
    id: Required<string>;
    name: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    userId: null | string;


}
const allProductsAdapter = createEntityAdapter<ProductFromDictionary>({
    sortComparer: (a: ProductFromDictionary, b: ProductFromDictionary) => {
        let aTitle = a.name.toLowerCase();
        let bTitle = b.name.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});
export const fetchProductFromDictionaryId = createAsyncThunk<ProductFromDictionary, UserProduct,{ //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userProducts/fetchProductFromDictionaryId', async(userProduct, thunkApi)=> {
    console.log("halo z fetch product id thunk")
    console.log(userProduct)
    let allProducts = selectAllProducts(thunkApi.getState())
    let productFromDictionary = allProducts.find((product) => product.name === userProduct.name && product.capacity === userProduct.capacity && product.unit === userProduct.unit)
    if (productFromDictionary)
        return productFromDictionary as ProductFromDictionary
    let result = await addDoc(collection(db, "allProducts/" ), userProduct);
    return {...userProduct,id: result.id} as ProductFromDictionary

})


const initialState: EntityState<ProductFromDictionary>& { error: null | string | undefined; status: string; productFromDictionaryId: string } = allProductsAdapter.getInitialState({
    status: 'idle',
    error: null ,
    productFromDictionaryId: ""

})

export const fetchAllProducts = createAsyncThunk('allProducts/fetchAllProducts', async () => {

        try {
            const allProducts: Array<ProductFromDictionary> = [];
            let q = await query(collection(db, "allProducts"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
// console.log(doc.data())
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
                allProductsAdapter.upsertMany(state, action.payload as ProductFromDictionary[])
            })
            .addCase(fetchProductFromDictionaryId.fulfilled, (state, action) => {
               state.productFromDictionaryId = action.payload.id
                allProductsAdapter.upsertOne(state, action.payload)
            })
            .addCase(fetchProductFromDictionaryId.rejected, (state, action) => {
                console.log(action.error)
            })


    }
})
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds,

    // Pass in a selector that returns the posts slice of state
} = allProductsAdapter.getSelectors<RootState>((state) => state.allProducts);

export default allProductsSlice.reducer