//@ts-nocheck


import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Link} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import TopMenu from "../../app/TopMenu/TopMenu";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { Spinner } from '../../component/Spinner'
import {changeSeeGreetingToTrue, selectUser, User} from "../users/usersSlice";

import {skipToken} from "@reduxjs/toolkit/query";
import {
    currentCategoryChange,
    deleteCategory,
    fetchCategories,
    selectAllCategoriesSortedByRequired,
    Category,
} from "./categoriesSlice";
import {fetchImages} from "../images/imagesSlice";
import {fetchAllProducts} from "../products/allProductsSlice";
import {fetchUserProducts, searchProduct} from "../products/userProductsSlice";

import {ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";
import Hamburger from "../../app/BottomMenu/Hamburger";
import SearchInput2 from "../../app/BottomMenu/SearchInput2";
import AddProductForm from "../products/AddProductForm";
import Select from "react-select";




export const CategoryListScreenEn = () => {

    const { t, i18n } = useTranslation();
    console.log(i18n.language)

    let user = useSelector(selectUser);

     const dispatch = useAppDispatch()

    const categories = useAppSelector(selectAllCategoriesSortedByRequired)

    useEffect(() => {
        dispatch(fetchCategories(user?.uid!!))
         dispatch(fetchImages(user?.uid!!))

    }, [user, dispatch])
    const[toggleSwitch, setToggleSwitch] = useState(false);

    const toggleEdit=()=>{
        setToggleSwitch(!toggleSwitch)
    }
    let content;

        const renderedCategories = categories?.map(category => (

            <li className={"h-auto flex flex-col relative" } key={category?.id}>

                    <img src={category?.url} className={"w-full h-auto object-cover flex-1 flex-grow"} alt="Louvre" />

                    <span
                        className={"absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70  text-md sm:text-lg capitalize text-center text-white font-bold"+ (toggleSwitch?"hidden invisible":"")}>{category?.title}</span>

            </li>
        ))
        content =
            <>

                <div className="w-screen-xs mx-auto max-w-screen-xl mb-32">
                    <div className="flex flex-nowrap w-full min-h-min items-center">
                        <div className="flex flex-wrap min-w-fit w-10/12 mx-4 pb-36">
                            <div className="grid grid-cols-2 gap-1 overflow-y-auto lg:grid-cols-3 lg:gap-2 ">
                                {renderedCategories}

                                    <div className=" relative overflow-hidden bg-no-repeat bg-cover border-solid border-purple border-2 border-opacity-25"
                                         >
                                        <img src="http://placehold.jp/ffffff/ffffff/1280x900.png"
                                             className="bg-cover"/>
                                        <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed">
                                            <div className="relative mx-auto top-1/3 text-purple font-bold text-2xl h-5 w-5 ">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                                </svg>
                                            </div>
                                            <div className="relative text-center top-1/3  text-gray font-bold pt-2 px-6 md:px-12 ">
                                                <button className="font-bold text-md leading-tight uppercase text-center">
                                                    <span className="text-center block justify-center align-middle uppercase text-gray-500 z-100 text-sm sm:text-md">{t("buttons.addCategory")}</span>
                                                </button>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>



    type OptionType = { value: string , label: string }

    type OptionsType = Array<OptionType>



    const options: OptionsType = [
        { value: 'sunflower oil', label: 'sunflower oil 1l' },
        { value: 'rapeseed oil', label: 'rapeseed oil 500ml' },
        { value: 'linseed oil', label: 'linseed oil 1l' }
    ]
    return (
        <>

            <AppTitle/>
            <TopMenu toggleEdit={toggleEdit} toggleValue={toggleSwitch}/>
            {content}
            {/*<BottomMenu />*/}
            <div className='w-screen fixed top-auto bottom-0 bg-white z-100'>
                <div className="w-11/12 flex  max-w-lg pb-4 mx-auto ">
                    <Hamburger/>
                    {/*{<SearchInput2/>}*/}

                    <div className="flex flex-1 border-fuchsia-800 border-2 rounded-md mr-0.5">
                        <div className=" w-full h-full ">
                           <div className="absolute top-4 px-2 text-gray">oi<span className="text-black">|</span></div>
                            <ul
                                className="

          min-w-max
          absolute
          bottom-10
          bg-white
          text-md
          z-50
          float-left
          py-2

          list-none
          text-left
          rounded-lg
          shadow-lg
          mb-10
          {/*hidden*/}
          m-0
          bg-clip-padding
          border-none
        "
                                aria-labelledby="dropdownMenuButton1"
                            >
                                <li>
                                    <a
                                        className="
              dropdown-item
              text-md
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray-dark
              bg-gray
              bg-opacity-10
              hover:bg-gray-100
            "
                                        href="#"
                                    >linseed oil</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="
              dropdown-item
              text-md
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray
              hover:bg-gray-100
            "
                                        href="#"
                                    >sunflower oil 1l</a
                                    >
                                </li>
                                <li>
                                    <a
                                        className="
              dropdown-item
              text-md
              py-2
              px-4
              font-normal
              block
              w-full
              whitespace-nowrap
              bg-transparent
              text-gray
              hover:bg-gray-100
            "
                                        href="#"
                                    >rapeseed oil 500ml</a
                                    >
                                </li>
                            </ul>
                        </div>

                    </div>

                    <button
                        className="text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 px-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">{t("buttons.addProduct")}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default CategoryListScreenEn;
