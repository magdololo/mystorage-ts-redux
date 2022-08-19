import React from "react";
import {Link} from "react-router-dom";
import {
    faCopyright,
    faCopy
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Home = () => {

    return (
        <>
            <header className="">
                <nav
                    className="navbar max-w-7xl w-full mx-auto h-40 fixed bg-white relative flex items-center justify-between z-50 top-0 left-0 font-courgette text-purple-800 flex-col md:flex-row">
                    <div className="px-6 ">
                        {/*<button*/}
                        {/*    className="navbar-toggler border-0 py-3 px-2 md:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out"*/}
                        {/*    type="button"*/}
                        {/*    data-bs-toggle="collapse"*/}
                        {/*    data-bs-target="#navbarSupportedContentX"*/}
                        {/*    aria-controls="navbarSupportedContentX"*/}
                        {/*    aria-expanded="false"*/}
                        {/*    aria-label="Toggle navigation"*/}
                        {/*>*/}
                        {/*<svg*/}
                        {/*    aria-hidden="true"*/}
                        {/*    focusable="false"*/}
                        {/*    data-prefix="fas"*/}
                        {/*    className="w-5"*/}
                        {/*    role="img"*/}
                        {/*    xmlns="http://www.w3.org/2000/svg"*/}
                        {/*    viewBox="0 0 448 512"*/}
                        {/*>*/}
                        {/*    <path*/}
                        {/*        fill="currentColor"*/}
                        {/*        d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"*/}
                        {/*    ></path>*/}
                        {/*</svg>*/}
                        {/*</button>*/}
                        <div className="navbar-collapse collapse grow items-center w-full">
                            <ul className="navbar-nav mr-auto flex flex-col md:flex-row">
                                <li className="nav-item">
                                    <a
                                        className="nav-link block p-10 md:p-0 text-gray-400 text-2lg hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out "
                                        href="#!"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                    >Domowa Spiżarnia</a
                                    >
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="px-6 flex align-middle font-noto-sans">
                        <button type="button"
                                className=" inline-block px-6 py-2 mr-1 text-gray-light text-base font-bold leading-10 hover:border-b-2 hover:border-b-purple hover:border-opacity-50 focus:outline-none focus:ring-0 transition duration-150 ease-in-out md:text-md lg:text-lg "
                        ><Link to="/login">Zaloguj się</Link>
                        </button>
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5 bg-purple-800 text-white text-base md:text-md lg:text-lg font-bold leading-tight rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        ><Link to="/register">Zarejestruj się</Link>
                        </button>

                    </div>
                </nav>

                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-12  md:text-left md:w-3/5 md:mr-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-7xl lg:leading-tight">Twoje
                            produkty zawsze pod ręką</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">Zdobądź
                            łatwy dostęp do produktów w swoim domu aby lepiej planować zakupy, posiłki i czas.</h4>
                        <button
                            type="button"
                            className="block mx-auto  bg-purple-800 text-white font-bold px-4 py-3.5 text-lg rounded-md md:inline-block md:px-6 md:py-3.5 md:text-lg  leading-tight md:rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                        ><Link to="/register">Zarejestruj się</Link>
                        </button>
                    </div>

                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <span
                            className="absolute bottom-0 h-1 w-full text-gray-light shadow-xs box-decoration-clone"></span>
                        <img src="../images/categories_screen.png" className="max-h-128 lg:max-h-144"/>
                    </div>
                </div>
            </header>


            <section className='shadow-zz pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <img src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144"/>
                    </div>
                    <div className=" px-12  md:text-left md:w-3/5 md:ml-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">Twórz
                            wasne kategorie i dodawaj produkty</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">Nazwy
                            kategorii układają się alfabetycznie dzięki czemu łatwo je odnajdziesz. Możesz także dodawać
                            własne obrazki i zdjęcia.</h4>
                    </div>

                </div>
            </section>

            <section className=''>
                <div
                    className=" pt-10 relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">

                    <div className=" px-12  md:text-left md:w-3/5 md:mr-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">Latwe edytowanie</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">Szybko
                            dodawaj i usuwaj wybrany produkt. Mozesz zmienic kategorie oraz sprawdziC czy produkt
                            przekroczył date ważności.</h4>
                    </div>
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <img src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144"/>
                    </div>
                </div>
            </section>
            <section className='shadow-zz pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans md:flex-row lg:flex-row">
                    <div className=" px-6 py-10 md:py-0 md:2/5">
                        <span
                            className="absolute bottom-0 h-1 w-full text-gray-light shadow-zz box-decoration-clone"></span>
                        <img src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144"/>
                    </div>
                    <div className=" px-12  md:text-left md:w-3/5 md:ml-8 md:max-w-2xl ">
                        <h2 className="text-center font-bold  text-font-home text-3xl mb-4 leading-snug md:text-4xl md:leading-snug md:text-left lg:text-5xl lg:leading-tight">Szybkie
                            wyszukiwanie</h2>
                        <h4 className="text-center text-gray-light text-lg mb-6 leading-loose md:text-lg md:text-left lg:text-xl lg:leading-10">Dzięki
                            wyszukiwarce odnajdziesz wszystkie podobne produkty jak również konkretny produkt.</h4>
                    </div>

                </div>
            </section>
            <section className=' pt-10'>
                <div
                    className="relative flex flex-col items-center justify-center w-full  max-w-6xl mx-auto px-3 font-noto-sans md:flex-row lg:flex-row">
                    <div className="py-3 pb-10">
                        <h5 className="text-font-home text-footerLight">
                            <FontAwesomeIcon className="text-footerLight pr-2" icon={faCopyright} />
                            <span>by Magdalena Jarzyna 2022</span>
                            <span className="ml-12">Akceptuje <Link to="/#" className="mr-1 text-purple">regulamin</Link>serwisu</span>
                        </h5>
                    </div>

                </div>
            </section>
        </>
    )
};
export default Home;