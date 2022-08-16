import React from "react";

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
                         className=" inline-block px-6 py-2 border-none text-gray-dark text-lg font-bold leading-10 capitalize rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                         >Zaloguj się
                 </button>
                 <button
                     type="button"
                     className="inline-block px-6 py-2.5 bg-purple-800 text-white text-lg font-bold leading-tight capitalize rounded shadow-md hover:bg-purple-900 hover:shadow-lg focus:bg-purple-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                     data-mdb-ripple="true"
                     data-mdb-ripple-color="light"
                 >
                     Zarejestruj się
                 </button>

             </div>
                 </nav>

                 <div className="max-w-5xl w-full mx-auto p-12 bg-gray-100 text-gray-extraDark">
                     <h2 className="font-semibold text-4xl mb-4">Heading</h2>
                     <h4 className="font-semibold text-xl mb-6">Subheading</h4>

                 </div>
             </header>
         </>
    )
};
export default Home;