import  {Fragment} from 'react'
import { Field, ErrorMessage } from 'formik'
import TextErrorMessage from '../Error/TextErrorMessage.js'
import Validation  from './Validation.js';

function Textarea(props:any) {
    const {label, name, ...rest} = props
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
                        <Field id={name} name={name} {...rest} as="textarea"/>
                        <ErrorMessage name={name} component={TextErrorMessage}/>
                    </div>
                    :
                    <Fragment>
                        <Field id={name} name={name} {...rest} as="textarea"/>
                        <ErrorMessage name={name} component={TextErrorMessage}/>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Textarea
