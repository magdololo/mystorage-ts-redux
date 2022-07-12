
import {useAppSelector, useAppDispatch} from "../../app/store";
import React, {FocusEvent, useState, useEffect} from "react";
import {addNewCategory,editCategory, Category} from "./categoriesSlice";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import {SubmitHandler} from "react-hook-form";
import {editUserProduct, UserProduct} from "../products/userProductsSlice";
import slugify from "slugify";
import {useSelector} from "react-redux";
import {selectUser} from "../users/usersSlice";
type EditCategoryFormProps = {
    closeAddCategoryModal: ()=> void
}
export const EditCategoryForm = ({closeAddCategoryModal}: EditCategoryFormProps) => {
    const dispatch = useAppDispatch();
       const categoryBeingEdited = useAppSelector((state=>state.categories.currentCategory)) as Category
    const [newCategoryTitle, setNewCategoryTitle] = useState("")
    const [newPickedImage, setNewPickedImage] = useState("")
    // const inputRef = useRef<HTMLInputElement | null>(null);
    console.log(categoryBeingEdited)
    console.log(newPickedImage)
    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const {isShown, handleShown, handleClose} = useModal()
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryTitle(e.target.value);
    const modalHeader = "Wybierz zdjęcie"
    const images = useAppSelector(((state) => state.categories.images))

    const imagesOptions = images?.map(image=>(
        <div key={image.id} onClick={(event: React.MouseEvent<HTMLElement>) => {
            setNewPickedImage(image.url)
            handleClose()
            console.log(newPickedImage)}}>
            <img alt="gallery" src={image.url}/>
        </div>
    ))

    useEffect(()=>{
        setNewCategoryTitle(categoryBeingEdited?.title);
    }, [categoryBeingEdited]);
    useEffect(()=>{
            setNewPickedImage(categoryBeingEdited.url);
    }, [categoryBeingEdited]);

    const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    setNewCategoryTitle("")
    }

    const canSave =  [newCategoryTitle, newPickedImage, uid].every(Boolean) //&& addRequestStatus === 'idle'
    const onSaveCategory = ()=>{
        if (canSave) {
            let afterEditingCategory: Category = {
                id: categoryBeingEdited.id,
                title: newCategoryTitle,
                url: newPickedImage,
                path: slugify(newCategoryTitle, "_"),
                user: uid,
                required: "false"
            }
            //setAddRequestStatus('pending')
            dispatch(editCategory(afterEditingCategory))
            handleClose()
        }
        //setAddRequestStatus('idle')

    }
    return(
        <>
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <form>
                    <div className="form-group mb-6 ">
                        <input type="text"
                               // ref={inputRef}
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
                               onFocus={handleFocusEvent}
                               value={newCategoryTitle}
                               onChange={onTitleChange}/>
                        {newCategoryTitle===""&& <p>Pole wymagane</p>}
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
                               placeholder={newPickedImage === "" ? "Wybierz zdjęcie" : "Zmień zdjęcie"}
                               onClick={handleShown}

                        />
                        {newPickedImage===""&& <p>Pole wymagane</p>}
                    </div>

                    {newPickedImage !== "" ?
                        <div className="form-group mb-6">
                            <img src={newPickedImage}/>
                        </div>
                        : null}
                    <Modal isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}
                           modalContent={
                               <div className="grid grid-cols-2 gap-1">
                                   {imagesOptions}
                               </div>

                           }/>

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
                                onClick={()=> {onSaveCategory()}}>Edytuj
                        </button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditCategoryForm;