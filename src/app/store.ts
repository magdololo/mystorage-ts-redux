import { configureStore, Action, } from '@reduxjs/toolkit'
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger'
// import untypedMiddleware from 'untyped-middleware'
import {actionTypes, firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import productsReducer from '../features/products/productSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import usersReducer from '../features/users/usersSlice'
import {api} from '../features/api/apiSlice'
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        products: productsReducer,
        categories: categoriesReducer,
        users: usersReducer,
        firebaseReducer,
        firestoreReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
        }
    }),
    })


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>




export default store