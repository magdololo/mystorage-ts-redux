import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../app/store";
import {
    doc,
    getDocs,
    query,
    setDoc,
    getDoc,
    collection,
    updateDoc,
    where
} from "firebase/firestore";
import {db} from "../firebase";
import {addNewCategory, Category} from "./categoriesSlice";




export interface User{
    uid: Required<string>;
    email: string;
    provider: string;
    didSeeGreeting: boolean;

}

interface UserState {
    user: User | null
    currentStorageId: string | null

}

const initialState: UserState = {
    user: null,
    currentStorageId: null
}


export const addNewUserToUsersCollection = createAsyncThunk('users/addNewUserToUsersCollection', async (user: User)=>{
    try {
        await setDoc(doc(db, "users", user.uid),{
            uid: user.uid,
            email: user.email,
            provider: user.provider,
            didSeeGreeting: false

        })
    } catch (e){
        console.log(e)
    }


})
export interface AddDefaultCategoriesToNewUserProps {
    userId : string,
    userLanguage: string
}
export const addDefaultCategoriesToNewUser = createAsyncThunk<boolean, AddDefaultCategoriesToNewUserProps,{ //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>("users/addDefaultCategoriesToNewUser", async (addDefaultCategoriesToNewUserProps: AddDefaultCategoriesToNewUserProps, thunkApi)=>{
    let defaultCategories:Array<Category> =[];
    try{

        let q = await query(collection(db, "categories"), where("language","==",addDefaultCategoriesToNewUserProps.userLanguage));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let category: Category = doc.data() as Category
            category.id = doc.id
            category.user = addDefaultCategoriesToNewUserProps.userId
            defaultCategories.push(category);
            thunkApi.dispatch(addNewCategory({category, notify: false}))
            console.log(doc.id, " => ", doc.data());
        })
    } catch{

    }
   return true
})
export const changeSeeGreetingToTrue = createAsyncThunk<boolean,User,{
    dispatch: AppDispatch
    state: RootState
}>('users/changeSeeGreetingToTrue', async (user: User, thunkApi)=>{

    try{
        const docRef = doc(db, "users/" + user?.uid);
        await getDoc(docRef);
        await updateDoc(docRef, {"didSeeGreeting": true})
    } catch (e){
        console.log(e)
    }
    console.log("after firebase update")
   return true
})


const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action:PayloadAction<User>) => {
            state.user = action.payload;
            state.currentStorageId = action.payload.uid;

        },
        logout: (state) => {
            state.user = null;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
        setCurrentStorage: (state, action:PayloadAction<string>)=> {
            state.currentStorageId = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(addNewUserToUsersCollection.fulfilled,(state, action)=>{
            console.log("fulfilled")
            })
            .addCase(addNewUserToUsersCollection.rejected,(state, action)=>{
                console.log("rejected")
            })
            .addCase(addDefaultCategoriesToNewUser.fulfilled,(state, action)=>{
                console.log("dodales domyslne kategorie nowemy userowi")
            })
            .addCase(changeSeeGreetingToTrue.fulfilled,(state, action)=>{
                console.log("zmieniłes didSeeGreeting na true")
                console.log(action.payload)
                // let user = state.user!!
                // user.didSeeGreeting = true
                // state.user = user
                let user = state.user!!
                let newUser = {
                    uid: user.uid,
                    email: user.email,
                    provider: user.provider,
                    didSeeGreeting: true

                }
                state.user = newUser
            })

    }
});
export const { login, logout, saveUser, setCurrentStorage} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectCurrentStorage = (state: RootState)=> state.users.currentStorageId

export default usersSlice.reducer
