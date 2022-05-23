
import React, {useMemo} from 'react'
import { useSelector } from 'react-redux'
import AppTitle from "../../app/TopMenu/AppTitle";
import TopMenu from "../../app/TopMenu/TopMenu";
import {Modal} from "../../component/Modal/Modal";
import AddCategoryForm from "./AddCategoryForm";

import {selectUser} from "../users/usersSlice";
import {useGetCategoriesForUIDQuery} from "../api/apiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export const CategoryList = () => {
    let user = useSelector(selectUser);
    console.log(user)


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   const modalHeader = "Dodaj nową kategorię"
    console.log(user)

    const {
       data: categories = []
    } = useGetCategoriesForUIDQuery(user? user.uid : skipToken,{skip: !user})
     console.log(categories)
    const sortedCategories = categories.slice()
    if (sortedCategories != null && sortedCategories.length >= 2) {
        sortedCategories.sort((a, b) => {
            let aTitle = a.title.toLowerCase();
            let bTitle = b.title.toLowerCase();

            if (aTitle < bTitle) return -1;//keep a b
            if (aTitle > bTitle) return 1;//switch places b a
            return 0
        })

    }

    const renderedCategories = sortedCategories?.map(category => (
        // <div className="mb-4" >
        // //     <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs h-auto z-10">
       // <div>
        <li className="h-auto flex flex-col relative" key={category.id}>
                <a  href={category.path}>
                <img src={category.url} className="w-full h-auto object-cover flex-1 flex-grow" alt="Louvre"/>
                    <span className="absolute align-middle bottom-0 left-0 right-0 min-h-[40%] inline-flex items-center justify-center px-2 bg-black opacity-70 capitalize text-center text-white font-bold">{category.title}</span>
                </a>
        </li>
    ))
       {/*             <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed    ">*/}

       {/*                     <div className="absolute  py-2 text-center text-white font-bold text-2xl px-6 md:px-12  bg-black opacity-70 ">*/}
       {/*                         <button type="button"*/}
       {/*                                 className=" px-6 py-2 text-white font-bold text-md leading-tight uppercase rounded focus:outline-none focus:ring-0 transition duration-150 ease-in-out "*/}
       {/*                                 data-mdb-ripple="true" data-mdb-ripple-color="light">*/}
       {/*                             {category.title}*/}
       {/*                         </button>*/}
       {/*                     </div>*/}

       {/*             </div>*/}
       {/*</div>*/}
        {/*//     </div>*/}
        {/*// </div>*/}

    // ))


    return (
        <>
            <AppTitle />
             <TopMenu />
            <Modal isShown={open} hide={handleClose} modalHeaderText={modalHeader} modalContent={AddCategoryForm(handleClose)}/>
                <div className="w-screen mx-auto max-w-screen-lg mb-32" >
                    <div className="flex flex-nowrap w-full min-h-min items-center">
                        <div className="flex flex-wrap min-w-fit w-10/12 mx-auto pb-36">
                            <div className="grid grid-cols-3 gap-2 overflow-y-auto">
                        {renderedCategories}

                            <div className="mb-4 border-solid border-purple border-2 border-opacity-25" onClick={handleOpen}>
                                <div className=" relative overflow-hidden bg-no-repeat bg-cover max-w-xs ">

                                    <img src="http://placehold.jp/ffffff/ffffff/1280x900.png" className="max-w-xs bg-cover"/>
                                    <div className="absolute top-0 right-0  w-full h-full overflow-hidden bg-fixed">
                                        <div className="relative mx-auto top-1/3 text-purple font-bold text-2xl h-5 w-5 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                                        </svg>
                                        </div>
                                        <div className="relative text-center top-1/3  text-gray font-bold text-2xl px-6 md:px-12 ">

                                        <button className="font-bold text-md leading-tight uppercase text-center">
                                            <span className="text-center block justify-center align-middle uppercase text-gray-500 z-100 ">Dodaj katregorię</span>
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}
export default CategoryList;

//