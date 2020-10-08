import React, { useRef } from "react";
import Cropper from "react-cropper";
import 'cropperjs/dist/cropper.css'

const PhotoWidgetCropper = ({setImage, imagePreview}) => {
    const cropper = useRef(null);

    const CropImage = () => {
        if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
            return
        }

        cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob)
        }, 'image/jpeg')
    };

    return (
        <Cropper
            ref={cropper}
            src={imagePreview}
            style={{ height: 200, width: "100%" }}
            // Cropper.js options
            initialAspectRatio={1}
            preview=".img-preview"
            guides={false}
            viewMode={1}
            dragMode="move"
            scalable={true}
            cropBoxMovable={true}
            cropBoxResizable={true}
            crop={CropImage}
        />
    );
};

export default PhotoWidgetCropper