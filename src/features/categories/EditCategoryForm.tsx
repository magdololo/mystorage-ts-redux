import React, { useState, useEffect} from "react";//FocusEvent,
import {useSelector} from "react-redux";
import {useAppSelector, useAppDispatch} from "../../app/store";
import {Modal} from "../../component/Modal/Modal";
import {useModal} from "../../component/Modal/UseModal";
import slugify from "slugify";
import {editCategory, Category} from "../../slices/categoriesSlice";
import {selectUser} from "../../slices/usersSlice";
import {selectAllImages} from "../../slices/imagesSlice";
import {useTranslation} from "react-i18next";

type EditCategoryFormProps = {
    closeAddCategoryModal: ()=> void
}
export const EditCategoryForm = ({closeAddCategoryModal}: EditCategoryFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
       const categoryBeingEdited = useAppSelector((state=>state.categories.currentCategory)) as Category
    const [newCategoryTitle, setNewCategoryTitle] = useState("")
    const [newPickedImage, setNewPickedImage] = useState("")


    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const {isShown, handleShown, handleClose} = useModal()
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryTitle(e.target.value);
    const modalHeader = "Wybierz zdjęcie"
    const images = useAppSelector(selectAllImages)
    // const notify = () => toast.success('🦄 Kategoria zmieniona!', {
    //     position: "top-center",
    //     autoClose: 2000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //
    // });

    const imagesOptions = images?.map(image=>(
        <div key={image.id} onClick={() => {
            setNewPickedImage(image.url)
            handleClose()}}>
            <img alt="gallery" src={image.url}/>
        </div>
    ))
//event: React.MouseEvent<HTMLElement>
    useEffect(()=>{
        setNewCategoryTitle(categoryBeingEdited?.title);
    }, [categoryBeingEdited]);
    useEffect(()=>{
            setNewPickedImage(categoryBeingEdited.url);
    }, [categoryBeingEdited]);

    const handleFocusEvent = () => {
    setNewCategoryTitle("")
    }
    // e: FocusEvent<HTMLInputElement>
    const closeModal = () => {
        setNewCategoryTitle("");
        setNewPickedImage("")
        closeAddCategoryModal();
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
            closeModal()

        }
        //setAddRequestStatus('idle')

    }
    return(
        <>
            <div className="block p-6 rounded-lg shadow-lg bg-white ">
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
                        {newCategoryTitle===""&& <p>{t("validationInputs")}</p>}
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
                               placeholder={newPickedImage === "" ? t("categories.EditCategoryForm.inputImageChoose") :  t("categories.EditCategoryForm.inputImageChange")}
                               onClick={handleShown}

                        />
                        {newPickedImage===""&& <p>{t("validationInputs")}</p>}
                    </div>

                    {newPickedImage !== "" ?
                        <div className="form-group mb-6">
                            <img src={newPickedImage} alt={"new picked"}/>
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
                                onClick={()=> {onSaveCategory()}}>{t("categories.EditCategoryForm.editButton")}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default EditCategoryForm;