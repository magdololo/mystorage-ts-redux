import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/store";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {selectUser} from "../slices/usersSlice";
import {
    changeUnreadNotificationsToRead,
    selectUnReadNotifications
} from "../slices/notificationsSlice";
import {useModal} from "../component/Modal/UseModal";
import {Modal} from "../component/Modal/Modal";
import NotificationsList from "../outlets/NotificationsList";
import SearchInput from "../component/BottomMenu/SearchInput";
import { regular} from '@fortawesome/fontawesome-svg-core/import.macro';
import {
    Nav,
    NavCollapse,
    NavLogo,
    NavTitle,
    MainMenu,
} from "../styles/Home.components";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useMediaQuery } from 'usehooks-ts';

import {MenuNotifications} from "../styles/Notifications.components";




const AppHeader = () => {
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation();
    let user = useSelector(selectUser);
    const isLargerThan1280 = useMediaQuery('(min-width: 1280px)')

    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const {isShown, handleShown, handleClose} = useModal()
    const onCloseModalWithNotifications = ()=>{
        handleClose()
        dispatch(changeUnreadNotificationsToRead(user!!.uid))
    }
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    useEffect(()=> {
        if (i18n.language === "pl" || window.localStorage.i18nextLng === "pl") {
            setIsEnglish(false)
        } else {
            setIsEnglish(true)
        }
    },[i18n.language])


    useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en")
                .then(()=>{
                    console.log("Language changed to english")
                })
        } else {
            i18n.changeLanguage("pl")
                .then(()=>{
                    console.log("Language changed to polish")
                })
        }
    },[isEnglish, i18n])

    return(
        <>
                <Nav>

                    <NavCollapse>
                        <NavLogo><img src={"./images/logoNav.png"} alt={"home"} className={"h-auto"}/></NavLogo>
                        <NavTitle>{t('app_title')}</NavTitle>
                    </NavCollapse>
                    <MainMenu>
                        {isLargerThan1280 ? <SearchInput/> : null }
                        <div className={"relative flex items-center"}>
                        <MenuNotifications onClick={handleShown}>
                            <FontAwesomeIcon className={(unReadNotifications.length > 0 ? "text-2xl text-red " : "text-2xl text-gray-extraLight")} icon={regular('bell')} />
                                {unReadNotifications.length > 0 ? <span className={"absolute top-0 left-3 bg-red rounded-full text-md text-white font-bold px-2 py-0.5"}>{unReadNotifications.length}</span> : null}
                        </MenuNotifications>
                        </div>
                    </MainMenu>
                </Nav>

            <Modal isShown={isShown} hide={onCloseModalWithNotifications} modalHeaderText={""}  modalContent={NotificationsList({handleClose})}/>
        </>
    )

}
export default AppHeader;
//