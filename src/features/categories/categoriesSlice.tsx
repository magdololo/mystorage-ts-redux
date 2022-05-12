import {createSlice, createSelector, PayloadAction} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";
import {User} from "../users/usersSlice";
import {RootState} from "../../app/store";

export interface Category {
    id: Required<string>;
    path: Required<string>;
    url: Required<string>;
    title: Required<string>;

}
export interface  Image {
    path: Required<string>;
    id: Required<string>;
}
interface CategoriesState {
    categories: Array<Category>;
    images: Image[] | null
}
const initialState: CategoriesState ={
    categories:  [
        {
            title: 'słodycze',
            path: 'słodycze',
            url: '../../../images/canned-fish.jpg',
            id: '1'
        },
        {
            title: 'mąka kasza ryż',
            path: 'mąka_kasza_ryż',
            url: '../../../images/cereal-g509657861_1280.jpg',
            id: '2'
        },
        {
            title: 'oleje i oliwy',
            path: 'oleje_i_oliwy',
            url: '../../../images/dips-g0b38e50f2_1280.jpg',
            id: '3'
        },
        {
            title: 'makarony',
            path: 'makarony',
            url: '../../../images/for-baking-unsplash.jpg',
            id: '4'
        },
        {
            title: 'mrożonki',
            path: 'kawa_herbata',
            url: '../../../images/rice-g63090c71a_1280.jpg',
            id: '5'
        },
        {
            title: 'dżemy',
            path: 'kawa_herbata',
            url: '../../../images/sugar-gc3aa1831d_1280.jpg',
            id: '6'
        },
        {
            title: 'makarony',
            path: 'makarony',
            url: '../../../images/candies-g5fd12865c_1280.jpg',
            id: '7'
        },
        {
            title: 'mrożonki',
            path: 'skawa_herbata',
            url: '../../../images/tagliatelle-gd39678393_1280.jpg',
            id: '8'
        },
        {
            title: 'dżemy',
            path: 'skawa_herbata',
            url: '../../../images/snacs-evsoUV1EyXY-unsplash.jpg',
            id: '9'
        },
    ],
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
        categoryAdded(state, action: PayloadAction<Category>) {
            state.categories.push(action.payload)
        }


    }
})
export const { categoryAdded } = categoriesSlice.actions;
export const selectAllCategories = (state: RootState) => state.categories.categories
//export const selectCategoryByTitle = (state, categoryTitle) => state.categories.find((categoryTitle)=> category.title === categoryTitle)
export const selectAllImages = (state: RootState) => state.categories.images
export default categoriesSlice.reducer