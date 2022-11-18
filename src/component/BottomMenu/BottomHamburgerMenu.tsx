import React, {useEffect, useRef, useState} from "react";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import {AiOutlineMenu} from "react-icons/ai";
import 'react-accordion-ts/src/panel.css';
import {useTranslation} from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import Sidebar from "../../layouts/Sidebar";
import {useMediaQuery} from "usehooks-ts";

const BottomHamburgerMenu = () => {
    const {i18n} = useTranslation()
    const [isOpen, setIsOpen] =useState(false);
    const [isEnglish]= useState<boolean>(false);
    const isSmallerThan500= useMediaQuery('(max-width: 499px)')
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

    const ref = useRef<HTMLUListElement>(null);
    console.log(isOpen)
    useEffect(() => {
        const checkIfClickedOutside =(e:any) => {
            console.log(ref.current)
            console.log(e.target)
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isOpen && !!ref.current && !ref.current?.contains(e.target)) {
                // setIsOpen(false)
                toggleDrawer()
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isOpen])
    return (
        <>
            <AiOutlineMenu className='text-gray-light text-center mx-auto text-3xl' onClick={toggleDrawer} />
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
                size= {isSmallerThan500 ? 295 : 450}
            >
                <Sidebar toggleDrawer={toggleDrawer}/>
            </Drawer>

        </>
    );
};
export default BottomHamburgerMenu;
