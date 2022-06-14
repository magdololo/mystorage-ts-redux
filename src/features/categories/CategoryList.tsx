import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import AppTitle from "../../app/TopMenu/AppTitle";
import TopMenu from "../../app/TopMenu/TopMenu";
import {Modal} from "../../component/Modal/Modal";
import AddCategoryForm from "./AddCategoryForm";

import {login, logout, selectUser} from "../users/usersSlice";

import {skipToken} from "@reduxjs/toolkit/query";
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    currentCategoryChange,
    fetchCategories,
    selectAllCategoriesSortedByRequired
} from "./categoriesSlice";
import {fetchAllProducts} from "../products/allProductsSlice";
import { Spinner } from '../../component/Spinner'
import {fetchUserProducts} from "../products/userProductsSlice";


export const CategoryList = () => {
    let user = useSelector(selectUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalHeader = "Dodaj nową kategorię"
    console.log(user)
    const dispatch = useAppDispatch()
    const categoriesStatus = useAppSelector(((state) => state.categories.status))
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)

    useEffect(() => {
        dispatch(fetchCategories(user?.uid ?? ""))
        dispatch(fetchUserProducts(user?.uid ?? ""))
        dispatch(fetchAllProducts())
    }, [user, dispatch])


    useEffect(()=> {
        dispatch(currentCategoryChange(null))
    }, [dispatch])
    let content;
    if (categoriesStatus === "loading") {
      content = <Spinner text="Loading..." />;
    } else if (categoriesStatus === "succeeded") {
      const renderedCategories = categories?.map(category => (

            <li className="h-auto flex flex-col relative" key={category?.id}>
                <Link to={`/categories/${category?.path}`}>
                    <img src={category?.url} className="w-full h-auto object-cover flex-1 flex-grow" alt="Louvre"/>
                    <span
                        className="absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70 capitalize text-center text-white font-bold">{category?.title}</span>
                </Link>
            </li>
        ))
        content =
            <>
                <div className="w-screen-xs mx-auto max-w-screen-xl mb-32">
                    <div className="flex flex-nowrap w-full min-h-min items-center">
                        <div className="flex flex-wrap min-w-fit w-10/12 mx-auto pb-36">
                            <div className="grid grid-cols-3 gap-2 overflow-y-auto">
                            {renderedCategories}
                                <div className="mb-4 border-solid border-purple border-2 border-opacity-25"
                                     onClick={handleOpen}>
                                    <div className=" relative overflow-hidden bg-no-repeat bg-cover max-w-xs ">
                                        <img src="http://placehold.jp/ffffff/ffffff/1280x900.png"
                                             className="max-w-xs bg-cover"/>
                                            <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed">
                                                <div className="relative mx-auto top-1/3 text-purple font-bold text-2xl h-5 w-5 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                                    </svg>
                                                </div>
                                            <div className="relative text-center top-1/3  text-gray font-bold text-2xl px-6 md:px-12 ">
                                                <button className="font-bold text-md leading-tight uppercase text-center">
                                                    <span className="text-center block justify-center align-middle uppercase text-gray-500 z-100 ">Dodaj katregorię</span>
                                                </button>
                                            </div>
                                            </div>
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

    } else if (categoriesStatus === "failed") {
        content = <div><span> ups.. coś poszło nie tak</span></div>;
    }

    return (
        <>
            <AppTitle/>
            <TopMenu/>
            {content}
            <Modal isShown={open} hide={handleClose} modalHeaderText={modalHeader} modalContent={<AddCategoryForm closeAddCategoryModal={handleClose} />  }/>
        </>

    )
}
export default CategoryList;

//