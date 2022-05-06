import { configureStore, Action, } from '@reduxjs/toolkit'
// import additionalMiddleware from 'additional-middleware'
// import logger from 'redux-logger'
// import untypedMiddleware from 'untyped-middleware'

import productsReducer from '../features/products/productSlice'
import categoriesReducer from '../features/categories/categoriesSlice'
import usersReducer from '../features/users/usersSlice'
const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        users: usersReducer
    }
    })


export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>




export default store