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
    Section, SectionBox, SectionBoxPhotos, SectionBoxText, SectionTextTitle, SectionTextSubtitle,
    FooterAuthor, FooterRegulations
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