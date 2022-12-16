import {configureStore} from '@reduxjs/toolkit'
import allProductsReducer from '../slices/allProductsSlice'
import categoriesReducer from '../slices/categoriesSlice'
import usersReducer from '../slices/usersSlice'
import userProductsReducer from '../slices/userProductsSlice'
import imagesReducer from '../slices/imagesSlice'
import notificationsReducer from "../slices/notificationsSlice";
import sharesReducer from "../slices/sharesSlice";
import allMedicinesReducer from "../slices/allMedicinesSlice";
import imagesPharmacyReducer from "../slices/imagesPharmacySlice";
import userMedicinesReducer from "../slices/userMedicineSlice";
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";

const store = configureStore({

    reducer: {

        categories: categoriesReducer,
        users: usersReducer,
        allProducts: allProductsReducer,
        userProducts: userProductsReducer,
        images: imagesReducer,
        notifications: notificationsReducer,
        shares: sharesReducer,
        allMedicines: allMedicinesReducer,
        imagesPharmacy: imagesPharmacyReducer,
        userMedicines: userMedicinesReducer
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