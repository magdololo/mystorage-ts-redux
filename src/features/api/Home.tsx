import React from "react";
import {Link} from "react-router-dom";

const Home = ()=>{

    return (
         <>
             <header className="">
                 <nav
                     className="navbar max-w-7xl w-full mx-auto h-40 fixed bg-white relative flex items-center justify-between z-50 top-0 left-0 font-courgette text-purple-800 text-lg lg:text-2lg ">
                 <div className="px-6">
                     <button
                         className="navbar-toggler border-0 py-3 px-2 md:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out"
                         type="button"
                         data-bs-toggle="collapse"
                         data-bs-target="#navbarSupportedContentX"
                         aria-controls="navbarSupportedContentX"
                         aria-expanded="false"
                         aria-label="Toggle navigation"
                     >
                         <svg
                             aria-hidden="true"
                             focusable="false"
                             data-prefix="fas"
                             className="w-5"
                             role="img"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 448 512"
                         >
                             <path
                                 fill="currentColor"
                                 d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                             ></path>
                         </svg>
                     </button>
                     <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentX">
                         <ul className="navbar-nav mr-auto flex flex-col md:flex-row">
                             <li className="nav-item">
                                 <a
                                     className="nav-link block p-2 text-gray-400 text-2lg hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out  "
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
                         className=" inline-block px-6 py-2 mr-1 text-gray-light text-lg font-bold leading-10 hover:border-b-2 hover:border-b-purple hover:border-opacity-50 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                         ><Link to="/login">Zaloguj się</Link>
                 </button>
                 <button
                     type="button"
                     className="inline-block px-6 py-2.5 bg-purple-800 text-white text-lg font-bold leading-tight rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                 ><Link to="/register">Zarejestruj się</Link>
                 </button>

             </div>
                 </nav>
            <div className="relative flex items-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans">
                 <div className="px-12 text-left w-3/5 mr-5 max-w-2xl lg:px-6">
                     <h2 className="font-bold  text-font-home text-5xl mb-4 leading-tight lg:text-7xl">Twoje produkty zawsze pod ręką</h2>
                     <h4 className=" text-gray-light text-lg mb-6 leading-loose lg:text-xl lg:leading-10">Zdobądź łatwy dostęp do produktów w swoim domu aby lepiej planować zakupy, posiłki i czas.</h4>
                     <button
                         type="button"
                         className="inline-block px-6 py-3.5 bg-purple-800 text-white text-lg font-bold leading-tight rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                         data-mdb-ripple="true"
                         data-mdb-ripple-color="light"
                     ><Link to="/register">Zarejestruj się</Link>
                     </button>
                 </div>
                <div className="px-6">
                    <img src="../images/categories_screen.png" className="max-h-128 lg:max-h-144"/>

                </div>
            </div>
             </header>
             <section className={"pt-24 max-w-full bg-homeSection mx-auto relative shadow-zz pb-2"}>
                 <div className={"flex max-w-7xl w-full  mx-auto relative items-center flex-wrap"}>
                     <div className="px-6 text-left w-2/5 max-w-2xl pl-20">
                         <div className="inline-block relative">
                             <span className="absolute bottom-0 h-1 w-full text-gray-light shadow-zz box-decoration-clone"></span>
                             <img  src="../images/addProduct_screen.png" className="max-h-128 lg:max-h-144"/>
                         </div>
                     </div>
                     <div className="px-6 text-left w-1/2  max-w-2xl ml-3">
                         <h2 className="font-bold  text-font-home text-5xl mb-4 leading-normal">Twórz własne kategorie i dodawaj produkty</h2>
                         <h4 className=" text-gray-light text-xl mb-6 leading-loose">Nazwy kategorii układają się alfabetycznie dzięki czemu łatwo je odnajdziesz. Możesz także dodawać własne obrazki i zdjęcia.</h4>
                     </div>
                 </div>

             </section>
             <section className={"pt-24 max-w-full bg-white mx-auto relative shadow-zz"}>
                 <div className={"flex max-w-7xl w-full  mx-auto relative items-center flex-wrap "}>
                     <div className="px-6 text-left w-1/2  max-w-2xl ml-3">
                         <h2 className="font-bold  text-font-home text-5xl mb-4 leading-normal">Latwe edytowanie</h2>
                         <h4 className=" text-gray-light text-xl mb-6 leading-loose">Szybko dodawaj i usuwaj wybrany produkt. Mozesz zmienic kategorie oraz sprawdziC czy produkt przekroczył date ważności.</h4>
                     </div>
                     <div className="px-6 text-left w-2/5 max-w-2xl pl-20   ">
                         <div className="inline-block relative">
                             <span className="absolute bottom-0 h-1 w-full text-gray-light shadow-zz box-decoration-clone"></span>
                            <img  src="../images/easyEdit_screen.png" className="max-h-128 lg:max-h-144"/>
                         </div>
                     </div>
                 </div>

             </section>
             <section className={"pt-24 max-w-full bg-homeSection mx-auto relative  shadow-zz"}>
                 <div className={"flex max-w-7xl w-full  mx-auto relative items-center flex-wrap"}>
                     <div className="px-6 text-left w-2/5 max-w-2xl pl-20">
                         <img  src="../images/search_screen.png" className={"max-h-144"}/>
                     </div>
                     <div className="px-6 text-left w-1/2  max-w-2xl ml-3">
                         <h2 className="font-bold  text-font-home text-5xl mb-4 leading-normal">Szybkie wyszukiwanie</h2>
                         <h4 className=" text-gray-light text-xl mb-6 leading-loose">Dzięki wyszukiwarce odnajdziesz wszystkie podobne produkty jak również konkretny produkt.</h4>
                     </div>
                 </div>

             </section>
             <section className={"pt-2 max-w-full bg-homeSection mx-auto relative  shadow-zz"}/>
         </>
    )
};
export default Home;