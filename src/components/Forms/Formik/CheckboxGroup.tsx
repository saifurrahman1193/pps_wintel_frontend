import React, {Fragment} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextErrorMessage from '../../Error/TextErrorMessage.js'
import Validation  from '../Validation.js';

function CheckboxGroup(props:any) {
    const {label, name, options, ...rest} = props
    const getField = () => {
        return (
            <Fragment>
                <Field name={name}>
                    {
                        ({field}) => {
                            return options.map(option => {
                                return (
                                    <Fragment key={option?.key}>
                                        <div className="form-check form-check-inline">
                                            <input  type="checkbox" id={option?.value} {...field} {...rest} className="form-check-input" value={option?.value} checked={field?.value?.includes(option?.value)} />
                                            {
                                                option?.image ?
                                                    <Fragment>
                                                        <label htmlFor={option?.value} style={{ cursor: "pointer"}}>
                                                            <img style={{ maxHeight: "50px", maxWidth: "50px" }} src={option?.image || ''} alt={option?.key} />
                                                        </label>
                                                    </Fragment>
                                                    :
                                                    <label className="form-check-label" htmlFor={option?.value}  style={{ cursor: "pointer"}}>{option?.key}</label>
                                            }
                                        </div>
                                    </Fragment>
                                )
                            })
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

export default CheckboxGroup
