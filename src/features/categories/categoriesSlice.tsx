import {createSlice, createSelector, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import {User} from "../users/usersSlice";
import {RootState} from "../../app/store";

export interface Category {
    id: string | null;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;
    user: string;
}
export interface  Image {
    path: Required<string>;
    id: Required<string>;
}
interface CategoriesState {
    images: Image[] | null
}
const initialState: CategoriesState ={

    images: [
        {
            path: '../../../images/jams-g0a1a99a3b_1280.jpg',
            id: '1'
        },
        {
            path: '../../../images/olive-oil-ga7467deea_1280.jpg',
            id: '2'
        },
        {
            path: '../../../images/rice-g63090c71a_1280.jpg',
            id: '3'
        },
        {
            path: '../../../images/spices.jpg',
            id: '4'
        },
        {
            path: '../../../images/tagliatelle-gd39678393_1280.jpg',
            id: '5'
        }
    ]


}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState ,
    reducers: {
        // categoryAdded(state, action: PayloadAction<Category>) {
        //     state.categories.push(action.payload)
        // }


    }
})
// export const { categoryAdded } = categoriesSlice.actions;
// export const selectAllCategories = (state: RootState) => state.categories.categories
//export const selectCategoryByTitle = (state, categoryTitle) => state.categories.find((categoryTitle)=> category.title === categoryTitle)
export const selectAllImages = (state: RootState) => state.categories.images
export default categoriesSlice.reducer