// @ts-nocheck
import React, { useState, useCallback } from "react";
import {useAppDispatch} from "../app/store";
import {useTranslation} from "react-i18next";
import {Modal} from "./Modal/Modal";

import {addCategoryImage, ImageFromUser} from "../features/images/imagesSlice";

import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import getCroppedImg from './canvasUtils';

type CropImagesProps = {
    handleClose: () => void
    image: string
    newImageName: string
    uid: string
}

const CropImages =({image,handleClose, newImageName, uid}: CropImagesProps ) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch();
    const [crop, setCrop] = useState<Crop>({
        unit: 'px', x: 0, y: 0, width: 1280, height: 815 });
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

            }

        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, dispatch,handleClose,image, newImageName,uid])


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
            <div className="absolute bottom-6 right-14">
                <button  className="w-24 text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                         onClick={showCroppedImage}>{t("buttons.confirm")}</button>
                <button  className="w-24 text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 ml-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                         onClick={handleClose}>{t("buttons.close")} </button>
            </div>



            </div>
            <Modal className={"modal-info"} isShown={isOpen} hide={handleCloseModal} modalHeaderText={t("component.CropImages.informationAboutSizeOfPicture")}  modalContent={<button onClick={handleCloseModal}>{t("buttons.close")}</button>}/>
      </>

    );
};

export default CropImages;
