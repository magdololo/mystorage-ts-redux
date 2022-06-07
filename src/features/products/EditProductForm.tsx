import React, {useState} from 'react'
import {useSelector} from "react-redux";
;
import {Modal} from "../../component/Modal/Modal";
import {selectUser} from "../users/usersSlice";
import slugify from "slugify";
import {addNewCategory} from "../categories/categoriesSlice"
import {useAppDispatch} from "../../app/store";
import 'react-toastify/dist/ReactToastify.css';
const EditProductForm = (closeAddCategoryModal: () => void) => {
    // const images = useSelector(selectAllImages)
    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [pickedImage, setPickedImage] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalHeader = "Wybierz zdjęcie"
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    //const [addNewCategory,{data, isError, isLoading, isSuccess}] = useAddNewCategoryMutation();



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
                                onClick={()=>console.log("edit Product")}>Dodaj
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProductForm;