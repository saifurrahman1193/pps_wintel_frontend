import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { LOGOUT } from '../api/apiPath'
import { toast } from 'react-toastify'
import { getCall, postCall } from '../api/apiService'
import { USER_LOGOUT } from '../redux/action'
import Svgmenuiconcomponent from './Icons/Svgmenuiconcomponent'
import { kt_aside_mobile_toggle } from './Helpers/DesignHelpers'


function Breadcrumb(props) {

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">{props?.breadcrumb?.pageTitle}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {/* <li className="breadcrumb-item"><a href="#!">Dashboard</a></li>
                                <li className="breadcrumb-item active">Dashboard</li> */}


                                {
                                    props?.breadcrumb?.layers?.map((layer, i) => {
                                        return (
                                            <Fragment key={'layer-' + i}>
                                                {
                                                    i > 0 ?
                                                        <li className="breadcrumb-item">
                                                            <Link to="#!"> </Link>
                                                        </li> : null
                                                }
                                                <li className="breadcrumb-item">

                                                    {
                                                        layer?.link ?
                                                            <Link to="/dashboard" className='breadcrumb-item' >
                                                                {layer?.title}
                                                            </Link>
                                                            : <span className={(layer?.default == 1 ? 'active' : '')}>{layer?.title}</span>
                                                    }
                                                </li>
                                            </Fragment>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions,
    breadcrumb: state.breadcrumb,
})

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(USER_LOGOUT())
})

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);