import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
import {connect} from "react-redux";

export interface User{
    uid: Required<string>;
}

interface UserState {
    user: User | null
}

const initialState: UserState = {
    user: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action:PayloadAction<User>) => {
            state.user = action.payload;
            console.log(action.payload)
        },
        logout: (state) => {
            state.user = null;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
        },
    }
});
export const { login, logout, saveUser} = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export default usersSlice.reducer
