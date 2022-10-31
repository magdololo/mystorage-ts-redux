import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import {
    Nav,
    BoxMain,
    NavCollapse,
    NavLogo,
    NavTitle,
    MainMenu,
    MenuFlag,
    MainMenuSpan,
    MenuButtonLogin,
    MainMenuLinkLogin,
    MenuButtonRegister,
    MainMenuLinkRegister,
    MainSection,
    HeaderSectionBoxText,
    HeaderSectionTextTitle,
    HeaderSectionTextTSubtitle,
    HeaderSectionButtonRegister,
    HeaderSectionBoxPhotos,
    PhotoBox,
    Section, SectionBox, SectionBoxPhotos, SectionBoxText, SectionTextTitle, SectionTextSubtitle,
    FooterAuthor, FooterRegulations
} from "../styles/Home.components";
import "/node_modules/flag-icons/css/flag-icons.min.css";


const Home = () => {
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
    return (
        <>
            <header>
                <BoxMain>
                    <Nav>
                        <NavCollapse>
                            <NavLogo><img src={"./images/logoNav.png"} alt={"home"} className={"h-auto"}/></NavLogo>
                            <NavTitle>{t('app_title')}</NavTitle>
                        </NavCollapse>
                        <MainMenu>
                            <MenuButtonLogin>
                                <MainMenuLinkLogin as={Link} to="/login">{t("buttons.logIn")}</MainMenuLinkLogin>
                            </MenuButtonLogin>
                            <MenuButtonRegister>
                                <MainMenuLinkRegister as={Link} to="/register">{t("buttons.register")}</MainMenuLinkRegister>
                            </MenuButtonRegister>
                            <MenuFlag>
                                <MainMenuSpan onClick={handleToggle} className={isEnglish ? " fi fi-pl span" : "fi fi-gb span"}/>
                            </MenuFlag>
                        </MainMenu>
                    </Nav>
                </BoxMain>

                <MainSection>
                    <HeaderSectionBoxText>
                        <HeaderSectionTextTitle>{t("home_header_heading")}</HeaderSectionTextTitle>
                        <HeaderSectionTextTSubtitle>{t("home_heading_subheading")}</HeaderSectionTextTSubtitle>
                        <HeaderSectionButtonRegister as="button">
                            <Link to="/register">{t("buttons.register")}</Link>
                        </HeaderSectionButtonRegister>
                    </HeaderSectionBoxText>

                    <HeaderSectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/categories_screen.png"
                                      alt={"ekran z kategoriami"}/> :
                            <PhotoBox src="../images/categories_screen_en.png"
                                      alt={"screen with categories"}/>}
                    </HeaderSectionBoxPhotos>
                </MainSection>
            </header>


            <Section primary={true}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/addProduct_screen.png"
                                      alt={" strona formularza do dodawania produktu"}/> :
                            <PhotoBox src="../images/addProduct_screen_en.png"
                                      alt={"screen with add product form"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText>
                        <SectionTextTitle>{t("home_section1_heading")}</SectionTextTitle>
                        <SectionTextSubtitle>{t("home_section1_subheading")}</SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={false}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxText className={"noVisibilityOnMobile"}>
                        <SectionTextTitle>{t("home_section2_heading")}</SectionTextTitle>
                        <SectionTextSubtitle>{t("home_section2_subheading")}</SectionTextSubtitle>
                    </SectionBoxText>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/edit_screen.png"
                                 alt={"ekran z listą produktów i menu do szybkiej edycji"}/> :
                            <PhotoBox src="../images/edit_screen_en.png"
                                 alt={"screen with product list and menu for quick editing"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText className={"visibilityOnMobile"}>
                        <SectionTextTitle>{t("home_section2_heading")}</SectionTextTitle>
                        <SectionTextSubtitle>{t("home_section2_subheading")}</SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={true}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/search_screen.png"
                                 alt={"ekran z wyszukiwarką produktów"}/> :
                            <PhotoBox src="../images/search_screen_en.png"
                                 alt={"screen with product finder "}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText >
                        <SectionTextTitle>{t("home_section3_heading")}</SectionTextTitle>
                        <SectionTextSubtitle>{t("home_section3_subheading")}</SectionTextSubtitle>
                    </SectionBoxText>

                </SectionBox>
            </Section>


            <Section primary={false}>
                <SectionBox size={"1rem"}>
                    <FooterAuthor>
                        <h5 className="footer-header">
                            <FontAwesomeIcon className="icons" icon={faCopyright} />
                            <span>by Magdalena Jarzyna 2022</span>
                        </h5>
                    </FooterAuthor>
                    <FooterRegulations>
                        <span className="footerRegulationsSpan">{t("home_footer_word1")}
                            <Link to="/#" className="footerRegulationsLink ">{t("home_footer_link")}</Link>
                            {t("home_footer_word2")}</span>
                    </FooterRegulations>
                </SectionBox>
            </Section>
        </>
    )
};
export default Home;