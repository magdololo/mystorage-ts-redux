import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {Link} from 'react-router-dom';
import AppTitle from "../../app/TopMenu/AppTitle";
import TopMenu from "../../app/TopMenu/TopMenu";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import { Spinner } from '../../component/Spinner'
import {changeSeeGreetingToTrue, selectUser, User} from "../users/usersSlice";

import {skipToken} from "@reduxjs/toolkit/query";
import {
    currentCategoryChange,
    deleteCategory,
    fetchCategories,
    fetchImages,
    selectAllCategoriesSortedByRequired,
    Category
} from "./categoriesSlice";
import {fetchAllProducts} from "../products/allProductsSlice";
import { fetchUserProducts} from "../products/userProductsSlice";

import {ToastContainer} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";




export const CategoryList = () => {


    let user = useSelector(selectUser);
    let didSee = user?.didSeeGreeting;

    const {isShown, handleShown, handleClose} = useModal()
    const modalAddHeader = "Dodaj nową kategorię"
    const modalEditHeader = "Edytuj kategorię"
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    const handleCloseGreeting = () => setIsOpen(false);
    const dispatch = useAppDispatch()
    const categoriesStatus = useAppSelector(((state) => state.categories.status))
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)
    const closeModalWithGreeting = () =>{
        console.log("close modal")
        handleCloseGreeting();
        dispatch(changeSeeGreetingToTrue(user as User))
    }
    useEffect(()=>{
        if(didSee === false){
            setIsOpen(true)
        }
    },[user])
    let greeting =   <>
             <Modal isShown={isOpen} hide={closeModalWithGreeting} modalHeaderText={""} modalContent={<><h1>Dziękujemy za rejestrację!</h1><h2> Witamy w serwisie!</h2>
                 <div
                     className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
                     <button type="button" className="px-6
          py-2.5
          bg-purple
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out" data-bs-dismiss="modal" onClick={closeModalWithGreeting}>Close
                     </button>
                 </div></>} />
                  </>;

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

    const chooseEditCategory = (category: Category) => {
        handleShown()
        let editingCategory = dispatch(currentCategoryChange(category))
        console.log(editingCategory)
    }
    const deletingCategory = (category: Category) => {
        dispatch(deleteCategory(category))
    }

    let content;
    if (categoriesStatus === "loading") {
      content = <Spinner text="Loading..." />;
    } else if (categoriesStatus === "succeeded") {
      const renderedCategories = categories?.map(category => (

            <li className={"h-auto flex flex-col relative" + (toggleSwitch?" bg-black bg-opacity-90 ":"") } key={category?.id}>

                    <Link to={`/categories/${category?.path}`}  className={toggleSwitch? "pointer-events-none" : ""} >
                    <img src={category?.url} className={"w-full h-auto object-cover flex-1 flex-grow"+ (toggleSwitch?" brightness-[0.2]":"")} alt="Louvre" />

                    <span
                        className={"absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70 text-xl capitalize text-center text-white font-bold"+ (toggleSwitch?"hidden invisible":"")}>{category?.title}</span>

                </Link>
                <span className={"absolute bottom-2/4 left-0 right-0 mx-auto capitalize text-xl text-center text-white font-bold"+ (!toggleSwitch? "invisible hidden":"")}>{category?.title}</span>
                {toggleSwitch &&
                    <FontAwesomeIcon
                        className="absolute align-middle top-10 left-10 inline-flex items-center justify-center text-white text-xl font-bold cursor-pointer"
                        icon={faPen} onClick={()=>{chooseEditCategory(category as Category)}}/>
                }
                {toggleSwitch &&
                    <FontAwesomeIcon
                    className="absolute align-middle top-10 right-10 inline-flex items-center justify-center text-red text-2xl font-bold cursor-pointer"
                    icon={faXmark} onClick={()=>deletingCategory(category as Category)}/>
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
                                {!toggleSwitch &&
                                <div className=" relative overflow-hidden bg-no-repeat bg-cover border-solid border-purple border-2 border-opacity-25"
                                     onClick={handleShown}>
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

                                 </div>}
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
            <Modal isShown={isShown} hide={handleClose} modalHeaderText={ !toggleSwitch ? modalAddHeader : modalEditHeader } modalContent={ !toggleSwitch ? <AddCategoryForm closeAddCategoryModal={handleClose}/> : <EditCategoryForm closeAddCategoryModal={handleClose}/>}  />
            {didSee === false && greeting}
            <BottomMenu />
            <ToastContainer />
        </>
    )
}
export default CategoryList;

//