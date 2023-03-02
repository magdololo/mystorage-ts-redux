import React, {PropsWithChildren} from "react";
import {render} from "@testing-library/react";
import type {RenderOptions} from '@testing-library/react';
import {configureStore} from "@reduxjs/toolkit";
import type {PreloadedState} from '@reduxjs/toolkit'
import {Provider} from "react-redux";
import type {AppStore, RootState} from '../app/store'
// As a basic setup, import your same slice reducers
import allProductsReducer from '../slices/allProductsSlice'
import categoriesReducer from '../slices/categoriesSlice'
import usersReducer from '../slices/usersSlice'
import userProductsReducer from '../slices/userProductsSlice'
import imagesReducer from '../slices/imagesSlice'
import notificationsReducer from "../slices/notificationsSlice";
import sharesReducer from "../slices/sharesSlice";
import allMedicinesReducer from "../slices/allMedicinesSlice";
import userMedicinesReducer from "../slices/userMedicineSlice";
import {MemoryRouter} from "react-router-dom";


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer:
                {
                    categories: categoriesReducer,
                    users: usersReducer,
                    allProducts: allProductsReducer,
                    userProducts: userProductsReducer,
                    images: imagesReducer,
                    notifications: notificationsReducer,
                    shares: sharesReducer,
                    allMedicines: allMedicinesReducer,
                    userMedicines: userMedicinesReducer
                },
            preloadedState,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({children}: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}><MemoryRouter>{children}</MemoryRouter>

        </Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})};
}
