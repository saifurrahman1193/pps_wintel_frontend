import React, { useRef, Fragment } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinymceEditor(props:any) {
   const editorRef = useRef(null);

   const handleChange = (value) => {
        props.onchange(value);
   }

    return (
        <Fragment>
            <Editor
                apiKey='kxmtd1aziv9hhfy42amvcdt1f3h4u6jgvvwthx0hfw3t0opn'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={props.initialValue||''}
                onChange={(value) => handleChange(value)}
                init={{
                height: 500,
                menubar: 'file edit view insert format tools table help',
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'code | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                insertdatetime_formats: ['%d-%m-%Y %I:%M %p','%H:%M:%S', '%Y-%m-%d', '%I:%M:%S %p', '%D'],
                image_caption: true,
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: 'mceNonEditable',
                toolbar_mode: 'sliding',
                contextmenu: 'link image imagetools table',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </Fragment>
    )
}

export default TinymceEditor

