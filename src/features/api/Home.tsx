import React from "react";
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
    MainMenu,
    MenuButtonLogin,
    MenuButtonRegister,
    MainMenuLinkRegister, MainSection,
    HeaderSectionText, HeaderSectionTextTitle, HeaderSectionTextTSubtitle, HeaderSectionButtonRegister
} from "./Home.components";

const Home = () => {
    const { t, i18n } = useTranslation();

    return (
        <>
            <header>
                <BoxMain>
                    <Nav>
                        <NavCollapse>
                            <NavLogo>{t('app_title')}</NavLogo>
                        </NavCollapse>

                       <MainMenu>
                            <MenuButtonLogin>
                            <Link to="/login">{t("buttons.logIn")}</Link>
                            </MenuButtonLogin>
                            <MenuButtonRegister>
                                <MainMenuLinkRegister as={Link} to="/register">
                                    {t("buttons.register")}</MainMenuLinkRegister>
                            </MenuButtonRegister>
                       </MainMenu>
                    </Nav>
                </BoxMain>


                <MainSection>

                    <HeaderSectionText>
                        <HeaderSectionTextTitle>{t("home_header_heading")}</HeaderSectionTextTitle>
                        <HeaderSectionTextTSubtitle>{t("home_heading_subheading")}</HeaderSectionTextTSubtitle>
                        <HeaderSectionButtonRegister as="button">
                            <Link to="/register">{t("buttons.register")}</Link>
                        </HeaderSectionButtonRegister>
                    </HeaderSectionText>

                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <span
                            className=" bottom-0 w-full text-gray-light shadow-xs box-decoration-clone">
                        {i18n.language === "pl" ?
                            <img src="../images/categories_screen.png" className="max-h-128 lg:max-h-144"
                                 alt={"ekran z kategoriami"}/> :
                            <img src="../images/categories_screen_en.png" className="max-h-128 lg:max-h-144"
                                 alt={"screen with categories"}/>}
                        </span>
                    </div>

                </MainSection>
            </header>


            <section className='shadow-zz pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        {i18n.language === "pl" ? <img src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144" alt={" strona formularza do dodawania produktu"}/> : <img src="../images/addProduct_screen_en.png" className="max-h-128 lg:max-h-144" alt={"screen with add product form"}/>}
                    </div>
                    <div className=" px-12  md:text-left md:w-3/5 md:ml-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">{t("home_section1_heading")}</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">{t("home_section1_subheading")}</h4>
                    </div>

                </div>
            </section>

            <section className=''>
                <div
                    className=" pt-10 relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">

                    <div className=" px-12 hidden md:block md:text-left md:w-3/5 md:mr-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">{t("home_section2_heading")}</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">{t("home_section2_subheading")}</h4>
                    </div>
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        {i18n.language === "pl" ? <img src="../images/edit_screen.png" className="max-h-128 lg:max-h-144" alt={"ekran z listą produktów i menu do szybkiej edycji"}/> : <img src="../images/edit_screen_en.png" className="max-h-128 lg:max-h-144" alt={"screen with product list and menu for quick editing"}/>}
                    </div>
                    <div className=" px-12 md:hidden ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">{t("home_section2_heading")}</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">{t("home_section2_subheading")}</h4>
                    </div>
                </div>
            </section>
            <section className='shadow-zz pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <span
                            className="bottom-0 h-1 w-full text-gray-light shadow-zz box-decoration-clone">
                        {i18n.language === "pl" ? <img src="../images/search_screen.png" className="max-h-128 lg:max-h-144" alt={"ekran z wyszukiwarką produktów"}/> : <img src="../images/search_screen_en.png" className="max-h-128 lg:max-h-144" alt={"screen with product finder "}/>}
                        </span>
                        </div>
                    <div className=" px-12  md:text-left md:w-3/5 md:ml-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">{t("home_section3_heading")}</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">{t("home_section3_subheading")}</h4>
                    </div>

                </div>
            </section>
            <section className=' pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto px-3 font-noto-sans md:flex-row lg:flex-row">
                    <div className="py-2 pb-1 md:py-3 md:pb-10">
                        <h5 className="text-sm text-footerLight sm:text-font-home">
                            <FontAwesomeIcon className="text-footerLight pr-2" icon={faCopyright} />
                            <span>by Magdalena Jarzyna 2022</span>
                        </h5>
                    </div>
                    <div className="py-2 pb-6  md:py-3 md:pb-10 text-md text-footerLight sm:text-font-home">
                        <span className="md:ml-12">{t("home_footer_word1")}<Link to="/#" className="mx-2 text-purple">{t("home_footer_link")}</Link>{t("home_footer_word2")}</span>
                    </div>

                </div>
            </section>
        </>
    )
};
export default Home;