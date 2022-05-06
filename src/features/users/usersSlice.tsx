import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";
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
        },
        logout: (state) => {
            state.user = null;
        },
    }
});
export const { login, logout } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export default usersSlice.reducer