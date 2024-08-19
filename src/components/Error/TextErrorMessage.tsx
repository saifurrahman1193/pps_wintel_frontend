import React, { Fragment } from 'react'

function TextErrorMessage(props:any) {
    return (
        <Fragment>
            <span style={{
                width: "100%",
                marginTop: ".25rem",
                fontSize: "80%",
                color: "#fd625e"
            }}>{props.message}</span>
        </Fragment>
    )
}

export default TextErrorMessage
