import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

function PublicRoute(props) {
   
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
                    <Routes><Route {...props} /></Routes>
                    :
                    <Navigate to="/" replace={true} />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(PublicRoute);