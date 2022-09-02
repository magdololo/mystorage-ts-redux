import React, {useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {AiOutlineMenu} from "react-icons/ai";
import {
    faHandPointRight, // the clock icon
    faUser,
    faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Divider from "@mui/material/Divider";
import {Link, useNavigate} from "react-router-dom";
import {selectUser} from "../../features/users/usersSlice";

import {auth, signOut} from "../../firebase";
import {Accordion} from "react-accordion-ts";
import 'react-accordion-ts/src/panel.css';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const BottomHamburgerMenu = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    let user = useSelector(selectUser);
    const [isOpen, setIsOpen] =useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const handleClick = (e: any) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };
    const refreshPage = ()=>{
        window.location.reload();  }
    const logoutOfApp = () => {
        signOut(auth);
        navigate('/')
        refreshPage()

    };
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
            >
                <div className="flex justify-center">
                    <ul className="bg-white rounded-lg w-96 text-gray text-lg mt-10">
                        <li key='1' className="px-6 py-2  w-full rounded-t-lg" onClick={handleClick}><Link to={'/categories'}> <FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.categoryList")}</Link></li>
                        <li key='2' className="px-6 py-2  w-full" onClick={handleClick}><Link to={'/products'}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faHandPointRight} />{t("BottomHamburgerMenu.productList")}</Link></li>
                        <Divider />
                        <li key='3' className="px-6 py-2  w-full cursor-pointer -toggle-down" >
                            <Accordion items={myAccordion} duration={300} multiple={false}/>
                        </li>
                        <li key='4' className="px-6 py-2  w-full cursor-pointer" onClick={logoutOfApp}><FontAwesomeIcon className="text-xl text-purple px-4" icon={faArrowRightFromBracket} />{t("BottomHamburgerMenu.signOut")}</li>
                    </ul>

                </div>
            </Drawer>

        </>
    );
};
export default BottomHamburgerMenu;