import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { USER_LOGOUT } from '../redux/action'


function Sidebar(props) {

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li>
                            <Link to="/dashboard">
                                <i data-feather="home" />
                                <span data-key="t-dashboard">Dashboard</span>
                            </Link>
                        </li>
                       
                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="shield" />
                                <span data-key="t-authentication">Access Control</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/user" data-key="t-user">User</Link></li>
                                <li><Link to="/role" data-key="t-role">Role</Link></li>
                                <li><Link to="/permission" data-key="t-permission">Permission</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="dollar-sign" />
                                <span data-key="t-authentication">Balance</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="/operator-balance" data-key="t-operator-balance">Operator Balance</Link></li>
                                <li><Link to="/masking-balance" data-key="t-masking-balance">Masking Balance</Link></li>
                                <li><Link to="/non-masking-balance" data-key="t-non-masking-balance">Non-Masking Balance</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="message-square" />
                                <span data-key="t-authentication">SMS Inventory</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="auth-logout.html" data-key="t-masking">Masking</Link></li>
                                <li><Link to="auth-logout.html" data-key="t-non-masking">Non Masking</Link></li>
                                <li><Link to="auth-logout.html" data-key="t-sms-stock">SMS Stock</Link></li>
                                <li><Link to="auth-logout.html" data-key="t-info-balance">Info balance</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="pie-chart" />
                                <span data-key="t-authentication">Report</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="auth-logout.html" data-key="t-today-merchant-wise-summary-report">Today Merchant wise summary report</Link></li>
                                <li><Link to="auth-logout.html" data-key="t-sms-log">SMS Log</Link></li>
                            </ul>
                        </li>

                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="rss" />
                                <span data-key="t-authentication">Request</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><Link to="auth-logout.html" data-key="t-content-request">Content Request</Link></li>
                                <li><Link to="auth-logout.html" data-key="t-masking-request">Masking Request</Link></li>
                            </ul>
                        </li>
                        
                    </ul>
                   
                </div>
                {/* Sidebar */}
            </div>
        </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);