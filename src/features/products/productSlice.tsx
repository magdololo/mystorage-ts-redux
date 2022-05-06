import { createSlice } from '@reduxjs/toolkit'
export interface Product{
    id: Required<string>;
    name: Required<string>;
    categoryTitle: Required<string>;
    capacity: Required<number>;
    unit: Required<string>;
    quantity: Required<number>;
    expireDate: Date|null;

}
const initialState = [
    { id: '1', name: 'czekolada', categoryTitle: 'słodycze' , capacity: 400, unit: "gr", quantity: 1, expireDate: null},
    { id: '2', name: 'makaron muszelki', categoryTitle: 'makarony' , capacity: 1, unit: "kg", quantity: 1, expireDate: null},
    { id: '3', name: 'zupa jarzynowa', categoryTitle: 'mrożonki' , capacity: 450, unit: "gr", quantity: 1, expireDate: null}
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export default productsSlice.reducer