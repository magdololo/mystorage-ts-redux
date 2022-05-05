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
    { id: '1', name: 'First Post!', categoryTitle: 'Hello!' , capacity: 400, unit: "gr", quantity: 1, expireDate: null},
    { id: '2', name: 'First Post!', categoryTitle: 'Hello!' , capacity: 400, unit: "gr", quantity: 1, expireDate: null},
    { id: '3', name: 'First Post!', categoryTitle: 'Hello!' , capacity: 400, unit: "gr", quantity: 1, expireDate: null}
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}
})

export default productsSlice.reducer