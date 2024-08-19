import React from 'react'

function LoaderComponent(props:any) {
    return (
        <>
            <div className='row'>
                <span className="spinner-border text-info mx-auto " style={{ width: props?.width || "70px", height: props?.height || "70px" }} alt="Loading..." ></span>
            </div>
        </>
    )
}
export default LoaderComponent
