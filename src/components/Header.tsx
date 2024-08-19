import { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { LOGOUT } from '../api/apiPath'
import { postCall } from '../api/apiService'
import { USER_LOGOUT } from '../redux/action'
import Loader from './Loader'


function Header(props:any) {
 
    const vCurPathA = (pathname='') => {
        const path = props.breadcrumb.currentPath
        if (path == pathname) {
            return 'active'
        }
        return ''
    }

    const navigate = useNavigate();

    const userLogout = async (e:any) => {
        e.preventDefault()
        const response = await postCall(LOGOUT, null, props.user?.access_token, { hitmap: 'logout submit', pageurl: window.location.href, page: 'logout' })
        if (response.code === 200) {
            toast.success(response?.message?.[0])
            props.logout()
            navigate('/')
            setTimeout(() => {
                window.location.reload();
            }, 50)
        } else {
            if (response?.message) {
                toast.error(response?.message?.[0]);
            }
            else {
                toast.error('Something went wrong');
            }
            props.logout();
            navigate('/')
            setTimeout(() => {
                window.location.reload();
            }, 50)
        }
    }

    

    return (
        <Fragment>
            <Loader />

            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/* LOGO */}
                        <div className="navbar-brand-box">
                            <Link to="/dashboard" className="logo logo-dark">
                                <span className="logo-sm">
                                    <img src="assets/images/logo.png" alt="image" height={16} />
                                </span>
                                <span className="logo-lg">
                                    <img src="assets/images/logo.png" alt="image" height={24} /> <span className="logo-txt"></span>
                                </span>
                            </Link>
                            <Link to="/dashboard" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src="assets/images/logo.png" alt="image" height={16} />
                                </span>
                                <span className="logo-lg">
                                    <img src="assets/images/logo.png" alt="image" height={24} /> <span className="logo-txt"></span>
                                </span>
                            </Link>
                        </div>
                        <button type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn">
                            <i className="fa fa-fw fa-bars" />
                        </button>
                        {/* App Search*/}

                    </div>
                    <div className="d-flex">
                        <div className="dropdown d-inline-block d-lg-none ms-2">
                            <button type="button" className="btn header-item" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="search" className="icon-lg" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Search Result" />
                                            <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="dropdown d-none d-lg-inline-block ms-1">
                            <button type="button" className="btn header-item" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="grid" className="icon-lg" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end">
                                <div className="p-2">
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/github.png" alt="Github" />
                                                <span>GitHub</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/bitbucket.png" alt="bitbucket" />
                                                <span>Bitbucket</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/dribbble.png" alt="dribbble" />
                                                <span>Dribbble</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="row g-0">
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/dropbox.png" alt="dropbox" />
                                                <span>Dropbox</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/mail_chimp.png" alt="mail_chimp" />
                                                <span>Mail Chimp</span>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="dropdown-icon-item" href="#!">
                                                <img src="assets/images/brands/slack.png" alt="slack" />
                                                <span>Slack</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon position-relative" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i data-feather="bell" className="icon-lg" />
                                <span className="badge bg-danger rounded-pill">5</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0"> Notifications </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="small text-reset text-decoration-underline"> Unread (3)</a>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{ maxHeight: 230 }}>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img src="assets/images/users/avatar-3.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">James Lemire</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">It will seem like simplified English.</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span>1 hour ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i className="bx bx-cart" />
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Your order is placed</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span>3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-sm me-3">
                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                    <i className="bx bx-badge-check" />
                                                </span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Your item is shipped</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span>3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#!" className="text-reset notification-item">
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 me-3">
                                                <img src="assets/images/users/avatar-6.jpg" className="rounded-circle avatar-sm" alt="user-pic" />
                                            </div>
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">Salena Layfield</h6>
                                                <div className="font-size-13 text-muted">
                                                    <p className="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline" /> <span>1 hours ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2 border-top d-grid">
                                    <a className="btn btn-sm btn-link font-size-14 text-center" href="#!">
                                        <i className="mdi mdi-arrow-right-circle me-1" /> <span>View More..</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item bg-soft-light" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-2.png" alt="Header Avatar" />
                                <span className="d-none d-xl-inline-block ms-1 fw-medium">{props?.user?.name}</span>
                                <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end dropdownmenu-primary">
                                {/* item*/}
                                <Link className={"dropdown-item "+vCurPathA('/profile')} to="/profile"><i className="bx bx-user font-size-16 align-middle me-1" /> Profile</Link>
                               
                                <div className="dropdown-divider" />
                                <Link className="dropdown-item" to="/" onClick={userLogout}>
                                    <i className="mdi mdi-logout font-size-16 align-middle me-1" /> Log out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>


        </Fragment>
    )
}

const mapStateToProps = (state:any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions,
    breadcrumb: state.breadcrumb,
})

const mapDispatchToProps = (dispatch:any) => ({
    logout: () => dispatch(USER_LOGOUT())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);