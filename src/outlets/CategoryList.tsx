import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useAppDispatch, useAppSelector} from "../app/store";
import {Link} from 'react-router-dom';
import EditCategoriesButton from "../features/categories/EditCategoriesButton";
import {Modal} from "../component/Modal/Modal";
import {useModal} from "../component/Modal/UseModal";
import AddCategoryForm from "../features/categories/AddCategoryForm";
import EditCategoryForm from "../features/categories/EditCategoryForm";
import {fetchAllProducts} from "../slices/allProductsSlice";
import {changeSeeGreetingToTrue, selectUser, User} from "../slices/usersSlice";


import {
    currentCategoryChange,
    deleteCategory,
    deletingCategoryChange,
    selectAllCategoriesSortedByRequired,
    Category,
} from "../slices/categoriesSlice";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

import {EditCategoriesButtonComponent} from "../styles/Categories.components";
import {MainBox} from "../styles/Categories.components";
import {fetchImages} from "../slices/imagesSlice";
import {fetchNotifications} from "../slices/notificationsSlice";


export const CategoryList = () => {

    const {t} = useTranslation();
    let user = useSelector(selectUser);
    let didSee = user?.didSeeGreeting;

    const {isShown: isShownAddCategoryModal, handleShown: handleShownAddCategoryModal , handleClose: handleCloseAddCategoryModal} = useModal()
    const {isShown: isShownDeleteCategoryModal, handleShown: handleShownDeleteCategoryModal , handleClose: handleCloseDeleteCategoryModal} = useModal()
    const modalAddHeader = t("categories.CategoryList.modalAddHeader")
    const modalEditHeader = t("categories.CategoryList.modalEditHeader")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleCloseGreeting = () => setIsOpen(false);
    const dispatch = useAppDispatch()
    const categories = useAppSelector(selectAllCategoriesSortedByRequired)
    const categoryBeingDeleted = useAppSelector((state=>state.categories.deletingCategory)) as Category
    const [toggleSwitch, setToggleSwitch] = useState(false);
    const closeModalWithGreeting = () => {
        handleCloseGreeting();
        dispatch(changeSeeGreetingToTrue(user as User))
    }
    useEffect(() => {
        if (didSee === false) {
            setIsOpen(true)
        }
    }, [user, didSee])
    let greeting = <>
        <Modal isShown={isOpen} hide={closeModalWithGreeting} modalHeaderText={""}
               modalContent={<><h1>{t("categories.CategoryList.modalWithGreeting_h1")}</h1>
                   <h2> {t("categories.CategoryList.modalWithGreeting_h2")}</h2>
                   <div
                       className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
                       <button type="button" className="  px-6
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
                                                          ease-in-out"
                               data-bs-dismiss="modal" onClick={closeModalWithGreeting}>{t("buttons.close")}
                       </button>
                   </div>
               </>}/>
    </>;

    useEffect(() => {
        // dispatch(fetchNotifications(user?.uid!!))
       // dispatch(fetchCategories(user?.uid!!))
        //dispatch(fetchImages(currentStorageId!!))
        //dispatch(fetchUserProducts(currentStorageId!!))
        dispatch(fetchAllProducts())
        dispatch(fetchImages())
        dispatch(fetchNotifications(user?.uid!!))
        // dispatch(fetchShares(user?.uid!!))
    }, [user, dispatch])


    const toggleEdit = () => {
        setToggleSwitch(!toggleSwitch)
    }

    useEffect(() => {
        dispatch(currentCategoryChange(null))
    }, [dispatch])

    const chooseEditCategory = (category: Category) => {
        handleShownAddCategoryModal()
        dispatch(currentCategoryChange(category))
    }
    const chooseDeleteCategory = (category: Category) => {
        handleShownDeleteCategoryModal()
        dispatch(deletingCategoryChange(category))
    }
      let content;
    // if (categoriesStatus === "loading") {
    //     content = <Spinner text="Loading..."/>;
    // } else if (categoriesStatus === "succeeded") {
        const renderedCategories = categories?.filter(category=>(category?.required === "true" && !toggleSwitch) || category?.required === "false").map(category =>
                (
                   <div className={"h-auto flex flex-col relative" + (toggleSwitch ? " bg-black bg-opacity-90 " : "")} key={category?.id}>
                       <Link to={`/categories/${category?.path}`} className={toggleSwitch ? "pointer-events-none" : ""}>
                           <img src={category?.url} className={"w-full h-auto object-cover flex-1 flex-grow" + (toggleSwitch ? " brightness-[0.2]" : "")} alt="Louvre"/>
                                <span className={"absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70  text-sm sm:text-md md:text-lg capitalize text-center text-white font-bold" + (toggleSwitch ? "hidden invisible" : "")}>{category?.title}</span>
                       </Link>
                       <span className={"absolute bottom-3  left-0 right-0 mx-auto capitalize text-center text-white font-bold text-sm sm:text-md md:text-lg md:bottom-1/4" + (!toggleSwitch ? "invisible hidden" : "")}>{category?.title}</span>
                       {toggleSwitch &&
                           <FontAwesomeIcon className="absolute align-middle top-8 left-8 inline-flex items-center justify-center text-white text-md sm:text-lg font-bold cursor-pointer" icon={faPen} onClick={() => {chooseEditCategory(category as Category)}}/>
                       }
                       {toggleSwitch &&
                           <FontAwesomeIcon className="absolute align-middle top-8 right-8 inline-flex items-center justify-center text-red text-lg font-bold cursor-pointer" icon={faXmark} onClick={() =>  chooseDeleteCategory(category as Category)}/>
                       }
                   </div>
                )
        )
        content =
            <>
                <EditCategoriesButtonComponent>
                    <MainBox>
                        {renderedCategories}
                        {!toggleSwitch &&
                            <div className=" relative overflow-hidden bg-no-repeat bg-cover border-solid border-purple border-2 border-opacity-25" onClick={handleShownAddCategoryModal}>
                                <img src="https://placehold.jp/ffffff/ffffff/1280x900.png" alt={"placeholder"} className="bg-cover"/>
                                <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed ">
                                    <div className="relative mx-auto top-1/3 text-purple font-bold text-2xl h-5 w-5 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M12 4v16m8-8H4"/>
                                        </svg>
                                    </div>
                                    <div className="relative text-center top-1/3  text-gray font-bold pt-2 px-6 md:px-12 ">
                                        <button className="font-bold text-md leading-tight uppercase text-center">
                                            <span className="text-center block justify-center align-middle uppercase text-gray-500 z-100 text-sm sm:text-md">{t("buttons.addCategory")}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>}
                    </MainBox>
                </EditCategoriesButtonComponent>
            </>

    // } else if (categoriesStatus === "failed") {
    //     content = <div><span> {t("categories.CategoryList.categoriesStatusFailed")}</span></div>;
    //  }
    const deletingCategory = (category: Category)=>{
        dispatch(deleteCategory(category));
        handleCloseDeleteCategoryModal()
    }

    let contentModalDeleteCategory =
        <>
            <h3 className="text-center">Czy napewno chcesz usunąć tę kategorię?</h3>
            <p className={"text-center mb-2"}> Utracisz wszystkie produkty w niej zawarte!.</p>
            <button  className=" block mx-auto px-2 py-2 text-white font-bold bg-purple text-xsm leading-tight uppercase rounded shadow-md tracking-wider
                                 hover:shadow-l focus:shadow-lg focus:outline-none focus:ring-0" onClick={() =>deletingCategory(categoryBeingDeleted)}>{t("buttons.confirm")}</button>
        </>
    return (
        <>
            <EditCategoriesButton toggleEdit={toggleEdit} toggleValue={toggleSwitch}/>
                {content}
                <Modal className={"addCategory-modal"}
                       isShown={isShownAddCategoryModal}
                       hide={handleCloseAddCategoryModal}
                       modalHeaderText={!toggleSwitch ? modalAddHeader : modalEditHeader}
                       modalContent={!toggleSwitch ? <AddCategoryForm closeAddCategoryModal={handleCloseAddCategoryModal}/> : <EditCategoryForm closeAddCategoryModal={handleCloseAddCategoryModal}/>}
                />
                {didSee === false && greeting}
            <Modal isShown={isShownDeleteCategoryModal} hide={()=> handleCloseDeleteCategoryModal()} modalHeaderText={""}  modalContent={contentModalDeleteCategory}/>
        </>
    )
}
export default CategoryList;

//