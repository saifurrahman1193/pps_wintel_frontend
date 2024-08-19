import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { USER_LOGOUT } from '../redux/action'

function Sidebar(props:any) {

    const vCurPathA = (pathname = '') => {
        const path = props.breadcrumb.currentPath
        if (path == pathname) {
            return 'active'
        }
        return ''
    }

    const sidebarCurPathLi = (pathname = '') => {
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
                        <li className={sidebarCurPathLi('/dashboard')}>
                            <Link to="/dashboard" className={vCurPathA('/dashboard')}>
                                <i data-feather="grid" />
                                <span data-key="t-dashboard">Dashboard</span>
                            </Link>
                        </li>

                        {
                            ['user list', 'role list', 'permission list', 'handset user list'].some(ai => props?.permissions?.includes(ai)) ?
                                <li>
                                    <Link to="#!" className="has-arrow">
                                        <i data-feather="shield" />
                                        <span data-key="t-authentication">Access Control</span>
                                    </Link>
                                    <ul className="sub-menu" aria-expanded="false">
                                        {
                                            props.permissions.includes('user list') ?
                                                <li className={sidebarCurPathLi('/users')}><Link to="/users" data-key="t-user" className={vCurPathA('/users')}>User</Link></li>
                                                :
                                                null
                                        }

                                        {
                                            props.permissions.includes('role list') ?
                                                <li className={sidebarCurPathLi('/roles')}><Link to="/roles" data-key="t-role" className={vCurPathA('/roles')}>Role</Link></li>
                                                :
                                                null
                                        }

                                        {
                                            props.permissions.includes('permission list') ?
                                                <li className={sidebarCurPathLi('/permissions')}><Link to="/permissions" data-key="t-permission" className={vCurPathA('/permissions')}>Permission</Link></li>
                                                :
                                                null
                                        }

                                        {
                                            props.permissions.includes('handset user list') ?
                                                <li className={sidebarCurPathLi('/handset-users')}><Link to="/handset-users" data-key="t-permission" className={vCurPathA('/handset-users')}>Handset User</Link></li>
                                                :
                                                null
                                        }
                                    </ul>
                                </li>
                                :
                                null
                        }

                    </ul>
                </div>
                {/* Sidebar */}
            </div>
        </div>

    )
}

const mapStateToProps = (state: any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions,
    breadcrumb: state.breadcrumb,
})

const mapDispatchToProps = (dispatch: any) => ({
    logout: () => dispatch(USER_LOGOUT())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);