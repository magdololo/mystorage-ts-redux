import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {Category} from "./categoriesSlice";
import {Modal} from "../../component/Modal/Modal";
import {selectUser} from "../users/usersSlice";
import slugify from "slugify";
import {addNewCategory} from "../categories/categoriesSlice"
import {useAppDispatch, useAppSelector} from "../../app/store";
import 'react-toastify/dist/ReactToastify.css';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const modalHeader = "Wybierz zdjęcie"
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const images = useAppSelector(((state) => state.categories.images))

  console.log(images)

    const imagesOptions = images?.map(image=>(
        <div key={image.id} onClick={(event: React.MouseEvent<HTMLElement>) => {
            setPickedImage(image.url)
            handleClose()
             console.log(pickedImage)}}>
                <img alt="gallery" src={image.url}/>
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
                })
        }
        setAddRequestStatus('idle')

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
                               <div className="grid grid-cols-2 gap-1">
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
                    onClick={onSaveCategory}>Dodaj
                    </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategoryForm;