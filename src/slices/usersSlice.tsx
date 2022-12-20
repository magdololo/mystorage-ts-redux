import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from "../app/store";
import {
    doc,
    getDocs,
    query,
    getDoc,
    collection,
    updateDoc,
    where,
} from "firebase/firestore";
import {db} from "../firebase";
import {addNewCategory, Category} from "./categoriesSlice";


export interface User {
    uid: Required<string>;
    email: string;
    provider: string;
    didSeeGreeting: boolean;
    defaultCategoriesAdded: boolean;

}

export interface User {
    uid: Required<string>;
    defaultCategoriesAdded: boolean;
}


interface UserState {
    user: User | null
    currentStorageId: string | null
    //userInUsers: boolean
}

const initialState: UserState = {
    user: null,
    currentStorageId: null,
    // userInUsers: false
}


// export const addNewUserToUsersCollection = createAsyncThunk('users/addNewUserToUsersCollection', async (user: User)=>{
//     try {
//         await setDoc(doc(db, "users", user.uid), {
//             uid: user.uid,
//             email: user.email,
//             provider: user.provider,
//             didSeeGreeting: false,
//             defaultCategoriesAdded: false
//         })
//     } catch (error) {
//         console.log(error)
//     }
//
//
// })

export interface LoginData {
    userId: string,
    userLanguage: string
}

export const addDefaultCategoriesToNewUser = createAsyncThunk<boolean, LoginData, { //pierwsze to typ tego co zwracamy, drugie to typ tego co przyjmujemy jako parametr
    dispatch: AppDispatch
    state: RootState
}>("users/addDefaultCategoriesToNewUser", async (addDefaultCategoriesToNewUserProps: LoginData, thunkApi) => {
    console.log(addDefaultCategoriesToNewUserProps.userId)
    try {
        let userRef = doc(db, "users/" + addDefaultCategoriesToNewUserProps.userId);
        let userDoc = await getDoc(userRef);
        let user = userDoc.data()
        if (user!!.defaultCategoriesAdded === false) {
            let q = await query(collection(db, "categories"), where("language", "==", addDefaultCategoriesToNewUserProps.userLanguage));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let category: Category = doc.data() as Category
                category.id = doc.id
                category.user = addDefaultCategoriesToNewUserProps.userId
                thunkApi.dispatch(addNewCategory({category, notify: false}))
            })
            let qPharm = await query(collection(db, "categoriesPharmacy"), where("language", "==", addDefaultCategoriesToNewUserProps.userLanguage));
            const querySnapshotPharm = await getDocs(qPharm);
            querySnapshotPharm.forEach((doc) => {
                let category: Category = doc.data() as Category
                category.id = doc.id
                category.user = "pharmacy" + addDefaultCategoriesToNewUserProps.userId
                thunkApi.dispatch(addNewCategory({category, notify: false}))
            })
            await updateDoc(userRef, {"defaultCategoriesAdded": true})
        }
    } catch (error) {
        console.log(error)
    }
    return true
})
export const changeSeeGreetingToTrue = createAsyncThunk<boolean,User,{
    dispatch: AppDispatch
    state: RootState
}>('users/changeSeeGreetingToTrue', async (user: User)=>{

    try{
        const docRef = doc(db, "users/" + user?.uid);
        await getDoc(docRef);
        await updateDoc(docRef, {"didSeeGreeting": true})
    } catch (e){
        console.log(e)
    }
   return true
})

export const deleteUserAccount = createAsyncThunk('users/deleteUserAccount', async (userId: string) => {
    try {
        const docRef = doc(db, "users/" + userId);
        await updateDoc(docRef, {"isDeleted": true})
    } catch (error) {
        console.log(error)
    }

})


export const getUserData = createAsyncThunk<User | null, LoginData, {
    dispatch: AppDispatch
    state: RootState
}>('users/getUserData', async (loginData: LoginData, thunkApi) => {
    try {
        const userRef = doc(db, "users/" + loginData.userId)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
            const user = userDoc.data() as User
            if (!user.defaultCategoriesAdded) {
                await thunkApi.dispatch(addDefaultCategoriesToNewUser(loginData))
            }
            return user
        }
    } catch (error) {
        console.log(error)
    }
    return null
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
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
            // .addCase(addNewUserToUsersCollection.fulfilled,()=>{
            // console.log("Status addNewUserToUsersCollection is fulfilled")
            // })
            // .addCase(addNewUserToUsersCollection.rejected,()=>{
            //     console.log("Status addNewUserToUsersCollection is rejected")
            // })
            .addCase(addDefaultCategoriesToNewUser.fulfilled,()=>{
                console.log("Add default categories to new user")
            })
            .addCase(changeSeeGreetingToTrue.fulfilled,(state)=>{
                let user = state.user!!
                state.user = {
                    uid: user.uid,
                    email: user.email,
                    provider: user.provider,
                    didSeeGreeting: true,
                    defaultCategoriesAdded: false
                }

            })
            .addCase(deleteUserAccount.fulfilled, () => {
                console.log('Delete user account')
            })
            // .addCase(checkIfUserInUsersCollection.fulfilled, (state, action) => {
            //     console.log(action.payload)
            //     state.userInUsers = action.payload
            // })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload
                state.currentStorageId = state.user!!.uid
            })
    }
});
export const {login, logout, setCurrentStorage} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
// export const userInUsers = (state: RootState) => state.users.userInUsers;
export const selectCurrentStorage = (state: RootState) => state.users.currentStorageId

export default usersSlice.reducer
