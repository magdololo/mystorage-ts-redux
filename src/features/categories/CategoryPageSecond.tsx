import React, {useEffect, useState, } from "react";
import {useParams,useLocation, Route} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/store";
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import EditProductForm from "../products/EditProductForm";
import BottomMenu from "../../app/BottomMenu/BottomMenu";

import {currentCategoryChange, selectCategoryByPath, Category,} from "./categoriesSlice";//

import {
    ChangeQuantity,
    deleteUserProduct,
    editProduct, selectProductsOfCategory,
    UserProduct
} from "../products/userProductsSlice";
import {changeProductQuantity} from "../products/userProductsSlice";
import {
    faTrash, // the clock icon
    faPlus, // the user circle icon
    faMinus, // a cup of coffee
    faPen
} from "@fortawesome/free-solid-svg-icons";


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";
import {useMediaQuery} from "usehooks-ts";
import {ProductsListContent, SingleProductBox} from "./SingleCategoruPage.components";


const CategoryPageSecond = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const {categoryPath} = useParams();
    const categoryFromPath = useAppSelector(selectCategoryByPath(categoryPath ?? "")) as Category
    console.log(categoryFromPath)
    const categoryId = categoryFromPath?.id
    const productsOfCategory = useAppSelector(selectProductsOfCategory(categoryId ?? "")) as UserProduct[]
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("categories.CategoryPage.editProduct")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    const location = useLocation();
    console.log(location)


    // const notify = () => toast.success('🦄 t("categories.CategoryPage.toastSuccessfully!")', {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //
    // });

    useEffect(() => {
        dispatch(currentCategoryChange(categoryFromPath))
    }, [dispatch, categoryFromPath])


    const chooseEditProduct = (userProduct: UserProduct) => {
        handleShown()
        dispatch(editProduct(userProduct))

    }


    const increment = (userProduct: UserProduct) => {
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "increment"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const decrement = (userProduct: UserProduct) => {
        if (userProduct.quantity === 1)
            return
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "decrement"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const deleteUserOneProduct = (userProduct: UserProduct) => {
        dispatch(deleteUserProduct(userProduct))

    }



    return (

        <>
            {/*<AppTitle/>*/}
            {/*<div className="text-center text-gray-dark pt-2 pb-2 px-6">*/}
            {/*    <h1 className="text-xl font-bold text-gray-light mt-0 mb-6 capitalize sm:text-2xl">{categoryFromPath?.title}</h1>*/}
            {/*</div>*/}
            {isSmallerThan1280 ? <ReturnToCategoryList/>: null}

            {/*<div className=" mx-auto max-w-screen-xl mb-32 mt-2 px-4">*/}
            {/*            <div className="grid  gap-1.5 sm:grid-cols-2 sm:gap-1 lg:grid-cols-3 lg:gap-2 ">*/}
            <ProductsListContent>
                            {productsOfCategory.map((product: UserProduct) =>
                                <SingleProductBox width={"47%"} height={"240px"}>
                                <div key={product.id} >
                                    <div className={"h-1/3 "}>
                                        <div className="text-lg  text-gray font-bold capitalize align-baseline pb-4 sm:text-md md:pb-2 md:text-lg md:text-xl">
                                            {product.name}
                                        </div>
                                    </div>
                                    <div className="h-1/3 flex flex-col md:flex-row ">
                                        <div className={"w-1/3"}>
                                            <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                                                {product.capacity}{product.unit}
                                            </div>
                                            <div className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                                                {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""}
                                            </div>
                                        </div>
                                    </div>
                                        <div className={"h-1/3 md:flex md:pb-4 md:justify-end"}>
                                            <div className={"md:flex md:pt-4 md:justify-end"}>
                                                <div className=" flex flex-row flex-nowrap  relative items-center pt-4 justify-end">

                                                    <FontAwesomeIcon
                                                        className="text-lg text-blue-500 px-4  sm:px-2.5  md:text-lg md:px-4"
                                                        icon={faMinus} onClick={() => decrement(product)}/>
                                                    <span
                                                        className="text-lg text-blue-800 px-4 sm:text-md  sm:px-2.5  md:text-lg md:px-4">{product.quantity}</span>
                                                    <FontAwesomeIcon
                                                        className="text-lg text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-md sm:px-2.5  md:text-lg md:px-4"
                                                        icon={faPlus} onClick={() => increment(product)}/>
                                                    <FontAwesomeIcon
                                                        className="text-ld text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-md sm:px-2.5  md:px-4 md:text-lg"
                                                        icon={faTrash} onClick={() => deleteUserOneProduct(product)}/>
                                                    <FontAwesomeIcon
                                                        className="text-lg text-blue-800 px-4 sm:text-md sm:px-2.5  md:text-lg md:px-4"
                                                        icon={faPen}
                                                        onClick={() => chooseEditProduct(product)}/>

                                                </div>
                                            </div>
                                        </div>
                                </div>
                                </SingleProductBox>
                            )}

                        {/*</div>*/}
                    {/*</div>*/}
        </ProductsListContent>
            <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}
                   modalContent={<EditProductForm handleClose={handleClose} isShown={isShown}/>}/>

            <ToastContainer/>

            {isSmallerThan1280 ? <BottomMenu/> : null}
        </>
    )
}
export default CategoryPageSecond;
