import React, { useState, useCallback } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
//import "./styles.css";
import {ImagePathFromUser} from "./SearchOwnPictureCategory";
const CropImages =({image}: ImagePathFromUser) => {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixels: Area) => {
            console.log(croppedArea, croppedAreaPixels);
        },
        []
    );


    return (
        <>

            <div className ="crop_content">
            <div className="crop-container">
                <div className="crop">
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
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
                <button  className="w-24 text-sm bg-purple hover:bg-purple-500 text-white uppercase font-bold py-2 px-4 border rounded-md shadow-xs hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg">Zatwierdź </button>
            </div>
            </div>
            {/*<div className="button-crop">*/}
            {/*    <button>Zatwierdź zdjęcie</button>*/}
            {/*</div>*/}

      </>
    );
};

export default CropImages;
