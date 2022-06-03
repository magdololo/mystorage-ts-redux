import React, {useEffect,useState} from "react";
import {useParams} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {skipToken} from "@reduxjs/toolkit/query";
import {selectUser} from "../users/usersSlice";
import {useSelector} from "react-redux";
import {selectAllCategories} from "./categoriesSlice";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {selectUserProducts} from "../products/userProductsSlice";
import {fetchUserProducts} from "../products/userProductsSlice";
import {quantityAdded} from "../products/userProductsSlice";
import {
    faTrash, // the clock icon
    faPlus, // the user circle icon
    faMinus, // a cup of coffee
    faPen
} from "@fortawesome/free-solid-svg-icons";



const CategoryPage = () => {
    const dispatch = useAppDispatch();
    let user = useAppSelector(selectUser);
    const {categoryPath} = useParams();
    const userProducts = useAppSelector(selectUserProducts)
    const categories = useAppSelector(selectAllCategories)
    const categoryFromPath = useAppSelector((state) => categories.find(category => category.path === categoryPath))
    const categoryId = categoryFromPath?.id
    const productsOfCategory = useAppSelector((state) => userProducts.filter(product => product.categoryId === categoryId))
    console.log(productsOfCategory)
    let [todayDate] = useState(new Date());
    const [counter, setCounter] = useState(0)
    const increment = () => {
        setCounter(prevCounter => prevCounter + 1)
    }
    const decrement = () => {
        setCounter(prevCounter => prevCounter - 1)
    }
    useEffect(() => {
        dispatch(fetchUserProducts(user?.uid ?? ""))
    }, [dispatch, user])



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

                                            <FontAwesomeIcon className="text-xl text-blue-500 px-4" icon={faPlus} onClick={increment}/>
                                            <span className="text-xl text-blue-800 px-2">{counter}</span>
                                            <FontAwesomeIcon className="text-xl text-blue-500 border-blue-400 border-solid border-r px-4" icon={faMinus} onClick={decrement}/>
                                            <FontAwesomeIcon className="text-xl text-blue-800 border-blue-400 border-solid border-r px-4" icon={faTrash} />
                                            <FontAwesomeIcon className="text-xl text-blue-800 px-4" icon={faPen} />
                                        </div>

                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>



            </div>
        </>
    )
}
export default CategoryPage;
