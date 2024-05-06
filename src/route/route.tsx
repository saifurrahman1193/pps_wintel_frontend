import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from '../modules/accesscontrol/Login';
import ChangePassword from '../modules/accesscontrol/ChangePassword';
import Profile from '../modules/accesscontrol/Profile';
import Dashboard from '../modules/Dashboard';
import Test from '../modules/accesscontrol/Test';
import Users from '../modules/accesscontrol/Users';
import Roles from '../modules/accesscontrol/Roles';
import Permissions from '../modules/accesscontrol/Permissions';
// import AuditLog from '../modules/log/AuditLog';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Notfound from '../modules/accesscontrol/Error/Notfound';
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';
import INIT from './utils/Init';


function Router(props) {

    useEffect(() => {
        INIT()

    }, [])



    return (
        <Fragment>
            <BrowserRouter>
            
                {/* Authenticated users */}

                {
                    props?.user ?

                    <>
                        {/* <div className="d-flex flex-column flex-root" hidden={!props?.user} style={{ height: props?.user ? '100%' : '0%' }}> */}
                            {/* <div className="page d-flex flex-row flex-column-fluid"> */}
                                {/* {
                                    props?.user ?
                                        <Sidebar />
                                        : null
                                } */}
                                {/* <div className=" d-flex flex-column flex-row-fluid" id="kt_wrapper"> */}
                                    {/* {
                                        props?.user ?
                                            <Header />
                                            : null
                                    } */}
                                    {/* <div className="content d-flex flex-column flex-column-fluid mt-2 ms-desktop-73px" id="kt_content">
                                        <div id="kt_content_container" className="container-fluid"> */}

                                                <AuthRoute exact path='/dashboard' element={<Dashboard/>} />
                                                {/* <AuthRoute exact path='/profile' element={<Profile/>} />
                                                <AuthRoute exact path='/users' element={<Users/>} />
                                                <AuthRoute exact path='/roles' element={<Roles/>} />
                                                <AuthRoute exact path='/permissions' element={<Permissions/>} /> */}

                                        {/* </div>
                                    </div> */}
                                    {/* {
                                        props?.user ?
                                            <Footer />
                                            : null
                                    } */}

                                {/* </div> */}

                            {/* </div> */}
                        </>
                        : <PublicRoute path='/' element={<Login/>} />
                }

            </BrowserRouter>
        </Fragment>
    )
}
const mapStateToProps = (state) => ({
    user: state.user,
    role: state.role,
    permissions: state.permissions
})

export default connect(mapStateToProps)(Router);