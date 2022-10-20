import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../store";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {auth, signOut} from "../../firebase";
import {logout, selectUser} from "../../features/users/usersSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBell, faHandPointRight, faUser} from "@fortawesome/free-solid-svg-icons";
import Divider from "@mui/material/Divider";
import {Accordion} from "react-accordion-ts";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";

import AddCoUserForm from "./AddCoUserForm";

interface SidebarProps{
    toggleDrawer: null | (()=> void);
}
const Sidebar =({toggleDrawer}:SidebarProps)=>{
    const dispatch = useAppDispatch();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    let user = useSelector(selectUser);
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    const {isShown, handleClose, handleShown} = useModal()
    const modalHeader = ""
    const handleClick = (e: any) => {
        e.stopPropagation();
        if(toggleDrawer !== null){
            toggleDrawer()
        }
    };
    const handleToggle = () => {
        setIsEnglish(!isEnglish);
    };
    useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("pl");
        }
    },[isEnglish])// eslint-disable-line react-hooks/exhaustive-deps
    const refreshPage = ()=>{
        window.location.reload(); }
    const logoutOfApp = () => {
        signOut(auth);
        dispatch(logout())
        navigate('/')
        refreshPage()

    };
    const myAccordion = [
        {title: <span><FontAwesomeIcon className="text-xl text-purple px-4" icon={faUser} />{t("BottomHamburgerMenu.myAccount")}</span>,
            content: <span className="text-sm font-bold">{user?.email}</span>}
    ]
    return(
        <>
            <div className="flex justify-center">
                <ul className="bg-white rounded-lg w-96 text-gray text-lg pt-10 relative">
                    <li key='5' className="absolute w-1/5 top-2 right-0 cursor-pointer " onClick={handleToggle}><span className={isEnglish ? " fi fi-pl" : "fi fi-gb"}/></li>
                    <Divider />
                    <li key='1' className="px-6 py-2  w-full rounded-t-lg" onClick={handleClick}><Link to={'/categories'}> <FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.categoryList")}</Link></li>
                    <li key='2' className="px-6 py-2  w-full" onClick={handleClick}><Link to={'/products'}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.productList")}</Link></li>
                    <Divider />
                    <li key='3' className="px-6 py-2  w-full cursor-pointer -toggle-down" >
                        <Accordion items={myAccordion} duration={300} multiple={false}/>
                    </li>
                    <li key='4' className="px-6 py-2  w-full cursor-pointer" onClick={logoutOfApp}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faArrowRightFromBracket} />{t("BottomHamburgerMenu.signOut")}</li>
                    <li key='6' className="px-6 py-2  w-full cursor-pointer" onClick={handleClick}><FontAwesomeIcon className="text-xl text-purple px-4 " icon={faBell} /><Link to={'/shares/'}>{t("BottomHamburgerMenu.coUsers")}</Link></li>
                    {/*<li key='7' className="px-6 py-2  w-full cursor-pointer"><FontAwesomeIcon className="text-xl text-purple px-4 " icon={faBell} onClick={handleShown}/>{t("BottomHamburgerMenu.addCoUser")}</li>*/}
                </ul>
                <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={AddCoUserForm({handleClose, isShown})}/>
            </div>
        </>
    )
}
export default Sidebar