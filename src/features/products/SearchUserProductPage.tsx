import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Link} from "react-router-dom";

import EditProductForm from "./EditProductForm";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";

import {
    changeProductQuantity,
    ChangeQuantity,
    deleteUserProduct,
    editProduct, selectUserProductById,
    selectUserProducts,
    UserProduct
} from "./userProductsSlice";
import {selectAllCategories} from "../categories/categoriesSlice";

import {useMediaQuery} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

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
    const modalHeader = "Edytuj produkt"
    const notify = () => toast.success('🦄 Produkt usunięty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });
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
        notify()
    }

    let content;
    type SearchProduct = UserProduct & {categoryPath: string, categoryTitle: string}
    const searchProductsWithCategory: SearchProduct[] = searchProducts.map(searchProduct=>{
        const searchProductCategory = categories.find(category=>category.id === searchProduct.categoryId)!
        return { ...searchProduct, categoryPath: searchProductCategory.path, categoryTitle: searchProductCategory.title}
    })

    if(searchProductsWithCategory.length > 0){
       content =
           <ul className="pb-16 w-full relative">
           {searchProductsWithCategory.map((product:SearchProduct) =>
               <li key={product.id}
                   className="flex flex-col relative px-6 py-6 border-b border-gray-extraLight w-full rounded-t-lg cursor-pointer">
                   <div className="flex flex-row  w-full items-stretch">

                       <div className="flex-auto flex-row relative w-6/12 sm:flex-col  md:w-8/12">
                           <div
                               className="text-md capitalize align-baseline text-gray  font-bold sm:text-xl">{product.name}
                           </div>
                           <div
                               className={ (product.expireDate !== null && product?.expireDate > todayDate ) ? "text-gray-light" : "text-red font-bold"}>
                               {product.expireDate ? product.expireDate.toISOString().substring(0,10) : ""}
                           </div>
                           <div
                               className="text-gray-light">{product.capacity}{product.unit}
                           </div>
                           <div className="text-gray-light text-md">Kategoria: <Link to={"/categories/"+product.categoryPath}>
                               <span className="capitalize text-md align-baseline text-gray font-bold">{product.categoryTitle}</span></Link>
                           </div>
                       </div>


                       <div className="flex flex-auto flex-row relative w-6/12 sm:flex-col md:w-4/12 items-center justify-center">
                           {maxWidth440 ?
                               <>
                                   <div
                                       className="flex flex-col items-center justify-between max-h-20 absolute right-0">
                                       <div className="h-1/2 pb-1">
                                           <FontAwesomeIcon className="text-xl text-blue-500 px-2"
                                                            icon={faPlus}
                                                            onClick={() => increment(product)}/>
                                           <span
                                               className="text-xl text-blue-800 px-2 ">{product.quantity}</span>
                                           <FontAwesomeIcon
                                               className="text-xl text-blue-500 border-blue-400  px-2"
                                               icon={faMinus} onClick={() => decrement(product)}/>
                                       </div>
                                       <div className="h-1/2 pt-1">
                                           <FontAwesomeIcon
                                               className="text-xl text-blue-800 border-blue-400 border-solid border-r px-6 "
                                               icon={faTrash}
                                               onClick={() => deleteUserOneProduct(product)}/>
                                           <FontAwesomeIcon className="text-xl text-blue-800 px-6 "
                                                            icon={faPen}
                                                            onClick={() => chooseEditProduct(product)}/>
                                       </div>
                                   </div>
                               </>
                               :
                               <>
                                   <div className="flex flex-row flex-nowrap absolute right-0 items-center">
                                       <FontAwesomeIcon className="text-xl text-blue-500 px-4"
                                                        icon={faPlus} onClick={() => increment(product)}/>
                                       <span
                                           className="text-xl text-blue-800 px-2 ">{product.quantity}</span>
                                       <FontAwesomeIcon
                                           className="text-xl text-blue-500 border-blue-400 border-solid border-r px-4 "
                                           icon={faMinus} onClick={() => decrement(product)}/>
                                       <FontAwesomeIcon
                                           className="text-xl text-blue-800 border-blue-400 border-solid border-r px-4 "
                                           icon={faTrash} onClick={() => deleteUserOneProduct(product)}/>
                                       <FontAwesomeIcon className="text-xl text-blue-800 px-4 "
                                                        icon={faPen}
                                                        onClick={() => chooseEditProduct(product)}/>
                                   </div>
                               </>
                           }

                       </div>
                   </div>
               </li>
           )}
           </ul>
    } else {
        content = <h2>Brak wyników wyszukiwania.</h2>
    }
    return(
        <>
            <div className="xs:max-w-xl md:max-w-2xl lg:max-w-screen-md mx-auto">
                <AppTitle/>
                <div className="text-center text-gray-dark pt-2 pb-2px-6">
                    <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">{t("products.SearchUserProductPage.searchResult")}</h1>
                </div>
                <ReturnToCategoryList/>
                <div className="flex mt-2">
                    {content}
                </div>

                <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={<EditProductForm handleClose={handleClose} isShown={isShown} />}/>

            </div>
            <BottomMenu />
        </>
    )
}

export default SearchUserProductPage;