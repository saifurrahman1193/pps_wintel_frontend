import React, { Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
import Breadcrumb from '../components/Breadcrumb';

function Router(props) {


    return (
        <Fragment>
            <BrowserRouter>
                {
                    props?.user ?
                        < div id="layout-wrapper">
                            <Header />
                            <Sidebar />
                            <div className="main-content">

                                <div className="page-content">
                                    <div className="container-fluid">
                                        <Breadcrumb />
                                        <AuthRoute exact path='/dashboard' element={<Dashboard />} />
                                        <AuthRoute exact path='/profile' element={<Profile />} />
                                        <AuthRoute exact path='/users' element={<Users />} />
                                        <AuthRoute exact path='/roles' element={<Roles />} />
                                        <AuthRoute exact path='/permissions' element={<Permissions />} />
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                        : <PublicRoute path='/' element={<Login />} />
                }
            </BrowserRouter>
        </Fragment >
    )
}
const mapStateToProps = (state) => ({
    user: state.user,
    role: state.role,
    permissions: state.permissions
})

export default connect(mapStateToProps)(Router);