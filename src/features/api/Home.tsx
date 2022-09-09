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
    Section,SectionBox, SectionBoxPhotos, SectionBoxText, SectionTextTitle, SectionTextSubtitle,

} from "./Home.components";
import {notify} from "../../helpers";

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
                            <MainMenuLinkLogin  as={Link} to="/login">{t("buttons.logIn")}</MainMenuLinkLogin >
                            </MenuButtonLogin>
                            <MenuButtonRegister>
                                <MainMenuLinkRegister as={Link} to="/register">
                                    {t("buttons.register")}</MainMenuLinkRegister>
                            </MenuButtonRegister>
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
                <SectionBox size={true}>
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
                <SectionBox size={true}>

                    <SectionBoxText >
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
                    <SectionBoxText>
                        <SectionTextTitle>{t("home_section2_heading")}</SectionTextTitle>
                        <SectionTextSubtitle>{t("home_section2_subheading")}</SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={true}>
                <SectionBox size={true}>
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
                <SectionBox size={false}>
                    <div className="py-2 pb-1 md:py-3 md:pb-10">
                        <h5 className="text-sm text-footerLight sm:text-font-home">
                            <FontAwesomeIcon className="text-footerLight pr-2" icon={faCopyright} />
                            <span>by Magdalena Jarzyna 2022</span>
                        </h5>
                    </div>
                    <div className="py-2 pb-6  md:py-3 md:pb-10 text-md text-footerLight sm:text-font-home">
                        <span className="md:ml-12">{t("home_footer_word1")}<Link to="/#" className="mx-2 text-purple">{t("home_footer_link")}</Link>{t("home_footer_word2")}</span>
                    </div>

                </SectionBox>
            </Section>
        </>
    )
};
export default Home;