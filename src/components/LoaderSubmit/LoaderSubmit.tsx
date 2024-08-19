function LoaderSubmit(props) {
    const loaderShow = props?.loaderShow || false
    return (
        <>
            {
                loaderShow ?
                    <button type="button" className="btn btn-sm btn-light waves-effect">
                        <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2"></i> Loading
                    </button>
                    : <button type="submit" className="btn btn-sm btn-primary" id="formSubmit"> Save</button>
            }
        </>
    )
}
export default LoaderSubmit
