// const required_star = `<span style={{color:"red"}}>*</span>`
// const required_star = () => ` hello world`

// export default {required_star}

import  {Fragment} from 'react'

const  RequiredStar = () => {
    return (
        <Fragment>
            <span style={{color:"red"}} title="This field is required.">*</span>
        </Fragment>
    )
}


export default  {RequiredStar}
