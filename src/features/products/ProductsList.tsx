import React, {useState} from "react";
import {useAppSelector, useAppDispatch} from "../../app/store";
import {Link} from "react-router-dom";
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import EditProductForm from "./EditProductForm";
import BottomMenu from "../../app/BottomMenu/BottomMenu";

import {
    changeProductQuantity,
    ChangeQuantity,
    deleteUserProduct,
    editProduct,
    selectUserProducts,
    UserProduct
} from "./userProductsSlice";
import {selectAllCategories} from "../categories/categoriesSlice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useMediaQuery} from "@mui/material";
import {useTranslation} from "react-i18next";
import {
    ProductNameBox,
    ProductsBox,
    ProductsListBox, SinglePageTitle,
    SingleProductBox
} from "../categories/SingleCategoruPage.components";

const ProductsList = () => {
    const {t} = useTranslation()
    const userProducts = useAppSelector(selectUserProducts)
    const dispatch = useAppDispatch()
    const categories = useAppSelector(selectAllCategories)
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Edytuj produkt"
    const maxWidth440 = useMediaQuery('(max-width:440px)');
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    // const notify = () => toast.success('🦄 Produkt usunięty!', {
    //     position: "top-center",
    //     autoClose: 3000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //
    // });
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
        if(userProduct.quantity === 1)
            return
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "decrement"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }

    const deleteUserOneProduct = (userProduct: UserProduct) => {
        dispatch(deleteUserProduct(userProduct))
        // notify()

    }
    const userProductsWithCategory = userProducts.map(userProduct => {
        const searchProductCategory = categories.find(category => category.id === userProduct.categoryId)
        return {...userProduct, categoryPath: searchProductCategory?.path, categoryTitle: searchProductCategory?.title}
    })

    return (
        <>
            {/*<div className="xs:max-w-xl md:max-w-2xl lg:max-w-screen-md mx-auto">*/}
            {isSmallerThan1280 ? <ReturnToCategoryList/>: null}

                {/*<div className="flex mt-2 mx-4">*/}
                {/*    <ul className="pb-16 w-full relative">*/}
                        <ProductsBox>
                                <SinglePageTitle>{t('products.ProductsList.title')}</SinglePageTitle>

                            {/*</Wrapper>*/}
                            {/*</CategoriesSideBar>*/}
                            <ProductsListBox justifyContent = "space-between">
                        {userProductsWithCategory.map((product) =>
                            <SingleProductBox  width={isSmallerThan1280? "100%" : "32%"} height={isSmallerThan1280? "auto" :"240px"}>
                                    <div key={product.id} className="flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4 h-full">

                                        {/*<div className={""}>*/}
                                            <ProductNameBox>
                                                {product.name}
                                            </ProductNameBox>
                                        {/*</div>*/}

                                        <div className={'h-auto mt-auto flex flex-col'}>
                                            {/*<div className=" flex flex-col">*/}
                                            {/*<div className={"w-1/3"}>*/}
                                                <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                                                    {product.capacity}{product.unit}
                                                </div>
                                            {product.expireDate === null && <span></span>}
                                                <div className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                                                    {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""} &nbsp;
                                                </div>

                                        {/*    <div className={""}>*/}
                                                <div className="text-gray-light text-md">{t("products.ProductsList.productCategory")}:
                                                    <Link to={"/categories/" + product.categoryPath}>
                                                        <span className="capitalize text-md align-baseline text-gray font-bold ml-1">{product.categoryTitle}</span>
                                                    </Link>
                                                </div>
                                            {/*</div>*/}
                                        </div>

                                        <div className={"h-1/3 md:flex md:justify-end md:items-end"}>
                                            <div className={"md:flex md:justify-end"}>
                                                <div className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">
                                                    <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg" icon={faMinus} onClick={() => decrement(product)}/>
                                                    <span className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                                    <FontAwesomeIcon className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg" icon={faPlus} onClick={()=>increment(product)}/>
                                                    <FontAwesomeIcon className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>
                                                    <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg" icon={faPen}  onClick={()=>chooseEditProduct(product) }/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SingleProductBox>
                            )}
                            </ProductsListBox>
                            </ProductsBox>
                            {/*    <div className="flex flex-row  w-full items-stretch">*/}

                            {/*        <div className="flex-auto flex-row relative w-6/12 sm:flex-col  md:w-8/12">*/}
                            {/*            <div*/}
                            {/*                className="text-md capitalize align-baseline text-gray  font-bold sm:text-xl">{product.name}*/}
                            {/*            </div>*/}
                            {/*            <div*/}
                            {/*                className={(product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold"}>*/}
                            {/*                {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""}*/}
                            {/*            </div>*/}
                            {/*            <div*/}
                            {/*                className="text-gray-light">{product.capacity}{product.unit}*/}
                            {/*            </div>*/}
                            {/*            <div className="text-gray-light text-md">{t("products.ProductsList.productCategory")}: <Link*/}
                            {/*                to={"/categories/" + product.categoryPath}>*/}
                            {/*                <span*/}
                            {/*                    className="capitalize text-md align-baseline text-gray font-bold">{product.categoryTitle}</span></Link>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*        <div className="flex flex-auto flex-row relative w-6/12 sm:flex-col md:w-4/12 items-center justify-center">*/}
                            {/*            {maxWidth440 ?*/}
                            {/*                <>*/}
                            {/*                    <div*/}
                            {/*                        className="flex flex-col items-center justify-between max-h-20 absolute right-0">*/}
                            {/*                        <div className="h-1/2 pb-1">*/}
                            {/*                            <FontAwesomeIcon*/}
                            {/*                                className="text-xl text-blue-500   px-2"*/}
                            {/*                                icon={faMinus} onClick={() => decrement(product)}/>*/}
                            {/*                            <span*/}
                            {/*                                className="text-xl text-blue-800 px-2 ">{product.quantity}</span>*/}
                            {/*                            <FontAwesomeIcon className="text-xl text-blue-500 border-blue-400 px-2"*/}
                            {/*                                             icon={faPlus}*/}
                            {/*                                             onClick={() => increment(product)}/>*/}

                            {/*                        </div>*/}
                            {/*                        <div className="h-1/2 pt-1">*/}
                            {/*                            <FontAwesomeIcon*/}
                            {/*                                className="text-xl text-blue-800 border-blue-400 border-solid border-r px-6 "*/}
                            {/*                                icon={faTrash}*/}
                            {/*                                onClick={() =>{*/}
                            {/*                                    deleteUserOneProduct(product)*/}

                            {/*                                }}/>*/}
                            {/*                            <FontAwesomeIcon className="text-xl text-blue-800 px-6 "*/}
                            {/*                                             icon={faPen}*/}
                            {/*                                             onClick={() => chooseEditProduct(product)}/>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </>*/}
                            {/*                :*/}
                            {/*                <>*/}
                            {/*                    <div className="flex flex-row flex-nowrap absolute right-0 items-center">*/}
                            {/*                        <FontAwesomeIcon*/}
                            {/*                            className="text-xl text-blue-500  px-4 "*/}
                            {/*                            icon={faMinus} onClick={() => decrement(product)}/>*/}
                            {/*                        <span*/}
                            {/*                            className="text-xl text-blue-800 px-2 ">{product.quantity}</span>*/}
                            {/*                        <FontAwesomeIcon className="text-xl text-blue-500 border-blue-400 border-solid border-r px-4"*/}
                            {/*                                         icon={faPlus} onClick={() => increment(product)}/>*/}

                            {/*                        <FontAwesomeIcon*/}
                            {/*                            className="text-xl text-blue-800 border-blue-400 border-solid border-r px-4 "*/}
                            {/*                            icon={faTrash} onClick={() => {*/}
                            {/*                                deleteUserOneProduct(product)*/}

                            {/*                        }}/>*/}
                            {/*                        <FontAwesomeIcon className="text-xl text-blue-800 px-4 "*/}
                            {/*                                         icon={faPen}*/}
                            {/*                                         onClick={() => chooseEditProduct(product)}/>*/}
                            {/*                    </div>*/}
                            {/*                </>*/}
                            {/*            }*/}

                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</SingleProductBox>*/}
                        {/* )}*/}
                    {/*</ul>*/}

                    <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}
                           modalContent={<EditProductForm handleClose={handleClose} isShown={isShown}/>}/>
                {/*</div>*/}

                <ToastContainer/>


            {/*</div>*/}
            {isSmallerThan1280 ? <BottomMenu/> : null}
        </>
    )
}
export default ProductsList