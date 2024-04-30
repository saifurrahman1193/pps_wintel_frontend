import React, {  Fragment, useState, useEffect, forwardRef, useImperativeHandle  } from 'react'
import {arrToLowerCase} from '../../components/Helpers/CommonHelpers'

function FileUpload (props, ref) {

    useEffect(() => {
        clearFileUpload()
    }, [])

    const [fileName, setFileName] = useState('')
    const [fileSize, setFileSize] = useState('')
    const [fileSizeKB, setFileSizeKB] = useState('')
    const [fileType, setFileType] = useState('')
    const [src, setSrc] = useState('')


    useImperativeHandle(ref, () => ({
        clearCaller() {
            clearFileUpload()
        }
    }))

    const clearFileUpload = () => {
        setFileName('')
        setFileSize('')
        setFileType('')
        setSrc('')
        props.dataChanger('')
    }

    const onPickFile = (e) => {
        e.preventDefault();
        clearFileUpload()
        document.getElementById(props?.name).click()
    }

    const onFilePicked = (e) => {
        let files = e.target.files;

        let file_name = files[0].name;
        let file_size = getFileSize(files[0].size);
        let file_size_kb = getFileSizeKB(files[0].size);
        let file_type = getFileType(files[0]).toLowerCase();

        setFileName(file_name)
        setFileSize(file_size)
        setFileSizeKB(file_size_kb)
        setFileType(file_type)

        if (props?.max_file_size_in_kb &&  file_size_kb > props?.max_file_size_in_kb) 
        {
            alert('Maximum allowed file size = '+props?.max_file_size_in_kb+ ' kb')
            clearFileUpload()
            return false;
        }

        if (props?.allowed_extensions && !arrToLowerCase(props?.allowed_extensions).includes(file_type)) 
        {
            clearFileUpload()
            alert('Allowed file type = '+props?.allowed_extensions)
            return false;
        }
        

        let fileReader = new FileReader();
        fileReader.addEventListener('load', ()=>{
            // console.log(fileReader.result);
            props.dataChanger(fileReader.result)
            setSrc(fileReader.result)
        })
        fileReader.readAsDataURL(files[0])


    }

    const getFileSize = (file_size) =>
    {
        if ( (file_size/1024) >= 1024 )
        {
            file_size= parseInt((file_size/1024)/1024) + ' MB';
        }
        else{
            file_size=parseInt(file_size/1024) + ' KB';
        }
        return file_size;
    }

    const getFileSizeKB = (file_size) =>
    {
        file_size=parseInt(file_size/1024);
        return file_size;
    }


    const getFileType = (file) =>
    {
        return file?.type.split('/').pop();
    }

    const viewFile = (e, src) => {
        e.preventDefault();
        window.open(src)
    }


    return (
        <Fragment>
            <button className="btn btn-primary text-capitalize mr-2 mb-2"  onClick={(e) => onPickFile(e)}>{props?.button_title || 'Upload File'}</button>
            
            {(props?.required && fileName?.length<=3 && !src ) ? <label className="label label-danger">Required</label> : ''}

            <br />

            {fileName ? <label className="label label-primary">{fileName}</label> : ''}
            {fileSize ? <label className="label label-warning">{fileSize}</label> : ''}
            {fileType ? <label className="label label-danger text-lowercase">{'.'+fileType}</label> : ''}

            <br />

            {/* {(props?.view_file && src) ? <button className="btn btn-info btn-outline-info btn-sm px-2 pr-0 py-0 ml-2 mt-2" title="View File" onClick={(e) => viewFile(e, src)}><i className="icofont icofont-ui-file mr-2"></i> View File</button> : ''}

            <br /> */}

            {/* new upload file */}
            {(props?.type=='image' && src && (props?.prev_src)) ? <img src={src}  style={{ maxHeight: "150px",  maxWidth: "150px" }} alt="" className="mt-2" /> : ''}
            
            {/* previous image */}
            {(props?.type=='image' && (props?.prev_src)  && !src) ?  <img src={props?.prev_src}  style={{ maxHeight: "150px",  maxWidth: "150px" }} alt="" className="mt-2" /> : ''}
            
            {(props?.type=='image' && src && (props?.prev_src)) ? <button className="btn btn-danger  btn-outline-danger pl-1 pr-0 py-0 ml-2" onClick={clearFileUpload} title="Remove file"><i className="fa fa-close"></i></button> : ''}

            

            <input className='file d-none' type="file"   data-show-upload="true" data-show-caption="true" 
                id={props?.name} 
                name={props?.name}
                required={props?.required ? true : false} 
                onChange={(e) => onFilePicked(e)}
            /> 
        </Fragment>
    )
}

export default forwardRef(FileUpload)


// ================to do====================

/*

restrictions
1. size restriction (in kb)
2. extension/format type restriction


Dependencies
=================
ReactHtmlParser

*/

/*
    =================how to use this component=============

    
    import FileUpload from '../components/Forms/FileUpload.js'
    <FileUpload 
        name="thumbImage" 
        button_title="Thumbnail Image Upload"  
        max_file_size_in_kb="200" 
        dataChanger={(value) => dataChangerThumbnail(value)} 
        type="image"  
        prev_src={frontend_baseURL+formData?.thumbImage} required={formData?.id ? false : true} 
        allowed_extensions={[ 'jpg', 'jpeg', 'png', 'gif']} 
    /> 

    const dataChangerThumbnail = (value) => {
        setFormData({...formData, thumbImage: value})
    }

    const formInitial = {
        thumbImage: '',
    }
    const [formData, setFormData] = useState(formInitial)
*/

/*
    ==============props usage=======================

    type = image  (if image then show image)

    view_file (if want to open file in a new tab)

*/