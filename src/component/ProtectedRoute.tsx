import React from "react";
import {  Route } from "react-router";
import { useSelector } from "react-redux";
import CategoryList from "../features/categories/CategoryList";
const ProtectedRoute = ({ }) => {
    // const user = useSelector((state) => state.auth.value);
    // console.log("user", user);
    return (
        <>
            </>

    //        user ?
    //          <Route path="/" element={<CategoryList/>}/>
    //            :
    //          <Route path="/" element={<CategoryList/>}/>
    //
     );
};

export default ProtectedRoute;
