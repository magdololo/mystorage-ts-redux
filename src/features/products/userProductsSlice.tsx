import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    EntityState,
    PayloadAction,
    createSelector
} from '@reduxjs/toolkit'
import {RootState, AppDispatch, useAppSelector} from "../../app/store";
import {
    doc,
    startAt,
    endAt,
    orderBy,
    getDocs,
    query,
    collectionGroup,
    documentId,
    Timestamp,
    setDoc,
    getDoc,
    deleteDoc,
    addDoc, collection
} from "firebase/firestore";
import {db} from "../../firebase";
import {fetchProductFromDictionaryId} from "./allProductsSlice";

import {notify} from "../../helpers";
import {Category, selectAllCategories} from "../categories/categoriesSlice";


export interface UserProduct{
    productId: Required<string>;
    name: Required<string>;
    categoryId: Required<string>;
    capacity: Required<number | null>;
    unit: Required<string>;
    quantity: Required<number | null> ;
    expireDate: Date|null;
    userId: string;
    id: string;

}

export interface FirebaseUserProduct{
    productId: Required<string>;
    name: Required<string>;
    categoryId: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    quantity: Required<number>;
    expireDate: { seconds:number, nanoseconds: number}|null;
    userId: null | string;
    id: string;

}

const userProductsAdapter = createEntityAdapter<UserProduct>({
    sortComparer: (a: UserProduct, b: UserProduct) => {
        let aTitle = a.name.toLowerCase();
        let bTitle = b.name.toLowerCase();

        if (aTitle < bTitle) return -1;//keep a b
        if (aTitle > bTitle) return 1;//switch places b a
        return 0

    }
});

export const fetchUserProducts = createAsyncThunk('userProducts/fetchUserProducts', async (userId:string) => {

        try {
            const userProducts: Array<UserProduct> = [];
            if (userId === "")
                return userProducts

            const docRef = doc(db, "users", userId);
            let q = query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                let productDoc = doc.data() as FirebaseUserProduct;
                productDoc.id = doc.id;

                let expireDate: Date | null = null;

                if(productDoc.hasOwnProperty("expireDate") && productDoc.expireDate !== null){
                    let expireTimestamp = Timestamp.fromMillis(productDoc.expireDate.seconds*1000);
                    //
                    expireDate = expireTimestamp.toDate();
                }
                let product = {...productDoc, expireDate: expireDate} as UserProduct

                userProducts.push(product);

            })
            return userProducts
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)

export interface ChangeQuantity {
    userProduct : UserProduct,
    changeQuantity: "increment"|"decrement"
}

