import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {useAppDispatch, useAppSelector} from "../../app/store";

import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import {selectUser} from "../users/usersSlice";
import {addNewCategory, Category} from "../categories/categoriesSlice"

import slugify from "slugify";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import SearchOwnPictureCategory from "../../component/SearchOwnPictureCategory";
import {selectAllImages} from "../images/imagesSlice";


type AddCategoryFormProps = {
    closeAddCategoryModal: ()=> void
}

const AddCategoryForm = ({closeAddCategoryModal}: AddCategoryFormProps) => {

    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('')
    const [pickedImage, setPickedImage] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Wybierz zdjęcie"
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const images = useAppSelector(selectAllImages)
    const notify = () => toast.success('🦄 Kategoria dodana!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    });

    const imagesOptions = images?.map(image=>(
        <div key={image.id} onClick={(event: React.MouseEvent<HTMLElement>) => {
            setPickedImage(image.url)
            handleClose()
             console.log(pickedImage)}}>
                <img className="object-contain h-full w-full" alt="gallery" src={image.url}/>
        </div>
    ))
    const canSave =  [title, pickedImage, uid].every(Boolean) && addRequestStatus === 'idle'
    const onSaveCategory = ()=>{
        if (canSave) {
            let newCategory: Category = {
                id: null,
                title: title,
                url: pickedImage,
                path: slugify(title, "_"),
                user: uid,
                required: "false"
            }
            setAddRequestStatus('pending')
            dispatch(addNewCategory(newCategory))
                .unwrap()
                .then((originalPromiseResult: Category) => {
                    setTitle("")
                    setPickedImage("")
                    closeAddCategoryModal()
                    notify()
                })
        }
        setAddRequestStatus('idle')

    }


    return(
        <>
            <div className="block p-6 rounded-lg bg-white max-w-sm mx-auto">
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
                        {title===""&& <p>Pole wymagane</p>}
                    </div>

                    <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}
                           modalContent={
                        <>
                               <div className="grid grid-cols-2 gap-1">
                                   {imagesOptions}
                               </div>
                            <SearchOwnPictureCategory/>
                        </>
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
                               onClick={handleShown}
                        />
                        {pickedImage===""&& <p>Pole wymagane</p>}
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
                    onClick={onSaveCategory}>Dodaj
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategoryForm;