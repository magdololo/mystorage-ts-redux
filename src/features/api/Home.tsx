import React from "react";
import {Link} from "react-router-dom";
import {
    faCopyright,
    faCopy
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
const Home = () => {
    const { t, i18n } = useTranslation();
    console.log(i18n.language)
    return (
        <>
            <header className="">
                <nav
                    className="navbar max-w-7xl w-full mx-auto h-28 fixed bg-white relative flex items-center  z-50 top-0 left-0 font-courgette text-purple-800 flex-row sm:h-40 sm:justify-between">
                    <div className="px-2 w-2/3 sm:px-6">
                        <div className="navbar-collapse collapse grow items-center w-full">
                            <ul className="navbar-nav mr-auto ">
                                <li className="nav-item ">
                                    <a
                                        className="nav-link block  text-gray-400  hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out text-1/5lg p-4 sm:text-2lg sm:p-20 "
                                        href="#!"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >{t('app_title')}</a
                                    >
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="px-2 flex w:1/3 font-noto-sans sm:px-6">
                        <button type="button"
                                className=" inline-block  py-6 text-gray text-md font-bold  capitalize hover:border-b-2 hover:border-purple-800 focus:outline-none focus:ring-0 transition duration-150 ease-in-out
                                             sm:px-4 sm:text-lg md:text-md "
                        ><Link to="/login">{t("button_logIn")}</Link>
                        </button>
                        <button
                            type="button"
                            className="inline-block px-5 py-2.5 bg-purple-800 text-white text-base  font-bold leading-tight rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out hidden sm:justify-center md:block md:text-md "
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        ><Link to="/register">{t("button_register")}</Link>
                        </button>

                    </div>
                </nav>


                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-6 font-noto-sans sm:pt-12 md:flex-row lg:flex-row">
                    <div className=" px-12  md:text-left md:w-3/5 md:mr-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-7xl lg:leading-tight">{t("home_header_heading")}</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">{t("home_heading_subheading")}</h4>
                        <button
                            type="button"
                            className="block mx-auto  bg-purple-800 text-white font-bold px-4 py-3.5 text-lg rounded-md md:inline-block md:px-6 md:py-3.5 md:text-lg  leading-tight md:rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        ><Link to="/register">{t("button_register")}</Link>
                        </button>
                    </div>

                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <span
                            className="absolute bottom-0 h-1 w-full text-gray-light shadow-xs box-decoration-clone"></span>
                        {i18n.language === "pl" ? <img src="../images/categories_screen.png" className="max-h-128 lg:max-h-144"/> :  <img src="../images/categories_screen_en.png" className="max-h-128 lg:max-h-144"/>}

                    </div>
                </div>
            </header>


            <section className='shadow-zz pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        {i18n.language === "pl" ? <img src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144"/> : <img src="../images/addProduct_screen_en.png" className="max-h-128 lg:max-h-144"/>}
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
                        {i18n.language === "pl" ? <img src="../images/edit_screen.png" className="max-h-128 lg:max-h-144"/> : <img src="../images/edit_screen_en.png" className="max-h-128 lg:max-h-144"/>}
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
                            className="absolute bottom-0 h-1 w-full text-gray-light shadow-zz box-decoration-clone"></span>
                        {i18n.language === "pl" ? <img src="../images/search_screen.png" className="max-h-128 lg:max-h-144"/> : <img src="../images/search_screen_en.png" className="max-h-128 lg:max-h-144"/>}
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