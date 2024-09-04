import  {Fragment} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextErrorMessage from '../../Error/TextErrorMessage.js'
import Validation  from '../Validation.js';
import DateView from "react-datepicker";



function ReactDatePicker(props:any) {
    const {label, name, ...rest} = props

    const getField = () => {
        return (
            <Fragment>
                <Field name={name}>
                    {
                        ({form, field}:any) => {
                            const {setFieldValue} = form
                            const {value} = field
                            return (
                                <DateView
                                    id={name}
                                    {...field}
                                    {...rest}
                                    selected={value}
                                    onChange={val => setFieldValue(name, val)}
                                />
                            )
                        }
                    }
                </Field>
                <br />
                <ErrorMessage name={name} component={TextErrorMessage}/>
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            {
                label ? 
                    <label htmlFor={name} className={props?.labelclass || ''}>
                        {label}

                        {
                            props?.labelrequired ?  
                            <Validation.RequiredStar/>
                            : ''
                        }
                    </label>
                    :
                    null
            }
            {
                props?.inputdivclassname ?
                    <div className={props?.inputdivclassname}>
                        {getField()}
                    </div>
                    :
                    <Fragment>
                        {getField()}
                    </Fragment>
            }
        </Fragment>
    )
}

export default ReactDatePicker
