import {useTranslation} from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Link, useLocation, useParams} from "react-router-dom";
import {Category, selectAllCategoriesSortedByRequired, selectCategoryByPath} from "./categoriesSlice";
import {
    changeProductQuantity,
    ChangeQuantity, deleteUserProduct,
    editProduct,
    selectProductsOfCategory,
    UserProduct
} from "../products/userProductsSlice";
import React, {useState} from "react";
import {useModal} from "../../component/Modal/UseModal";
import {useMediaQuery} from "usehooks-ts";
import {
    MainContent,
    ProductsListBox,
    ContentGrid,
    ProductsBox,
    SingleCategoryBox,
    ProductsListContent, CategoriesSideBar
} from "./SingleCategoruPage.components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import CategoryPageSecond from "./CategoryPageSecond";

const SingleCategoryPage = () => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const {categoryPath} = useParams();
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)
    const categoryFromPath = useAppSelector(selectCategoryByPath(categoryPath ?? "")) as Category
    console.log(categoryFromPath)
    const categoryId = categoryFromPath?.id
    const currentCategory = categories.find(category => category?.id === categoryId)
    const productsOfCategory = useAppSelector(selectProductsOfCategory(categoryId ?? "")) as UserProduct[]
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("categories.CategoryPage.editProduct")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    const location = useLocation();
    console.log(location)
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
    return (
        <>
            <div className=" mx-auto max-w-screen-xl mb-32 mt-2 px-4">
                <MainContent>
                    {/*<Wrapper>*/}
                    <CategoriesSideBar>
                        {/*<CategoriesSideBar>*/}
                        <SingleCategoryBox className={"mainCategory"} key={categoryId}> <Link to={`/categories/${categoryId}`}>
                            <img src={currentCategory?.url}
                                 className={"w-full h-auto object-cover flex-1 flex-grow"}
                                 alt="Louvre"/>

                            {/*<span*/}
                            {/*        className={"absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70  text-sm sm:text-md md:text-lg capitalize text-center text-white font-bold"}>*/}
                            {/*        {currentCategory?.title}</span>*/}

                        </Link></SingleCategoryBox>
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

                            ))}
                        </ProductsListContent>
                    </CategoriesSideBar>
                    <ProductsBox>
                        <div className="text-center text-gray-dark pt-2 pb-2px-6">
                            <h1 className="text-xl font-bold text-gray-light mt-0 mb-6 capitalize sm:text-2xl">{categoryFromPath?.title}</h1>
                        </div>

                    {/*</Wrapper>*/}
                    {/*</CategoriesSideBar>*/}
                    {/*<ProductsListBox>*/}
                    {productsOfCategory.map((product: UserProduct) =>
                        <div>
                            <div key={product.id} className=" flex flex-col relative px-2 pt-2 pb-2 border border-gray-extraLight rounded-sm cursor-pointer md:pb-4">
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
                                <div className={"h-1/3 md:flex md:pt-4 md:justify-end"}>
                                    <div className={"md:flex md:pt-4 md:justify-end"}>
                                        <div className="flex flex-row flex-nowrap  relative items-center pt-4 justify-end">
                                            <FontAwesomeIcon className="text-md text-blue-500  px-4 sm:text-lg" icon={faMinus} onClick={() => decrement(product)}/>
                                            <span className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                            <FontAwesomeIcon className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg" icon={faPlus} onClick={()=>increment(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg" icon={faPen}  onClick={()=>chooseEditProduct(product) }/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    </ProductsBox>
                    {/*    <CategoryPageSecond/>*/}
                    {/*</ProductsListBox>*/}
                </MainContent>
            </div>
        </>
    );
};
export default SingleCategoryPage