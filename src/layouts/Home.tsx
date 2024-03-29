import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    faCopyright, faCheck,faSearch, faUserEdit, faUserGroup, faListUl
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
    Section, SectionBox, SectionBoxPhotos, SectionBoxText,SectionTitle, SectionTextTitle, SectionTextSubtitle,
    FooterAuthor, FooterRegulations, MarginOnMobile
} from "../styles/Home.components";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {useMediaQuery} from "usehooks-ts";


const Home = () => {
    const { t, i18n } = useTranslation();
    const [isEnglish, setIsEnglish]= useState<boolean>(false);
    const isSmallerThan650 = useMediaQuery('(max-width: 649px)')
    useEffect(()=> {
        if (i18n.language !== "pl" || window.localStorage.i18nextLng !== "pl") {
            setIsEnglish(true)
        }
    },[i18n.language])

    const handleToggle = () => {
        setIsEnglish(!isEnglish);
    };

  useEffect(()=>{
        if(isEnglish){
            i18n.changeLanguage("en")
                .then(() => {
                    console.log("Language changed to english")
                })
        } else {
            i18n.changeLanguage("pl")
                .then(() => {
                    console.log("Language changed to polish")
                })
        }
  }, [isEnglish]) // eslint-disable-next-line react-hooks/exhaustive-deps
    return (
        <>
            <header>
                <BoxMain>
                    <Nav>
                        <NavCollapse>
                            <NavLogo><img src={"./images/logoNav.webp"} alt={"logo"} className={"h-auto"}/></NavLogo>
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
                            <PhotoBox src="../images/categories_screen-ImResizer.webp"
                                      alt={"ekran z kategoriami"} width={"255px"} height={"525px"}/>
                            :
                            <PhotoBox src="../images/categories_en.png"
                                      alt={"screen with categories"} width={"255px"} height={"525px"}/>}
                    </HeaderSectionBoxPhotos>
                </MainSection>
            </header>


            <Section primary={true}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/addProduct_screen-ImResizer.webp"
                                      alt={" strona formularza do dodawania produktu"} width={"234px"}
                                      height={"484px"}/> :
                            <PhotoBox src="../images/addProduct_screen_en-ImResizer.webp"
                                      alt={"screen with add product form"} width={"234px"} height={"484px"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText>
                        <SectionTitle>
                            <FontAwesomeIcon className="noVisibilityOnMobile text-4xl text-purple px-4 leading-8" icon={faListUl}/>
                            <SectionTextTitle>{t("home_section1_heading")}</SectionTextTitle>
                        </SectionTitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section1_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section1_subheading_two")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section1_subheading_three")}
                        </SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={false}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxText className={"noVisibilityOnMobile"}>
                        <SectionTitle>
                            <FontAwesomeIcon className="text-4xl text-purple px-4 leading-8" icon={faUserEdit}/>
                            <SectionTextTitle>{t("home_section2_heading")}</SectionTextTitle>
                        </SectionTitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_two")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_three")}
                        </SectionTextSubtitle>
                    </SectionBoxText>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/edit_screen-ImResizer.webp"
                                      alt={"ekran z listą produktów i menu do szybkiej edycji"} width={"234px"}
                                      height={"484px"}/> :
                            <PhotoBox src="../images/edit_screen_en-ImResizer.webp"
                                      alt={"screen with product list and menu for quick editing"} width={"234px"}
                                      height={"484px"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText className={"visibilityOnMobile"}>
                        <MarginOnMobile>
                            <SectionTextTitle>{t("home_section2_heading")}</SectionTextTitle>
                        </MarginOnMobile>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_two")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section2_subheading_three")}
                        </SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={true}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/search_screen-ImResizer.webp"
                                      alt={"ekran z wyszukiwarką produktów"} width={"234px"} height={"484px"}/> :
                            <PhotoBox src="../images/search_screen_en-ImResizer.webp"
                                      alt={"screen with product finder "} width={"234px"} height={"484px"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText>
                        {isSmallerThan650 ?
                            <MarginOnMobile>
                                <SectionTextTitle>{t("home_section3_heading")}</SectionTextTitle>
                            </MarginOnMobile>
                            :
                            <SectionTitle>
                                <FontAwesomeIcon className="noVisibilityOnMobile text-4xl text-purple px-4 leading-8" icon={faSearch}/>
                                <SectionTextTitle>{t("home_section3_heading")}</SectionTextTitle>
                            </SectionTitle>
                        }
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section3_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section3_subheading_two")}
                        </SectionTextSubtitle>
                    </SectionBoxText>

                </SectionBox>
            </Section>

            <Section primary={false}>
                <SectionBox size={"5.5rem"}>
                    <SectionBoxText className={"noVisibilityOnMobile"}>
                        <SectionTitle>
                            <FontAwesomeIcon className="text-4xl text-purple px-4 leading-8" icon={faUserGroup}/>
                            <SectionTextTitle>{t("home_section4_heading")}</SectionTextTitle>
                        </SectionTitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_two")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_three")}
                        </SectionTextSubtitle>
                    </SectionBoxText>

                    <SectionBoxPhotos>
                        {i18n.language === "pl" ?
                            <PhotoBox src="../images/mobile_share_page-ImResizer.webp"
                                      alt={"ekran z zaproszeniami"} width={"234px"} height={"484px"}/> :
                            <PhotoBox src="../images/mobile_share_page_en.png"
                                      alt={"screen with invitings"} width={"234px"} height={"484px"}/>}
                    </SectionBoxPhotos>
                    <SectionBoxText className={"visibilityOnMobile"}>
                        <MarginOnMobile>
                        <SectionTextTitle>{t("home_section4_heading")}</SectionTextTitle>
                        </MarginOnMobile>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_one")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_two")}
                        </SectionTextSubtitle>
                        <SectionTextSubtitle>
                            <FontAwesomeIcon className="text-xl text-purple px-4" icon={faCheck}/>
                            {t("home_section4_subheading_three")}
                        </SectionTextSubtitle>
                    </SectionBoxText>
                </SectionBox>
            </Section>

            <Section primary={true}>
                <SectionBox size={"1rem"}>
                    <FooterAuthor>
                        <h5 className="footer-header">
                            <FontAwesomeIcon className="icons" icon={faCopyright} />
                            <span >by <a href='https://github.com/magdololo/mystorage-ts-redux' className="footerRegulationsLink text-purple">magdololo</a> 2022</span>
                        </h5>
                    </FooterAuthor>
                    <FooterRegulations>
                                <span className="footerRegulationsSpan">{t("home_footer_word1")}
                                    <Link to="/termsAndConditions" className="footerRegulationsLink ">{t("home_footer_link_conditions")}</Link>
                                    {t("home_footer_word2")}
                                    <Link to="/privacyPolicy" className="footerRegulationsLink ">{t("home_footer_link_privacy")}</Link>
                                </span>
                    </FooterRegulations>
                </SectionBox>
            </Section>
        </>
    )
};
export default Home;