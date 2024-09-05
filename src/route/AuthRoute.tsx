import React from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'

function AuthRoute(props:any) {

    const checkAccessibility = () => {
        
        // console.log('=============props.can && props.ability=============', props.can && props.ability);
        // console.log('=============props.can && !props.ability=============', props.can && !props.ability);
        // console.log('=============props.ability && !props.can=============', props.ability && !props.can);
        // console.log('=============props.user=============', props.user);

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
            if (location.pathname === '/' && props.user) {
                window.location.href = import.meta.env.BASE_URL+'dashboard'
            }
            else if (props.user) {
                return true
            } else {
                return false
            }
        }

    }

    return (
        <React.Fragment>
            {
                checkAccessibility() ?
                    <Routes><Route {...props} /></Routes>
                    :
                    <Navigate to="/" />
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
})

export default connect(mapStateToProps)(AuthRoute);