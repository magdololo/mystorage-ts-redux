import {MainPageLayout,NavBar, Main, SideBar, FooterBar} from "../mainLayoutStyles/MainLayout.components";
import AppTitle from "../../app/TopMenu/AppTitle";


import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useModal} from "../../component/Modal/UseModal";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {fetchNotifications, selectUnReadNotifications} from "../notifications/notificationsSlice";

import {selectUser} from "../users/usersSlice";
import {useSelector} from "react-redux";
import Sidebar from "../../app/BottomMenu/Sidebar";
import CategoryList from "./CategoryList";
import AddCategoryForm from "./AddCategoryForm";
import EditCategoryForm from "./EditCategoryForm";
import {Modal} from "../../component/Modal/Modal";

const CategoriesPage = ()=>{
    const {t} = useTranslation();
    let user = useSelector(selectUser);
    let didSee = user?.didSeeGreeting;
    const {isShown, handleShown, handleClose} = useModal()
    const modalAddHeader = t("categories.CategoryList.modalAddHeader")
    const modalEditHeader = t("categories.CategoryList.modalEditHeader")
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const [toggleSwitch, setToggleSwitch] = useState(false);


    useEffect(() => {
        if (didSee === false) {
            setIsOpen(true)
        }
    }, [user, didSee])


    // useEffect(() => {
    //     dispatch(fetchNotifications(user?.uid!!))
    //     dispatch(fetchCategories(user?.uid!!))
    //     dispatch(fetchImages(user?.uid!!))
    //     dispatch(fetchUserProducts(user?.uid!!))
    //     dispatch(fetchAllProducts())
    //     dispatch(fetchShares(user?.uid!!))
    // }, [user, dispatch])
    //
    //
    //
    // useEffect(() => {
    //     dispatch(currentCategoryChange(null))
    // }, [dispatch])


    return (
        <>
        <MainPageLayout>
                <NavBar><AppTitle/></NavBar>
                <Main><CategoryList/><Modal className={"addCategory-modal"} isShown={isShown} hide={handleClose}
                                            modalHeaderText={!toggleSwitch ? modalAddHeader : modalEditHeader}
                                            modalContent={!toggleSwitch ? <AddCategoryForm closeAddCategoryModal={handleClose}/> :
                                                <EditCategoryForm closeAddCategoryModal={handleClose}/>}/></Main>
                <SideBar><Sidebar/></SideBar>
                <FooterBar>footer</FooterBar>
            </MainPageLayout>
        </>
    )
}

export default CategoriesPage;