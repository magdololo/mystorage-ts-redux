import React, {useEffect, useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {AiOutlineMenu} from "react-icons/ai";
import {
    faHandPointRight, // the clock icon
    faUser,
    faArrowRightFromBracket,
    faBell
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Divider from "@mui/material/Divider";
import {Link, useNavigate} from "react-router-dom";
import {logout, selectUser} from "../../features/users/usersSlice";

import {auth, signOut} from "../../firebase";
import {Accordion} from "react-accordion-ts";
import 'react-accordion-ts/src/panel.css';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useAppDispatch} from "../store";
import {useModal} from "../../component/Modal/UseModal";
import Sidebar from "./Sidebar";

const BottomHamburgerMenu = () => {
    const dispatch = useAppDispatch();
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    let user = useSelector(selectUser);
    const [isOpen, setIsOpen] =useState(false);
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    const {isShown, handleClose} = useModal()
    const modalHeader = ""

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
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
    // const handleShowModal = (e:any)=>{
    //     e.stopPropagation();
    //     handleShown()
    //
    // }
    const myAccordion = [
        {title: <span><FontAwesomeIcon className="text-xl text-purple px-4" icon={faUser} />{t("BottomHamburgerMenu.myAccount")}</span>,
        content: <span className="text-sm font-bold">{user?.email}</span>}
    ]


    return (
        <>

            <AiOutlineMenu className='text-gray-light text-center mx-auto text-3xl' onClick={toggleDrawer} />
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                size={295}
            >
                <Sidebar/>
            </Drawer>

        </>
    );
};
export default BottomHamburgerMenu;
// onClick={handleShowModal}