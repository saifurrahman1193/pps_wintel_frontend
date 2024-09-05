import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Login from '../modules/accesscontrol/Login';
import Profile from '../modules/accesscontrol/Profile';
import Dashboard from '../modules/dashboard/Dashboard';
import Users from '../modules/accesscontrol/Users';
import Roles from '../modules/accesscontrol/Roles';
import Permissions from '../modules/accesscontrol/Permissions';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import AuthRoute from './AuthRoute';
import PublicRoute from './PublicRoute';
import Breadcrumb from '../components/Breadcrumb';
import HandsetUser from '../modules/configuration/HandsetUser';
import DetailsReport from '../modules/report/DetailsReport';
import SummaryReport from '../modules/report/SummaryReport';

function Router(props: any) {

    return (
        <Fragment>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
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

                                        <AuthRoute exact path='/handset-users' element={<HandsetUser />} />
                                        <AuthRoute exact path='/details-report' element={<DetailsReport />} />
                                        <AuthRoute exact path='/summary-report' element={<SummaryReport />} />
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
const mapStateToProps = (state: any) => ({
    user: state.user,
    role: state.role,
    permissions: state.permissions
})

export default connect(mapStateToProps)(Router);