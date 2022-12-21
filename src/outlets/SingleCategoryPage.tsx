import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../app/store";
import {Link, useParams} from "react-router-dom";
import {Category, selectAllCategoriesSortedByRequired, selectCategoryByPath} from "../slices/categoriesSlice";
import {
    changeProductQuantity,
    ChangeQuantity, deleteUserProduct,
    editProduct,
    selectProductsOfCategory,
    UserProduct
} from "../slices/userProductsSlice";
import React, {useState} from "react";
import {useModal} from "../component/Modal/UseModal";
import {useMediaQuery} from "usehooks-ts";
import {
    MainContent,
    SingleCategoryBox,
    ProductsListContent, CategoriesSideBar,
} from "../styles/Categories.components";
import {ProductsListBox, ProductsBox, SingleProductBox, ProductNameBox} from "../styles/Products.components"
import {SinglePageTitle} from  "../styles/Root.components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";

import {Modal} from "../component/Modal/Modal";
import EditProductForm from "../features/products/EditProductForm";


import ReturnToCategoryList from "../component/ReturnToCategoryList";

const SingleCategoryPage = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const {categoryPath} = useParams();
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)
    const categoryFromPath = useAppSelector(selectCategoryByPath(categoryPath ?? "")) as Category
    const categoryId = categoryFromPath?.id
    const currentCategory = categories.find(category => category?.id === categoryId)
    const productsOfCategory = useAppSelector(selectProductsOfCategory(categoryId ?? "")) as UserProduct[]
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("categories.CategoryPage.editProduct")
    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')
    const categoriesWithoutCurrentCategory = categories?.filter(category => category !== currentCategory)

    const chooseEditProduct = (userProduct: UserProduct) =>{
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
    const decrement = (userProduct: UserProduct)  => {
        if(userProduct.quantity === 1)
            return
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "decrement"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const deleteUserOneProduct =  (userProduct: UserProduct)  => {
        dispatch(deleteUserProduct(userProduct))

    }
    console.log(categoryPath)
    return (
        <>
            {isLargerThan1280 ? null : <ReturnToCategoryList/>}
            {isLargerThan1280 ?
                <>
                <div className=" mx-auto max-w-screen-xl mb-32 mt-2 px-4">
                    <MainContent>
                        <CategoriesSideBar>
                            <SingleCategoryBox className={"mainCategory"} key={categoryId}>
                                <Link to={`/categories/${categoryId}`}>
                                    <img src={currentCategory?.url}
                                         className={"w-full h-auto object-cover flex-1 flex-grow"}
                                         alt="Louvre"/>
                                </Link>
                            </SingleCategoryBox>

                            <ProductsListContent>

                                {categoriesWithoutCurrentCategory.map(category =>
                                    (
                                        <SingleCategoryBox className={"singleOtherCategory"}
                                                           key={category?.id}>

                                            <Link to={`/categories/${category?.path}`}>
                                                <img src={category?.url}
                                                     className={"w-full h-auto object-cover flex-1 flex-grow"}
                                                     alt="Louvre"/>

                                                <span
                                                    className={"absolute align-middle bottom-0 left-0 right-0 h-full inline-flex items-center justify-center px-2 bg-black opacity-70  text-sm sm:text-md md:text-lg lg:text-md capitalize text-center text-white font-bold"}>{category?.title}</span>

                                            </Link>
                                        </SingleCategoryBox>

                                    )
                                )}
                            </ProductsListContent>

                        </CategoriesSideBar>
                        <ProductsBox>
                            <SinglePageTitle>{categoryFromPath?.title}</SinglePageTitle>
                            <ProductsListBox justifyContent={"space-between"}>
                                {productsOfCategory.map((product: UserProduct) =>
                                    <SingleProductBox primary={false} key={product.id}>
                                        <div key={product.id}
                                             className=" flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4">
                                            <ProductNameBox>
                                                {product.name}
                                            </ProductNameBox>

                                            <div className={'h-auto mt-auto flex flex-col'}>
                                                <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                                                    {product.capacity}{product.unit}
                                                </div>
                                                {product.expireDate === null && <span></span>}
                                                <div
                                                    className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                                                    {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""} &nbsp;
                                                </div>
                                            </div>

                                            <div className={"h-1/3 md:flex md:justify-end md:items-end"}>
                                                <div className={"md:flex md:justify-end"}>
                                                    <div
                                                        className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">
                                                        <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg"
                                                                         icon={faMinus} onClick={() => decrement(product)}/>
                                                        <span
                                                            className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                                        <FontAwesomeIcon
                                                            className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg"
                                                            icon={faPlus} onClick={() => increment(product)}/>
                                                        <FontAwesomeIcon
                                                            className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl"
                                                            icon={faTrash} onClick={() => deleteUserOneProduct(product)}/>
                                                        <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg"
                                                                         icon={faPen}
                                                                         onClick={() => chooseEditProduct(product)}/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </SingleProductBox>
                                )}
                            </ProductsListBox>
                        </ProductsBox>


                    </MainContent>
                </div>
                </>
                :
                <ProductsBox>
                    <SinglePageTitle>{categoryFromPath?.title}</SinglePageTitle>
                    <ProductsListBox justifyContent={"space-between"}>
                        {productsOfCategory.map((product: UserProduct) =>
                            <SingleProductBox primary={true} key={product.id}>
                                <div key={product.id}
                                     className=" flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4">
                                    <ProductNameBox>
                                        {product.name}
                                    </ProductNameBox>

                                    <div className={'h-auto mt-auto flex flex-col'}>
                                        <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                                            {product.capacity}{product.unit}
                                        </div>
                                        {product.expireDate === null && <span></span>}
                                        <div
                                            className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                                            {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""} &nbsp;
                                        </div>
                                    </div>

                                    <div className={"h-1/3 md:flex md:justify-end md:items-end"}>
                                        <div className={"md:flex md:justify-end"}>
                                            <div
                                                className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end items-end">
                                                <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg"
                                                                 icon={faMinus} onClick={() => decrement(product)}/>
                                                <span
                                                    className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                                <FontAwesomeIcon
                                                    className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg"
                                                    icon={faPlus} onClick={() => increment(product)}/>
                                                <FontAwesomeIcon
                                                    className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl"
                                                    icon={faTrash} onClick={() => deleteUserOneProduct(product)}/>
                                                <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg"
                                                                 icon={faPen}
                                                                 onClick={() => chooseEditProduct(product)}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </SingleProductBox>
                        )}
                    </ProductsListBox>
                </ProductsBox>
            }

                <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={<EditProductForm handleClose={handleClose} isShown={isShown} />}/>


        </>
    );
};
export default SingleCategoryPage