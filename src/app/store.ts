import { configureStore } from '@reduxjs/toolkit'
import allProductsReducer from '../features/products/allProductsSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import usersReducer from '../features/users/usersSlice'
import userProductsReducer from '../features/products/userProductsSlice'
import imagesReducer from '../features/images/imagesSlice'
import notificationsReducer from "../features/notifications/notificationsSlice";
import sharesReducer from "../features/shares/sharesSlice";
import {useDispatch,TypedUseSelectorHook, useSelector} from "react-redux";





const store = configureStore({

    reducer: {

        categories: categoriesReducer,
        users: usersReducer,
        allProducts: allProductsReducer,
        userProducts: userProductsReducer,
        images: imagesReducer,
        notifications: notificationsReducer,
        shares: sharesReducer
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

// create a generic type called AppSelector
export type AppSelector<Return> = (state: RootState) => Return
// create a custom `createSelector` that uses the type above
export const createAppSelector = <R>(selector: AppSelector<R>): AppSelector<R> => selector


export default store