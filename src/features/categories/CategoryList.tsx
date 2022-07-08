import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import AppTitle from "../../app/TopMenu/AppTitle";
import TopMenu from "../../app/TopMenu/TopMenu";
import {Modal} from "../../component/Modal/Modal";
import AddCategoryForm from "./AddCategoryForm";
import {selectUser} from "../users/usersSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    currentCategoryChange,
    fetchCategories, fetchImages,
    selectAllCategoriesSortedByRequired
} from "./categoriesSlice";
import {fetchAllProducts} from "../products/allProductsSlice";
import { Spinner } from '../../component/Spinner'
import {fetchUserProducts} from "../products/userProductsSlice";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";


export const CategoryList = () => {
    let user = useSelector(selectUser);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalHeader = "Dodaj nową kategorię"
    const dispatch = useAppDispatch()
    const categoriesStatus = useAppSelector(((state) => state.categories.status))
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)
    const images = useAppSelector((state)=> state.categories.images)
    useEffect(() => {
        dispatch(fetchCategories(user?.uid ?? ""))
        dispatch(fetchImages())
        dispatch(fetchUserProducts(user?.uid ?? ""))
        dispatch(fetchAllProducts())
    }, [user, dispatch])
    const[toggleSwitch, setToggleSwitch] = useState(false);

    const toggleEdit=()=>{
        setToggleSwitch(!toggleSwitch)
    }

    useEffect(()=> {
        dispatch(currentCategoryChange(null))
    }, [dispatch])









//


    let content;
    if (categoriesStatus === "loading") {
      content = <Spinner text="Loading..." />;
    } else if (categoriesStatus === "succeeded") {
      const renderedCategories = categories?.map(category => (

            <li className={"h-auto flex flex-col relative "+ (toggleSwitch?"bg-black bg-opacity-90 ":"") } key={category?.id}>

                    <Link to={`/categories/${category?.path}`}  className={toggleSwitch? "pointer-events-none" : ""} >
                    <img src={category?.url} className={"w-full h-auto object-cover flex-1 flex-grow "+ (toggleSwitch?"brightness-[0.2]":"")} alt="Louvre" />

                    <span
                        className={"absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70 text-xl capitalize text-center text-white font-bold"+ (toggleSwitch?"hidden invisible":"")}>{category?.title}</span>

                </Link>
                <span className={"absolute bottom-2/4 left-0 right-0 mx-auto capitalize text-xl text-center text-white font-bold"+ (!toggleSwitch? "invisible hidden":"")}>{category?.title}</span>
                {toggleSwitch &&
                    <FontAwesomeIcon
                        className="absolute align-middle top-10 left-10 inline-flex items-center justify-center text-white text-xl font-bold cursor-pointer"
                        icon={faPen} onClick={()=>console.log('edycja kategorii')}/>
                }
                {toggleSwitch &&
                    <FontAwesomeIcon
                    className="absolute align-middle top-10 right-10 inline-flex items-center justify-center text-red text-2xl font-bold cursor-pointer"
                    icon={faXmark} onClick={()=>console.log('delete kategorii')}/>
                }
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
                                     onClick={handleOpen}>
                                        <img src="http://placehold.jp/ffffff/ffffff/1280x900.png"
                                             className="bg-cover"/>
                                            <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed">
                                                <div className="relative mx-auto top-1/3 text-purple font-bold text-2xl h-5 w-5 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                                    </svg>
                                                </div>
                                            <div className="relative text-center top-1/3  text-gray font-bold text-2xl px-6 md:px-12 ">
                                                <button className="font-bold text-md leading-tight uppercase text-center">
                                                    <span className="text-center block justify-center align-middle uppercase text-gray-500 z-100 ">Dodaj katregorię</span>
                                                </button>
                                            </div>
                                            </div>

                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

    } else if (categoriesStatus === "failed") {
        content = <div><span> ups.. coś poszło nie tak</span></div>;
    }

    return (
        <>
            <AppTitle/>
            <TopMenu toggleEdit={toggleEdit} toggleValue={toggleSwitch}/>
            {content}
            <Modal isShown={open} hide={handleClose} modalHeaderText={modalHeader} modalContent={<AddCategoryForm closeAddCategoryModal={handleClose}/>}/>

            <BottomMenu />
            <ToastContainer />
        </>
    )
}
export default CategoryList;

//