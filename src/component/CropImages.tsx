// @ts-nocheck
import React, { useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
//import "./styles.css";
import getCroppedImg from './canvasUtils'
import {addCategoryImage, ImageFromUser} from "../features/categories/categoriesSlice";
import {useAppDispatch} from "../app/store";
import AddProductForm from "../features/products/AddProductForm";
import {Modal} from "./Modal/Modal"
import {useModal} from "./Modal/UseModal";
import {ModalWithCrop} from "./Modal/ModalWithCrop";
// import {useModal} from "./Modal/UseModal";
// import {Modal} from ".rect";

type CropImagesProps = {
    handleClose: () => void
    image: string
    newImageName: string
    uid: string
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: "1500"
    },
};

const CropImages =({image, handleClose, newImageName, uid}: CropImagesProps ) => {
    const dispatch = useAppDispatch();
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const onCropComplete = useCallback(
        (croppedArea: Area , croppedAreaPixels: Area) => {
            console.log(croppedArea, croppedAreaPixels);
            setCroppedAreaPixels(croppedAreaPixels)
        },
        []
    );
    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,

            )
            console.log('donee', { croppedImage })
            const file = await fetch(croppedImage).then(r => r.blob()).then(blobFile =>{
                return new File([blobFile], newImageName, { type: blobFile.type })
            })
            console.log(file)
            let newImageFromUser: ImageFromUser ={
                        newPictureName : newImageName,
                        newPicture : file,
                        uid: uid
            }
            if(file.size > 2048*1024){
                console.log("rozmiar za duzy")
                handleOpen()


            }else{
                dispatch(addCategoryImage(newImageFromUser));
                handleClose()
                setImage("");
            }


            // setCroppedImage(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels])

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    return (
        <>

            <div className ="crop_content">
            <div className="crop-container">
                <div className="crop">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 2}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="controls">
                <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(Number(zoom))}
                    classes={{ root: "slider" }}
                />
            </div>

                </div>
            <div className="absolute bottom-6 right-12">
                <button  className="w-24 text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 px-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                         onClick={showCroppedImage}>Zatwierdź </button>

            </div>
            </div>
            <Modal className={"modal-info"} isShown={isOpen} hide={handleCloseModal} modalHeaderText={"Rozmiar zdjęcia jest za duży!"}  modalContent={<button onClick={handleCloseModal}>Zamknij</button>}/>
      </>

    );
};

export default CropImages;
