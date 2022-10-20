import React, {useEffect, useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {AiOutlineMenu} from "react-icons/ai";
import 'react-accordion-ts/src/panel.css';
import {useTranslation} from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import Sidebar from "./Sidebar";

const BottomHamburgerMenu = () => {
    const {i18n} = useTranslation()
    const [isOpen, setIsOpen] =useState(false);
    const [isEnglish, setIsEnglish]= useState<boolean>(false);

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("pl");
        }
    },[isEnglish])// eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>

            <AiOutlineMenu className='text-gray-light text-center mx-auto text-3xl' onClick={toggleDrawer} />
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                size={295}
            >
                <Sidebar toggleDrawer={toggleDrawer}/>
            </Drawer>

        </>
    );
};
export default BottomHamburgerMenu;
