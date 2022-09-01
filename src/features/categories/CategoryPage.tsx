import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/store";
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import EditProductForm from "../products/EditProductForm";
import BottomMenu from "../../app/BottomMenu/BottomMenu";

import {selectAllCategories, currentCategoryChange, Category} from "./categoriesSlice";

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


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const CategoryPage = () => {

    const dispatch = useAppDispatch();
    const {categoryPath} = useParams();
    const userProducts = useAppSelector(selectUserProducts)
    const categories = useAppSelector(selectAllCategories)
    const categoryFromPath = useAppSelector((state) => categories.find(category => category.path === categoryPath))
    const categoryId = categoryFromPath?.id
    const productsOfCategory = useAppSelector((state) => userProducts.filter(product => product.categoryId === categoryId))
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

    useEffect(()=> {
        dispatch(currentCategoryChange(categoryFromPath as Category))
    }, [dispatch, categoryFromPath])


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
                        {productsOfCategory.map((product:UserProduct) =>

                            <li key={product.id} className="flex flex-col relative px-6 py-6 border-b border-gray-extraLight w-full rounded-t-lg cursor-pointer">
                                <div className = "flex flex-col flex-nowrap w-full sm:flex-row">

                                    <div className="flex-auto flex-row relative w-full w-4/12 md:w-6/12 sm:flex-col  relative">
                                        <div
                                            className= "text-md capitalize align-baseline text-gray  font-bold text-lg md:text-xl">{product.name}
                                        </div>
                                        <div
                                            className= {"text-base md:text-lg" + (product.expireDate !== null && product?.expireDate > todayDate ) ? "text-gray-light" : "text-red font-bold"} >
                                            {product.expireDate ? product.expireDate.toISOString().substring(0,10) : ""}
                                        </div>
                                        <div
                                            className="text-gray-light text-md md:text-base">{product.capacity}{product.unit}
                                        </div>
                                    </div>

                                    <div className="flex flex-auto flex-nowrap  relative  sm:w-8/12 md:w-6/12 ">
                                        <div className="flex-row absolute right-0 self-center">

                                            <FontAwesomeIcon className="text-md text-blue-500 px-4 sm:text-lg" icon={faPlus} onClick={()=>increment(product)}/>
                                            <span className="text-md text-blue-800 px-2 sm:text-lg">{product.quantity}</span>
                                            <FontAwesomeIcon className="text-md text-blue-500 border-blue-400 border-solid border-r px-4 sm:text-lg" icon={faMinus} onClick={() => decrement(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 border-blue-400 border-solid border-r px-4 sm:text-xl" icon={faTrash} onClick={()=>deleteUserOneProduct(product)}/>
                                            <FontAwesomeIcon className="text-md text-blue-800 px-4 sm:text-lg" icon={faPen}  onClick={()=>chooseEditProduct(product) }/>

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
