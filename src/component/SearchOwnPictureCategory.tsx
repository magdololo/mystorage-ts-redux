import React,{useState} from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebase";
import {addCategoryImage, ImageFromUser} from "../features/categories/categoriesSlice";
import {useAppDispatch} from "../app/store";
import {useSelector} from "react-redux";
import {selectUser} from "../features/users/usersSlice";
import CropImages from "./CropImages";
import {useModal} from "./Modal/UseModal";
import {ModalWithCrop} from "./Modal/ModalWithCrop";
import AddProductForm from "../features/products/AddProductForm";
import {readFile} from "fs/promises";

// Add a new document with a generated id.


// export type ImagePathFromUser={
//     image: string
// }


const SearchOwnPictureCategory =()=>{
    const storage = getStorage();
    const dispatch = useAppDispatch()
    const user = useSelector(selectUser)
    const uid = user? user.uid: ""
    const [image, setImage] = useState("")
    const [newImageName, setNewImageName] = useState( "")
    const {isShown, handleShown, handleClose} = useModal()
    const modalHeader = "Dostosuj zdjęcie"
    // const [newFile, setNewFile] = useState<File | null>(null)
    // const [fileName, setFileName] =useState("")
    // const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    //
    //     let files = e.target.value
    //     let paths = e.target.files!![0]
    //     console.log(files)
    //     console.log(paths)
    //
    //     let end = reader.onloadend
    //     let newImageFromUser: ImageFromUser ={
    //         newPictureName : uid+"/"+ files.replace(/^.*[\\\/]/, ''),//to tworzy nowy katalog w storage ktorego nazwa uid i w nim nazwy zdjec
    //         newPicture : paths,
    //         uid: uid
    //     }
    //     let urlUserPicture;
    //
    //    console.log(files)
    //
    //     //
    //
    //     // setNewFile(e.target.files[0])
    //     console.log(e.target.files[0])
    //   //dispatch(addCategoryImage(newImageFromUser))
    //
    //
    // }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=> {

        if(!e.target.files) return;
        let files = e.target.value//nazwa pliku
        const newPictureName = uid+"/"+ files.replace(/^.*[\\\/]/, '')
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
                    <label htmlFor="formFileMultiple" className="form-label block mb-2 mt-2 text-gray-500 text-center text-xl">Dodaj własne zdjęcie</label>
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