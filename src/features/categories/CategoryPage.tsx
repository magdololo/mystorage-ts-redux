import React, {useEffect} from "react";
import {useParams} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";

import {skipToken} from "@reduxjs/toolkit/query";
import {selectUser} from "../users/usersSlice";
import {useSelector} from "react-redux";
import {fetchCategories, selectAllCategories, selectCategoryByPath} from "./categoriesSlice";
import { useAppSelector} from "../../app/store";
import {selectUserProducts} from "../products/userProductsSlice";
import {fetchUserProducts} from "../products/userProductsSlice";
import ListProductsOfCategory from "../../component/ListProductsOfCategory";

const CategoryPage= ()=> {
    const {categoryPath } = useParams();
    const categoryFromPath = useAppSelector(selectCategoryByPath)
    console.log(categoryFromPath)
    // let categories = useSelector(selectAllCategories)
    // const categoryFromPath = categories.find(category => category.path === categoryPath);
    // const categoryId = categoryFromPath?.id
    // const categoryName = categoryFromPath?.title
    // const categoriesStatus = useAppSelector(((state) => state.categories.status))

    return(
        <>
            <div className="xs:w-full md:max-w-5xl lg:max-w-screen-md mx-auto">
            <AppTitle/>
            <div className="text-center text-gray-dark pt-2 pb-2px-6">
                <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">{categoryFromPath}</h1>
            </div>
            <ReturnToCategoryList/>
            <ListProductsOfCategory/>
            </div>
        </>
    )
}
export default CategoryPage;
