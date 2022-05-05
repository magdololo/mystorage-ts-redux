import { createSlice } from '@reduxjs/toolkit'
export interface Category {
    id: Required<string>;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;

}
const initialState = [
    {
        title: 'słodycze',
        path: 'słodycze',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '1'
    },
    {
        title: 'mąka kasza ryż',
        path: 'mąka_kasza_ryż',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '2'
    },
    {
        title: 'oleje i oliwy',
        path: 'oleje_i_oliwy',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '3'
    },
    {
        title: 'makarony',
        path: 'makarony',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '4'
    },
    {
        title: 'mrożonki',
        path: 'skawa_herbata',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '5'
    },
    {
        title: 'dżemy',
        path: 'skawa_herbata',
        url: './../images/candies-g5fd12865c_1280.jpg',
        id: '6'
    },
]

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {}
})

export default categoriesSlice.reducer