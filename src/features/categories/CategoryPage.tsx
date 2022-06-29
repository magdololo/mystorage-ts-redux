import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {skipToken} from "@reduxjs/toolkit/query";
import {selectAllCategories, currentCategoryChange, Category} from "./categoriesSlice";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    ChangeQuantity,
    deleteUserProduct,
    editProduct,
    selectUserProducts,
    UserProduct
} from "../products/userProductsSlice";
import {changeProductQuantity} from "../products/userProductsSlice";
import {
    faTrash, // the clock icon
    faPlus, // the user circle icon
    faMinus, // a cup of coffee
    faPen
} from "@fortawesome/free-solid-svg-icons";
import {Modal} from "../../component/Modal/Modal";
import EditProductForm from "../products/EditProductForm";
import {useModal} from "../../component/Modal/UseModal";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {ToastContainer} from "react-toastify";




const CategoryPage = () => {

    const dispatch = useAppDispatch();
    const {categoryPath} = useParams();
    const userProducts = useAppSelector(selectUserProducts)
    const categories = useAppSelector(selectAllCategories)
    const categoryFromPath = useAppSelector((state) => categories.find(category => category.path === categoryPath))
    const categoryId = categoryFromPath?.id
    const productsOfCategory = useAppSelector((state) => userProducts.filter(product => product.categoryId === categoryId))
    console.log(productsOfCategory)
    let [todayDate] = useState(new Date());
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Edytuj produkt"
    useEffect(()=> {
        dispatch(currentCategoryChange(categoryFromPath as Category))
    }, [dispatch, categoryFromPath])


     const chooseEditProduct = (userProduct: UserProduct) =>{
        handleShown()
        let editingProduct = dispatch(editProduct(userProduct))
        console.log(editingProduct)
    }


     const increment = (userProduct: UserProduct) => {
        const changeQuantityProduct: ChangeQuantity = {
            userProduct: userProduct,
            changeQuantity: "increment"
        }
        dispatch(changeProductQuantity(changeQuantityProduct))
    }
    const decrement = (userProduct: UserProduct)  => {
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
            <div className="xs:max-w-xl md:max-w-2xl lg:max-w-screen-md mx-auto">
                <AppTitle/>
                <div className="text-center text-gray-dark pt-2 pb-2px-6">
                    <h1 className="text-2xl font-bold text-gray-light mt-0 mb-6 capitalize">{categoryFromPath?.title}</h1>
                </div>
                <ReturnToCategoryList/>

                <div className="flex mt-2">
                    <ul className="pb-16 w-full relative">
                        {productsOfCategory.map((product) =>
                            <li key={product.id} className="flex flex-col relative px-6 py-6 border-b border-gray-extraLight w-full rounded-t-lg cursor-pointer">
                                <div className = "flex flex-row flex-nowrap w-full ">

                                    <div className="flex-auto flex-col w-8/12 relative">
                                        <div
                                            className= "capitalize align-baseline text-gray text-xl font-bold">{product.name}
                                        </div>
                                        <div
                                            className={ (product.expireDate !== null && product?.expireDate > todayDate ) ? "text-gray-light" : "text-red font-bold"}>
                                            {product.expireDate ? product.expireDate.toISOString().substring(0,10) : ""}
                                        </div>
                                        <div
                                            className="text-gray-light">{product.capacity}{product.unit}
                                        </div>
                                    </div>

                                    <div className="flex flex-auto flex-nowrap w-4/12 relative ">
                                        <div className="absolute right-0 self-center">

                                            <FontAwesomeIcon className="text-xl text-blue-500 px-4" icon={faPlus} onClick={()=>increment(product)}/>
                                            <span className="text-xl text-blue-800 px-2">{product.quantity}</span>
                                            <FontAwesomeIcon className="text-xl text-blue-500 border-blue-400 border-solid border-r px-4" icon={faMinus} onClick={() => decrement(product)}/>
                                            <FontAwesomeIcon className="text-xl text-blue-800 border-blue-400 border-solid border-r px-4" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>
                                            <FontAwesomeIcon className="text-xl text-blue-800 px-4" icon={faPen}  onClick={()=>chooseEditProduct(product) }/>

                                        </div>

                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
                <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={<EditProductForm handleClose={handleClose} isShown={isShown} />}/>

                <ToastContainer />


            </div>
            <BottomMenu />
        </>
    )
}
export default CategoryPage;