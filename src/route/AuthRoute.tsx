import React from 'react'
import { connect } from 'react-redux'
import {  Route } from 'react-router-dom'

function AuthRoute(props) {

    const checkPermission = () => {
        if (props.can && props.ability) {
            if (props.permissions.includes(props.can) && props.roles.includes(props.ability)) {
                return true
            } else {
                return false
            }
        } else if (props.can && !props.ability) {
            if (props.permissions.includes(props.can)) {
                return true
            } else {
                return false
            }
        } else if (props.ability && !props.can) {
            if (props.roles.includes(props.ability)) {
                return true
            } else {
                return false
            }
        } else {
            if (props.user) {
                return true
            } else {
                return false
            }
        }
    }

    return (
        <React.Fragment>
            {
                checkPermission() ?
                    <Route {...props} />
                    :
                    <Redirect to="/" />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
})

export default connect(mapStateToProps)(AuthRoute);