import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { USER_LOGOUT } from '../redux/action'
import INIT from '../route/utils/Init'


function Sidebar(props) {

    const vCurPathA = (pathname = '') => {
        const path = props.breadcrumb.currentPath
        if (path == pathname) {
            return 'active'
        }
        return ''
    }

    const vCurPathLi = (pathname = '') => {
        const path = props.breadcrumb.currentPath
        if (path == pathname) {
            return 'mm-active'
        }
        return ''
    }

    useEffect(() => {
        sidbar_handler()

    }, []);

    const sidbar_handler = () => {
        const menu_button = document?.getElementById('vertical-menu-btn');
        if (menu_button) {
            menu_button.addEventListener('click', () => {
                const body = document.querySelector('body');
                if (body && body.classList.contains('sidebar-enable') && body.getAttribute('data-sidebar-size') === 'lg') {
                    setTimeout(() => {
                        body.setAttribute('data-sidebar-size', 'sm');
                        body.classList.remove('sidebar-enable');
                    }, 200);
                } else {
                    setTimeout(() => {
                        body.setAttribute('data-sidebar-size', 'lg');
                        body.classList.add('sidebar-enable');
                    }, 200);
                }
            });
        }
    }

    return (
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className={vCurPathLi('/dashboard')}>
                            <Link to="/dashboard" className={vCurPathA('/dashboard')}>
                                <i data-feather="grid" />
                                <span data-key="t-dashboard">Dashboard</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="#!" className="has-arrow">
                                <i data-feather="shield" />
                                <span data-key="t-authentication">Access Control</span>
                            </Link>
                            <ul className="sub-menu" aria-expanded="false">
                                <li className={vCurPathLi('/users')}><Link to="/users" data-key="t-user" className={vCurPathA('/users')}>User</Link></li>
                                <li className={vCurPathLi('/roles')}><Link to="/roles" data-key="t-role" className={vCurPathA('/roles')}>Role</Link></li>
                                <li className={vCurPathLi('/permissions')}><Link to="/permissions" data-key="t-permission" className={vCurPathA('/permissions')}>Permission</Link></li>
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