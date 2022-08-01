import React,{useState} from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {db} from "../firebase";
import {addCategoryImage, ImageFromUser} from "../features/categories/categoriesSlice";
import {useAppDispatch} from "../app/store";
// Add a new document with a generated id.


const SearchOwnPictureCategory =()=>{
    const storage = getStorage();
    const dispatch = useAppDispatch()

    // const [newFile, setNewFile] = useState<File | null>(null)
    // const [fileName, setFileName] =useState("")
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        let files = e.target.value
        let paths = e.target.files!![0]
        let newImageFromUser: ImageFromUser ={
            newPictureName : files.replace(/^.*[\\\/]/, ''),
            newPicture : paths
        }
        let urlUserPicture;

       console.log(files)

        // setFileName(filename)
        if(!e.target.files) return;
        // setNewFile(e.target.files[0])
        console.log(e.target.files[0])
      dispatch(addCategoryImage(newImageFromUser))


    }



    return(
        <>
            <div className="flex justify-center">
                <div className="mb-3 w-96">
                    <label htmlFor="formFileMultiple" className="form-label inline-block mb-2 text-gray-700">Dodaj własne zdjęcie</label>
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
        </>
    )
}

export default SearchOwnPictureCategory;