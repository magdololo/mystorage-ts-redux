import React from "react";
import {Link} from "react-router-dom";

const Home = ()=>{

    return (
         <>
             <header className="">
                 <nav
                     className="navbar max-w-7xl relative flex items-center w-full justify-between mx-auto h-40 fixed bg-white w-full z-50 top-0 left-0 font-courgette text-purple-800 text-2lg ">
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
                                     className="nav-link block p-2 text-gray-400 text-2lg hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
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
                 >
                     Zarejestruj się
                 </button>

             </div>
                 </nav>
            <div className="relative flex items-center w-full  max-w-6xl mx-auto pt-12 font-noto-sans">
                 <div className="px-6 text-left w-3/5 mr-5 max-w-2xl ">
                     <h2 className="font-bold  text-font-home text-7xl mb-4 leading-tight">Twoje produkty zawsze pod ręką</h2>
                     <h4 className=" text-gray-light text-xl mb-6 leading-loose">Zdobądź łatwy dostęp do produktów w swoim domu aby lepiej planować zakupy, posiłki i czas.</h4>
                     <button
                         type="button"
                         className="inline-block px-6 py-3.5 bg-purple-800 text-white text-lg font-bold leading-tight rounded-2xl shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                         data-mdb-ripple="true"
                         data-mdb-ripple-color="light"
                     >
                         Zarejestruj się
                     </button>
                 </div>
                <div className="px-6">
                    <img src="../images/categories_screen.png" className={"max-h-144"}/>

                </div>
            </div>
             </header>
             <section className={"pt-5 max-w-full bg-homeSection mx-auto relative"}>
                 <div className={"flex max-w-7xl w-full  mx-auto relative items-center flex-wrap"}>
                     <div className="px-6 text-left w-2/5 max-w-2xl pl-20">
                         <img  src="../images/addCategory_screen.png" className={"max-h-144"}/>
                     </div>
                     <div className="px-6 text-left w-1/2  max-w-2xl ml-3">
                         <h2 className="font-bold  text-font-home text-5xl mb-4 leading-normal">Twórz własne kategorie</h2>
                         <h4 className=" text-gray-light text-xl mb-6 leading-loose">Nazwy kategorii układają się alfabetycznie dzięki czemu łatwo je odnajdziesz. Możesz także dodawać własne obrazki i zdjęcia.</h4>
                     </div>
                 </div>

             </section>
         </>
    )
};
export default Home;