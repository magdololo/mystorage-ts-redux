import {createSlice, createSelector, createAsyncThunk, createEntityAdapter, EntityState} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import { doc, startAt, endAt, orderBy, getDocs, query,collectionGroup, documentId, Timestamp} from "firebase/firestore";
import {db} from "../../firebase";





export interface UserProduct{
    productId: Required<string>;
    name: Required<string>;
    categoryId: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    quantity: Required<number>;
    expireDate: Date|null;
    userId: null | string;
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

const initialState: EntityState<UserProduct>& { error: null | string | undefined; status: string } = userProductsAdapter.getInitialState({
    status: 'idle',
    error: null ,
})

const userProductsSlice = createSlice({
    name: 'userProducts',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUserProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                // Use the `upsertMany` reducer as a mutating update utility
                userProductsAdapter.upsertMany(state, action.payload as UserProduct[])
            })
    }
})

export const {
    selectAll: selectUserProducts,
    selectById: selectUserProductById,
    selectIds: selectUserProductIds
    // Pass in a selector that returns the posts slice of state
} = userProductsAdapter.getSelectors<RootState>((state) => state.userProducts);

// export const selectUserProductByCategoryId = createSelector(
//     [selectUserProducts, (state:RootState, categoryId) => categoryId],
//     (userProducts, categoryId) => userProducts.filter((product) => product.categoryId === categoryId)
// );

export default userProductsSlice.reducer