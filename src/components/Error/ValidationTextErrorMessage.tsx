import React, { Fragment } from 'react';

function ValidationTextErrorMessage({ errors = [], field = '' }) {
    const errorMessages = processErrorMessages();

    function processErrorMessages() {
        let message = '';
        if (errors?.length && field) {
            message = errors.find(error => error?.field === field).message;
        }
        return message;
    }

    return (
        <Fragment>
            {errorMessages.length > 0 && (
                <span style={{
                    width: "100%",
                    marginTop: ".25rem",
                    fontSize: "80%",
                    color: "#fd625e"
                }}>{errorMessages}</span>
            )}
        </Fragment>
    );
}

export default ValidationTextErrorMessage;
