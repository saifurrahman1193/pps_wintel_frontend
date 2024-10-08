import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

function PublicRoute(props:any) {
   
    const checkIfuser = () => {
        if (props?.user) {
            return true
        } else {
            return false
        }
    }

    return (
        <React.Fragment>
            {
                !checkIfuser() ?
                    <Route {...props} />
                    :
                    <Navigate to="/" replace={true} />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user
})

export default connect(mapStateToProps)(PublicRoute);