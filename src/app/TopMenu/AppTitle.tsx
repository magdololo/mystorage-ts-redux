import {useTranslation} from "react-i18next";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {
    changeUnreadNotificationsToRead,
    selectUnReadNotifications
} from "../../features/notifications/notificationsSlice";
import {useModal} from "../../component/Modal/UseModal";
import {Modal} from "../../component/Modal/Modal";
import NotificationsList from "../../features/notifications/NotificationsList";
import { regular} from '@fortawesome/fontawesome-svg-core/import.macro';
import {
    Nav,

    BoxMain,
    NavCollapse,
    NavLogo,
    MainMenu,
    MenuFlag, MenuButtonLogin, MainMenuLinkLogin, MenuButtonRegister, MainMenuLinkRegister, MainMenuSpan,
} from "../../features/api/Home.components";
import {MenuNotifications} from "./AppTitle.components";
import {Link} from "react-router-dom";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {Accordion} from "react-accordion-ts";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/users/usersSlice";
const AppTitle = () => {
    const dispatch = useAppDispatch()
    const { t, i18n } = useTranslation();
    let user = useSelector(selectUser);
    const unReadNotifications = useAppSelector(selectUnReadNotifications)
    const {isShown, handleShown, handleClose} = useModal()
    const onCloseModalWithNotifications = ()=>{
        handleClose()
        dispatch(changeUnreadNotificationsToRead(null))
    }
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    useEffect(()=> {
        if (i18n.language === "pl" || window.localStorage.i18nextLng === "pl") {
            setIsEnglish(false)
        } else {
            setIsEnglish(true)
        }
    },[i18n.language])

    const handleToggle = () => {
        setIsEnglish(!isEnglish);
    };
    //const getLanguage = () => i18n.language || window.localStorage.i18nextLng

    useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en")
                .then(()=>{
                    console.log("english")
                })
        } else {
            i18n.changeLanguage("pl")
                .then(()=>{
                    console.log("polish")
                })
        }
    },[isEnglish, i18n])
    const myAccordion = [
        {title: <span><FontAwesomeIcon className="text-2xl text-purple" icon={faUser} /></span>,
            content: <span className="text-md font-bold">{user?.email}</span>}
    ]
    return(
        <>
            {/*<div className="mx-auto max-w-screen-lg relative text-left  bg-gray-50 text-gray pt-10 pb-4 px-6 sm:text-center">*/}
            {/*    <h1 className="text-2xl font-bold mt-0 mb-6 sm:text-3xl md:text-4xl">{t("app_title")}</h1>*/}

            {/*    <div className={"absolute top-8 right-4 md:right-12" } onClick={handleShown}><FontAwesomeIcon className={(unReadNotifications.length > 0 ? "text-2xl md:text-3xl text-red px-4 pt-4" : "text-2xl md:text-3xl text-gray-extraLight px-4 pt-4")} icon={regular('bell')} />*/}
            {/*        {unReadNotifications.length > 0 ?*/}
            {/*        <span className={"absolute top-0 right-0.5 bg-red px-2 rounded-full text-white"}>{unReadNotifications.length}</span> : null}</div>*/}
            {/*</div>*/}
            {/*<div className="mx-auto max-w-screen-lg relative   bg-gray-50 text-gray pt-10 pb-4 px-6 sm:text-center">*/}
                <Nav>
                    <NavCollapse>
                        <div className={"w-14"}><img src={"./images/logoNav.png"} alt={"home"} className={"h-auto"}/></div>

                        <NavLogo>{t('app_title')}</NavLogo>
                    </NavCollapse>

                    <MainMenu>

                        <MenuButtonLogin>
                            <Accordion items={myAccordion} duration={300} multiple={false}/>
                        </MenuButtonLogin>
                        <div className={"relative flex items-center"}>
                        <MenuNotifications onClick={handleShown}>
                            <FontAwesomeIcon className={(unReadNotifications.length > 0 ? "text-2xl text-red " : "text-2xl text-gray-extraLight")} icon={regular('bell')} />
                                {unReadNotifications.length > 0 ? <span className={"absolute top-0 left-3 bg-red rounded-full text-md text-white font-bold px-2 py-0.5"}>{unReadNotifications.length}</span> : null}
                        </MenuNotifications>
                        </div>
                        <MenuFlag>
                            <MainMenuSpan onClick={handleToggle}
                                          className={isEnglish ? " fi fi-pl span" : "fi fi-gb span"}/>
                        </MenuFlag>

                    </MainMenu>
                </Nav>
            {/*</div>*/}
            <Modal isShown={isShown} hide={onCloseModalWithNotifications} modalHeaderText={""}  modalContent={<NotificationsList/>}/>

        </>
    )

}
export default AppTitle;
//