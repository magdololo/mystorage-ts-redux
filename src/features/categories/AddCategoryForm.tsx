import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import {selectAllImages} from "./categoriesSlice";
import {Modal} from "../../component/Modal/Modal";
import {nanoid} from "@reduxjs/toolkit";
import {categoryAdded} from "./categoriesSlice";
//import slugify from "slugify";
const AddCategoryForm = () => {
    const images = useSelector(selectAllImages)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [pickedImage, setPickedImage] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalHeader = "Wybierz zdjęcie"
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    //const onPickedImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => setPickedImage(e.target.value)

    const imagesOptions = images?.map(image=>(
        <div className="w-1/2 mb-1" onClick={(event: React.MouseEvent<HTMLElement>) => {
            setPickedImage(image.path)
            handleClose()
             console.log(pickedImage)}}>
                <img alt="gallery" className="block object-cover object-center w-full h-full "
                     src={image.path}/>
        </div>

    ))

    const onSaveCategoryClicked = () => {
        console.log("onSavecategory")
        if (title && pickedImage) {
            dispatch(
                categoryAdded({
                    id: nanoid(),
                    title: title,
                    url: pickedImage,
                    path: title,
                })
            )
console.log("set")

            setTitle('')
            setPickedImage('')
            console.log("handleclode")
            handleClose()
        }

    }
    return(
        <>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <form>
                    <div className="form-group mb-6 ">
                        <input type="text"
                               className=" form-control
                                            block
                                            w-5/6
                                            text-center
                                            px-3
                                            py-3.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            mx-auto
                                            focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none"
                               id="exampleInput90"
                               placeholder="Nazwa kategorii"
                               value={title}
                               onChange={onTitleChange}/>
                    </div>

                    <Modal isShown={open} hide={handleClose} modalHeaderText={modalHeader}
                           modalContent={
                               <div className="flex flex-row flex-wrap -m-1 justify-between ">
                                   {imagesOptions}
                               </div>

                           }/>

                    <div className="form-group mb-6">

                        <input type="text"
                               className="form-control block
                                            w-5/6
                                            text-center
                                            px-3
                                            py-3.5
                                            text-base
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            mx-auto
                                            focus:text-gray-700 focus:bg-white focus:border-purple focus:outline-none"
                               id="exampleInput91"
                               placeholder={pickedImage === "" ? "Wybierz zdjęcie" : "Zmień zdjęcie"}
                               onClick={handleOpen}


                        />
                    </div>
                    {pickedImage !== "" ?
                        <div className="form-group mb-6">
                            <img src={pickedImage}/>
                        </div>
                    : null}
                    <div className="form-group mb-6">
                    <button type="button" className="
                          w-5/6
                          px-2
                          py-3.5
                          text-base
                          block
                          text-center
                          font-bold
                          text-purple
                          bg-white bg-clip-padding
                          border border-solid border-purple-400
                          rounded
                          uppercase
                          shadow-xs
                          hover:bg-blue-700 hover:shadow-md
                          focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0
                          active:bg-blue-800 active:shadow-md
                          transition
                          duration-150
                          mx-auto
                          ease-in-out"
                    onClick={onSaveCategoryClicked}>Dodaj
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategoryForm;