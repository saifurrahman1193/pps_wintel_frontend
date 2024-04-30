import React from 'react'
import './Loader.css'

function Loader(Props) {
    const isShow =  Props?.isShow || false
    return (
        <>
            {
                isShow ?
                    'Processing... Please wait.'
                : null
            }
        </>
    )
}
export default Loader
