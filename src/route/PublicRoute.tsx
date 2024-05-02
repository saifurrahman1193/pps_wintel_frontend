import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Route } from 'react-router-dom'

function PublicRoute(props) {
    const checkPermission = () => {
        if (props.user) {
            return true
        } else {
            return false
        }
    }

    return (
        <React.Fragment>
            {
                !checkPermission() ?
                    <Route {...props} />
                    :
                    <Navigate to="/" />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(PublicRoute);