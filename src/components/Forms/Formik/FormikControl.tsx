import React from 'react'
import Input from './Input';
import Textarea from '../Textarea';
import Select from './Select';
import RadioButtons from '../RadioButtons';
import CheckboxGroup from './CheckboxGroup';
import ReactDatePicker from './ReactDatePicker';

function FormikControl(props) {
    const {control, ...rest} = props

    switch (control) {
        case 'input': return <Input {...rest}/>
        case 'textarea': return <Textarea {...rest}/>
        case 'select': return <Select {...rest}/>
        case 'radio': return <RadioButtons {...rest}/>
        case 'checkbox': return <CheckboxGroup {...rest}/>
        case 'date': return <ReactDatePicker {...rest}/>
        case 'file':
        default: return null;
    } 
}

export default FormikControl
