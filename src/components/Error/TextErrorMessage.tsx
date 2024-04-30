import React, {Fragment} from 'react'

function TextErrorMessage(props) {
    return (
        <Fragment>
            <span style={{ color: "red" }}>{props.children}</span>
            {/* <label className="label label-danger">{props.children}</label> */}
        </Fragment>
    )
}

export default TextErrorMessage
