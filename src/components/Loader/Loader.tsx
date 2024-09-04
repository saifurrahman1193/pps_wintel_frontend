import './Loader.css'

function Loader(Props:any) {
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
