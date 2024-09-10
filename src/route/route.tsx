import  { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../modules/accesscontrol/Login';
import Profile from '../modules/accesscontrol/Profile';
import Dashboard from '../modules/dashboard/Dashboard';
import Users from '../modules/accesscontrol/Users';
import Roles from '../modules/accesscontrol/Roles';
import Permissions from '../modules/accesscontrol/Permissions';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import HandsetUser from '../modules/configuration/HandsetUser';
import DetailsReport from '../modules/report/DetailsReport';
import SummaryReport from '../modules/report/SummaryReport';
import NotFound from '../modules/others/NotFound';

function Router() {
    return (
        <Fragment>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={
                        <div id="layout-wrapper">
                            <Header />
                            <Sidebar />
                            <div className="main-content">
                                <div className="page-content">
                                    <div className="container-fluid">
                                        <Breadcrumb />
                                        <Routes>
                                            <Route path="/dashboard" element={<Dashboard />} />
                                            <Route path="/profile" element={<Profile />} />
                                            <Route path="/users" element={<Users />} />
                                            <Route path="/roles" element={<Roles />} />
                                            <Route path="/permissions" element={<Permissions />} />
                                            <Route path="/handset-users" element={<HandsetUser />} />
                                            <Route path="/details-report" element={<DetailsReport />} />
                                            <Route path="/summary-report" element={<SummaryReport />} />
                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                        </div>
                    } />
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}


const mapStateToProps = (state: any) => ({
    user: state.user,
    role: state.role,
    permissions: state.permissions
});

export default connect(mapStateToProps)(Router);