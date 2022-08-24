import { configureStore } from '@reduxjs/toolkit'
import {actionTypes} from "react-redux-firebase";
import allProductsReducer from '../features/products/allProductsSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import usersReducer from '../features/users/usersSlice'
import userProductsReducer from '../features/products/userProductsSlice'
import imagesReducer from '../features/images/imagesSlice'
import {useDispatch,TypedUseSelectorHook, useSelector} from "react-redux";
import userProductsSlice from "../features/products/userProductsSlice";



const store = configureStore({

    reducer: {

        categories: categoriesReducer,
        users: usersReducer,
        allProducts: allProductsReducer,
        userProducts: userProductsReducer,
        images: imagesReducer,

    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,

        //     {
        //     ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
        // }
    })
    })


export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector



export default store