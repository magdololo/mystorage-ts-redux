import React,{useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../features/users/usersSlice";
import CropImages from "./CropImages";
import {useModal} from "./Modal/UseModal";
import {ModalWithCrop} from "./Modal/ModalWithCrop";
import {useTranslation} from "react-i18next";





const SearchOwnPictureCategory =()=>{
    const {t} = useTranslation()
    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const [image, setImage] = useState("")
    const [newImageName, setNewImageName] = useState( "")
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = t("component.SearchOwnPictureCategory.matchPhoto")

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {

        if(!e.target.files) return;
        let files = e.target.value//nazwa pliku
        const newPictureName = uid+"/"+ files.replace(/^.*[\\]/, '')
        setNewImageName(newPictureName)
        let reader = new FileReader();
            reader.readAsDataURL(e.target.files!![0])
            reader.onload = (e) => {
                let imagePath = reader.result;
                setImage(imagePath as string)
                handleShown()
            }

    }

    return(
        <>
            <div className="flex justify-center">
                <div className="mb-3 w-96">
                    <label htmlFor="formFileMultiple" className="form-label block mb-2 mt-2 text-gray-500 text-center text-xl">{t("component.SearchOwnPictureCategory.addYourOwnPicture")}</label>
                    <input className="  form-control
                                        block
                                        w-full
                                        px-3
                                        py-1.5
                                        text-base
                                        font-normal
                                        text-gray-700
                                        bg-white bg-clip-padding
                                        border border-solid border-gray-300
                                        rounded
                                        transition
                                        ease-in-out
                                        m-0
                                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                           type="file" id="formFileMultiple" onChange={onChange}/>

                </div>
            </div>
            <ModalWithCrop className={"crop-modal"} isShown={isShown} hide={handleClose} modalHeaderText={modalHeader}  modalContent={CropImages({image, newImageName, uid, handleClose} )}/>
        </>
    )
}

export default SearchOwnPictureCategory;