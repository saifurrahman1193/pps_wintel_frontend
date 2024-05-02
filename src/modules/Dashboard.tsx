import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../redux/action'
import { permissionsResets, createAuditLog, userAgent, numberFormat } from '../components/Helpers/CommonHelpers'
import { toast } from 'react-toastify'
import { postCall } from '../api/apiService'

function Dashboard(props) {
    const breadcrumb = {
        pageTitle: 'Dashboard',
        currentPath: '/',
        layers: [
            {
                title: 'Home',
                link: '/',
            }
        ],

    }
   


    return (
        <React.Fragment>

            sadadasd

        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
