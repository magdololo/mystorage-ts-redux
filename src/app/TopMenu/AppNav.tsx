import {
    BoxMain,
    MainMenu,
    MainMenuLinkLogin, MainMenuLinkRegister, MainMenuSpan,
    MenuButtonLogin, MenuButtonRegister, MenuFlag,
    Nav,
    NavCollapse,
    NavLogo
} from "../../features/api/Home.components";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const AppNav = ()=>{
    const { t, i18n } = useTranslation();
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
    return(
        <>
            <BoxMain>
                <Nav>
                    <NavCollapse>
                        <NavLogo>{t('app_title')}</NavLogo>
                    </NavCollapse>

                    <MainMenu>

                        <MenuButtonLogin>
                            <MainMenuLinkLogin as={Link} to="/login">{t("buttons.logIn")}</MainMenuLinkLogin>
                        </MenuButtonLogin>
                        <MenuButtonRegister>
                            <MainMenuLinkRegister as={Link} to="/register">
                                {t("buttons.register")}</MainMenuLinkRegister>
                        </MenuButtonRegister>
                        <MenuFlag>
                            <MainMenuSpan onClick={handleToggle}
                                          className={isEnglish ? " fi fi-pl span" : "fi fi-gb span"}/>
                        </MenuFlag>
                    </MainMenu>
                </Nav>
            </BoxMain>
        </>
    )
}
export default AppNav