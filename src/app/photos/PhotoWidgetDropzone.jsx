import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {Header, Icon} from "semantic-ui-react";

const PhotoWidgetDropzone = ({setFiles}) => {
    const dropZoneStyles = {
        border: 'dashed 3px #eee',
        borderRadius: '5%',
        paddingTop: '30px',
        textAlign: 'center',
    }

    const dropZoneActive = {
        border: 'dashed 3px green',
    }

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()} style={isDragActive ? {...dropZoneStyles, ...dropZoneActive} : dropZoneStyles}>
            <input {...getInputProps()} />
            <Icon name="upload" size="huge" />
            <Header content="Drop image here" />
        </div>
    )
}

export default PhotoWidgetDropzone