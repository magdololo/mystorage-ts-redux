import {MainPageLayout,NavBar, Main, SideBar, FooterBar} from "../mainLayoutStyles/MainLayout.components";
import AppTitle from "../../app/TopMenu/AppTitle";


import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
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
import FooterBox from "../../component/FooterBox";
import SearchInput2 from "../../app/BottomMenu/SearchInput2";
import BottomMenu from "../../app/BottomMenu/BottomMenu";
import {useMediaQuery} from "usehooks-ts";
import ReturnToCategoryList from "../../component/ReturnToCategoryList";
const Root = ()=>{
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
    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')
    const isLargerThan800 = useMediaQuery('(min-width: 800px)')
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

                <Main>
                {/*<CategoryList/>*/}
                {/*    <Modal className={"addCategory-modal"} isShown={isShown} hide={handleClose}*/}
                {/*           modalHeaderText={!toggleSwitch ? modalAddHeader : modalEditHeader}*/}
                {/*           modalContent={!toggleSwitch ? <AddCategoryForm closeAddCategoryModal={handleClose}/> : <EditCategoryForm closeAddCategoryModal={handleClose}/>}/>*/}

            <Outlet/>
                </Main>
            {/*{isLargerThan800 ?  : null}*/}
            {isLargerThan1280 ?
                <>
                <SideBar><Sidebar toggleDrawer={null}/></SideBar>
                <FooterBar><FooterBox/></FooterBar>
                </>
                : <BottomMenu/> }


            </MainPageLayout>
        </>
    )
}

export default Root;