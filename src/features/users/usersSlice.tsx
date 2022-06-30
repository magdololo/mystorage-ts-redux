import {createSlice, PayloadAction, createSelector, createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../../app/store";
import {
    doc,
    getDocs,
    query,
    setDoc,
    getDoc,
    collection
} from "firebase/firestore";
import {db} from "../../firebase";
import {addNewCategory, Category} from "../categories/categoriesSlice";


export interface User{
    uid: Required<string>;
    email: string;
    provider: string
}

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}
export const checkIfUserExists = createAsyncThunk ("users/checkIfUserExist", async (userId:string)=>{
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists()
})

export const addNewUserToUsersCollection = createAsyncThunk('users/addNewUserToUsersCollection', async (user: User)=>{
    try {
        await setDoc(doc(db, "users", user.uid),{
            uid: user.uid,
            email: user.email,
            provider: user.provider

        })
    } catch (e){
        console.log(e)
    }


})
export const addDefaultCategoriesToNewUser = createAsyncThunk<boolean, string,{ //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>("users/addDefaultCategoriesToNewUser", async (userId: string, thunkApi)=>{
    let defaultCategories:Array<Category> =[];
    try{
        let q = await query(collection(db, "categories"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let category: Category = doc.data() as Category
            category.id = doc.id
            category.user = userId
            defaultCategories.push(category);
            thunkApi.dispatch(addNewCategory(category))
        })
    } catch{

    }
   return true
})
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action:PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers(builder) {
        builder
        .addCase(addNewUserToUsersCollection.fulfilled,(state, action)=>{
            console.log("fulfilled")
        })
            .addCase(addNewUserToUsersCollection.rejected,(state, action)=>{
                console.log("rejected")
            })
    }
});
export const { login, logout, saveUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;

export default usersSlice.reducer
