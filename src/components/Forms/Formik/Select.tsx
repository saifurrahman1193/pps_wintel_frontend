import  {Fragment} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextErrorMessage from '../../Error/TextErrorMessage.js'
import Validation  from '../Validation.js';

function Select(props:any) {
    const {label, name, options, ...rest} = props


    const getField = () => {
        return (
            <Fragment>
                <Field as="select" id={name} name={name} {...rest} >
                    { 
                        options?.map((option:any) => {
                            return (
                                <option key={option?.key+'-'+option?.value} value={option?.value}>
                                    {option?.key}
                                </option>
                            )
                        })
                    }
                </Field>
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
                        { getField() }
                    </div>
                    :
                    <Fragment>
                        { getField() }
                    </Fragment>
            }
        </Fragment>
    )
}

export default Select
