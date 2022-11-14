import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {Link} from "react-router-dom";
import {Modal} from "../component/Modal/Modal";
import {useModal} from "../component/Modal/UseModal";
import ReturnToCategoryList from "../component/ReturnToCategoryList";
import EditProductForm from "../features/products/EditProductForm";
import BottomMenu from "../layouts/BottomMenu";
import {
    changeProductQuantity,
    ChangeQuantity,
    deleteUserProduct,
    editProduct, selectUserProductById,
    selectUserProducts,
    UserProduct
} from "../slices/userProductsSlice";
import {selectAllCategories} from "../slices/categoriesSlice";
import {useMediaQuery} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useTranslation} from "react-i18next";
import {
    ProductNameBox,
    ProductsBox,
    ProductsListBox,
    SingleProductBox
} from "../styles/Products.components";


const SearchUserProductPage= ()=>{
    const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const userProducts = useAppSelector(selectUserProducts);
    let searchProductId = useAppSelector(state=> state.userProducts.searchProduct)
    let searchUserProductFromSelect = useAppSelector((state) => selectUserProductById(state, searchProductId??"")) ?? {}as UserProduct
    const searchInputValue= useAppSelector(state=>state.userProducts.searchProductByString)
    const maxWidth440 = useMediaQuery('(max-width:440px)');
    const categories = useAppSelector(selectAllCategories)
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("products.SearchUserProductPage.editProduct")
    const isSmallerThan1280 = useMediaQuery('(max-width: 1279px)')
    // const notify = () => toast.success(t('🦄 Products.SearchUserProductPage.toastSuccess!'), {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //
    // });
    let searchProducts: Array<UserProduct>=[]

    if(searchInputValue ){
        const searchUserProductsFromInput = userProducts.filter(userProduct=>userProduct.name.startsWith(searchInputValue??""))
        searchUserProductsFromInput.forEach((searchUserProduct)=>searchProducts.push(searchUserProduct))
    } else {
        searchProducts.push(searchUserProductFromSelect)
    }

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
        // notify()
    }
    let content;

    type SearchProduct = UserProduct & {categoryPath: string, categoryTitle: string}
    const searchProductsWithCategory: SearchProduct[] = searchProducts.map(searchProduct=>{
        const searchProductCategory = categories.find(category=>category.id === searchProduct.categoryId)!
        return { ...searchProduct, categoryPath: searchProductCategory.path, categoryTitle: searchProductCategory.title}
    })
    if(searchProductsWithCategory.length > 0){
       content =
           <ProductsListBox justifyContent={"none"}>
           {searchProductsWithCategory.map((product:SearchProduct) =>
               <SingleProductBox width={isSmallerThan1280? "100%" : "32%"} height={isSmallerThan1280? "auto" :"240px"}>
                   <div key={product.id} className="flex flex-col relative px-2 pt-2 pb-2 cursor-pointer md:pb-4 h-full">
                       <ProductNameBox>
                           {product.name}
                       </ProductNameBox>
                       <div className={'h-auto mt-auto flex flex-col'}>
                           <div className="text-md text-gray-light  pb-1.5 sm:text-sm md:text-base">
                               {product.capacity}{product.unit}
                           </div>
                           {product.expireDate === null && <span></span>}
                           <div className={"text-sm md:text-md " + ((product.expireDate !== null && product?.expireDate > todayDate) ? "text-gray-light" : "text-red font-bold")}>
                               {product.expireDate ? product.expireDate.toISOString().substring(0, 10) : ""} &nbsp;
                           </div>
                           <div className="text-gray-light text-md">{t("products.ProductsList.productCategory")}:
                               <Link to={"/categories/" + product.categoryPath}>
                                   <span className="capitalize text-md align-baseline text-gray font-bold ml-1">{product.categoryTitle}</span>
                               </Link>
                           </div>
                       </div>
                       {maxWidth440 ?
                           <>
                               <div className="flex flex-auto flex-row relative w-6/12 sm:flex-col md:w-4/12 items-center justify-center">
                                   <div className="flex flex-col items-center justify-between max-h-20 absolute right-0">
                                       <div className="h-1/2 pb-1">
                                           <FontAwesomeIcon className="text-xl text-blue-500 px-2" icon={faPlus} onClick={() => increment(product)}/>
                                           <span className="text-xl text-blue-800 px-2 ">{product.quantity}</span>
                                           <FontAwesomeIcon className="text-xl text-blue-500 border-blue-400  px-2" icon={faMinus} onClick={() => decrement(product)}/>
                                       </div>
                                       <div className="h-1/2 pt-1">
                                           <FontAwesomeIcon className="text-xl text-blue-800 border-blue-400 border-solid border-r px-6 " icon={faTrash} onClick={() => deleteUserOneProduct(product)}/>
                                           <FontAwesomeIcon className="text-xl text-blue-800 px-6 " icon={faPen} onClick={() => chooseEditProduct(product)}/>
                                       </div>
                                   </div>
                               </div>
                           </> :
                           <>
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
                           </>
                       }

                   </div>
               </SingleProductBox>
           )}
           </ProductsListBox>
    } else {
        content = <h2>{t("products.SearchUserProductPage.noSearchResult")}.</h2>
    }
    return(
        <>
            {isSmallerThan1280 ? <ReturnToCategoryList/>: null}
            <ProductsBox>
                <div className="text-center text-gray-dark pt-2 pb-2px-6">
                    <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">{t("products.SearchUserProductPage.searchResult")}</h1>
                </div>
                {content}
            </ProductsBox>
            <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={<EditProductForm handleClose={handleClose} isShown={isShown} />}/>
            <ToastContainer />
            {isSmallerThan1280 ? <BottomMenu/> : null}
        </>
    )
}

 export default SearchUserProductPage;