export const changeProductQuantity = createAsyncThunk('userProducts/changeProductQuantity', async (changeQuantity: ChangeQuantity)=> {
        try {
            const userProduct = changeQuantity.userProduct;
            const productRef = doc(db, "users/" + userProduct.userId + "/categories/" + userProduct.categoryId + "/products/", userProduct.id);
            const productDoc = await getDoc(productRef);
            console.log(productDoc)
            const userProductFromFirebase = productDoc.data() as UserProduct;
            userProductFromFirebase.id = productDoc.id
            console.log(userProductFromFirebase)
            if (userProductFromFirebase ) {
                let newQuantity = userProduct.quantity??1
                changeQuantity.changeQuantity === "increment" ? newQuantity++ : newQuantity--
                userProductFromFirebase.quantity = newQuantity;
                console.log(userProductFromFirebase)
                await setDoc(productRef, userProductFromFirebase);

            }
            return userProductFromFirebase
        } catch (error) {
            console.log(error)
            return {error: error}
        }
    }
)
export const addUserProduct = createAsyncThunk<UserProduct, UserProduct,{ //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userProducts/addUserProduct', async(userProduct, thunkApi)=> {
    console.log(userProduct)
    await thunkApi.dispatch(fetchProductFromDictionaryId(userProduct))
    let productFromDictionaryId = await thunkApi.getState().allProducts.productFromDictionaryId
    console.log(productFromDictionaryId)
    userProduct.productId = productFromDictionaryId
    try{
        let result = await addDoc(collection(db, "users/" + userProduct.userId + "/categories/" + userProduct.categoryId + "/products"), userProduct);

        console.log(result)
        console.log(result.id)
        return {...userProduct,id: result.id} as UserProduct
    }
    catch(error){
        console.log(error)
    }



    return {...userProduct,id: ""} as UserProduct
})
export const editUserProduct = createAsyncThunk<UserProduct, UserProduct,{ //pierwsze to co zwracamy, drugie to co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>('userProducts/editUserProduct', async(userProduct, thunkApi)=> {
    console.log(userProduct)
    await thunkApi.dispatch(fetchProductFromDictionaryId(userProduct))
    let productFromDictionaryId = await thunkApi.getState().allProducts.productFromDictionaryId
    console.log(productFromDictionaryId)
    let editingProduct = await thunkApi.getState().userProducts.editProduct
    console.log(editingProduct)

    if(userProduct.categoryId === editingProduct?.categoryId){
        const docRef = doc(db, "users/" + userProduct.userId + "/categories/" + userProduct.categoryId + "/products/",userProduct.id);
        await setDoc(docRef, userProduct);
    } else {
        await deleteDoc(doc(db, "users/" + userProduct.userId + "/categories/" + editingProduct?.categoryId  + "/products", userProduct.id))
        await setDoc(doc(db, "users/" + userProduct.userId + "/categories/" + userProduct?.categoryId +"/products/" + userProduct.id ), userProduct);

    }
    return userProduct as UserProduct

});
export const deleteUserProduct = createAsyncThunk('userProducts/deleteUserProduct', async (userProduct: UserProduct)=> {
    try {
        await deleteDoc(doc(db, "users/" + userProduct.userId + "/categories/" + userProduct.categoryId + "/products/", userProduct.id))
        return userProduct.id

}    catch(error){
    console.log(error)
    return {error: error}

}
})
const initialState: EntityState<UserProduct>& { error: null | string | undefined; status: string ; editProduct: UserProduct | null ; searchProduct: string | null; searchProductByString: string | null} = userProductsAdapter.getInitialState({
    status: 'idle',
    error: null ,
    editProduct: null,
    searchProduct: null,
    searchProductByString: null,

})

const userProductsSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {
        editProduct: (state, action: PayloadAction<UserProduct | null>) => {
            state.editProduct = action.payload;
        },
        searchProduct: (state, action: PayloadAction<string | null>) => {
           const searchProductId = action.payload??""
            state.searchProductByString = null
            state.searchProduct = searchProductId

        },
        searchByString: (state, action:PayloadAction<string | null>)=>{
            state.searchProduct = null
          state.searchProductByString = action.payload

        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                userProductsAdapter.upsertMany(state, action.payload as UserProduct[])
            })
            .addCase(changeProductQuantity.fulfilled,(state,action )=>{
                console.log(action.payload)
                let userProduct = action.payload as UserProduct
                userProductsAdapter.updateOne(state, {id:userProduct.id, changes: {quantity: userProduct.quantity}})

            })
            .addCase(deleteUserProduct.fulfilled,(state,action)=>{
              userProductsAdapter.removeOne(state, action.payload as string)
                notify('🦄 Produkt usunięty!')
            })
            .addCase(addUserProduct.fulfilled,(state,action)=>{
                userProductsAdapter.addOne(state, action.payload)
                notify('🦄 Produkt dodany!')
            })
            .addCase(editUserProduct.fulfilled, (state, action)=>{
                userProductsAdapter.setOne(state, action.payload)
                notify('🦄 Zmiany zostały dodane!')
            })
    }
})

export const {
    selectAll: selectUserProducts,
    selectById: selectUserProductById,
    selectIds: selectUserProductIds
    // Pass in a selector that returns the posts slice of state
} = userProductsAdapter.getSelectors<RootState>((state) => state.userProducts);

export const selectProductsOfCategory =(categoryId: string)=> createSelector(
    [(state: RootState) => selectUserProducts(state)],
    (userProducts) => userProducts.filter(product => product.categoryId === categoryId)
)

export const {editProduct, searchProduct, searchByString} = userProductsSlice.actions
export default userProductsSlice.reducer

// const productsOfCategory = useAppSelector((state) => userProducts.filter(product => product.categoryId === categoryId))