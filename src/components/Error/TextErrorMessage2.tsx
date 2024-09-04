import  {Fragment} from 'react'

function TextErrorMessage2(props:any) {
    return (
        <Fragment>
            <span style={{ color: "white" }}>{props.children}</span>
        </Fragment>
    )
}

export default TextErrorMessage2
