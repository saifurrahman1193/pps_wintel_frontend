import React, { Fragment, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { LOGOUT, MY_NOTIFICATIONS, UPDATE_ALL_MY_NOTIFICATIONS_AS_VIEWED, UPDATE_SPECIFIC_NOTIFICATION_AS_VIEWED } from '../api/apiPath'
import { postCall } from '../api/apiService'
import { USER_LOGOUT } from '../redux/action'
import Loader from './Loader'
import { createActivityLog, userAgent, ip_address } from '../components/Helpers/CommonHelpers'

const moment = require('moment');

function Header(props) {

  const history = useHistory();

  const userLogout = async (e) => {
    e.preventDefault()
    var response = await postCall(LOGOUT, null, props.user?.access_token, {hitmap:'logout submit', pageurl:window.location.href, page:'logout'})
    if (response.code === 200) {
      toast.success(response?.message?.[0])
      props.logout()
      history.push('/')
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
      history.push('/')
      setTimeout(() => {
          window.location.reload();
      }, 50)
    }
  }



  const MINUTE_MS = 15000;

  useEffect(() => {
    const interval = setInterval(() => {
      getMyNotifications()
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])


  const topbarMenuChecker = (e) => {

    // mobile-nav-trigger
    let mobile_nav_trigger = document.querySelector('#mobile-nav-trigger')

    let navigation = document.querySelector('#navigation')

    if (mobile_nav_trigger.classList.contains('open')) {
      mobile_nav_trigger.classList.remove('open')
      navigation.style.display = 'none'
    }
    else {
      mobile_nav_trigger.classList.add('open')
      navigation.style.display = 'block'
    }
  }


  const [notificationsData, setNotificationsData] = useState({})
  const getMyNotifications = async () => {
    var response = await postCall(MY_NOTIFICATIONS, {limit:50}, props?.user?.access_token)
    if (response.code === 200) {
      setNotificationsData(response?.data)
    } else {
    }
  }

  const notificationClickHandler = (e, row) => {
    e.preventDefault()

    let row_response = JSON.parse(row?.response) || {}

    updateSpecificNotificationAsViewed(row?.id)

    setTimeout(() => {
      downloadFile(row_response)
    }, 1000);

  }

  const updateAllMyNotificationsAsViewed = async () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      var response = await postCall(UPDATE_ALL_MY_NOTIFICATIONS_AS_VIEWED, null, props?.user?.access_token)
      if (response.code === 200) {
        getMyNotifications()
      } else {
      }
    }
  }

  const updateSpecificNotificationAsViewed = async (id) => {
    var response = await postCall(UPDATE_SPECIFIC_NOTIFICATION_AS_VIEWED, { id: id }, props?.user?.access_token)
    if (response.code === 200) {
      getMyNotifications()
    } else {
    }
  }

  const downloadFile = (response) => {
    let file_url = process?.env?.REACT_APP_PUBLIC_UPLOADS_BASE_URL + response?.filePath
    // console.log(file_url, response?.type);
    // var data = new Blob(['http://localhost:8001/uploads/reports/transactions/2022-06-07/csv/file_2022-06-07-154606-682.csv'], {type: response?.type});
    // var fileURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = file_url;
    tempLink.setAttribute('download', (response?.filePath)?.split('/')?.pop());
    tempLink.click();
  }

  const vCurPathA = (pathname) => {
    var path = props?.breadcrumb?.currentPath
    if (path == pathname) {
      return 'active dropdown-active'
    }
    return ''
  }

  const vSubMenuCurPathA = (arr) => {
    var path = props?.breadcrumb?.currentPath
    if (arr.includes(path)) {
        return 'text-white'
    }
    return ''
  }
  const vSubMenuCurPathA2 = (arr) => {
    var path = props?.breadcrumb?.currentPath
    if (arr.includes(path)) {
        return 'level-2-submenu-active'
    }
    return ''
  }

  return (
    <Fragment>
      <Loader />

      {/* Navigation Bar*/}
      <header id="topnav">
        {/* Topbar Start */}
        <div className="navbar-custom bg-white">
          <div className="container-fluid">
            <ul className="list-unstyled topnav-menu float-right mb-0">

              <li className="dropdown notification-list" >
                <Link to="#" className="navbar-toggle nav-link" onClick={(e) => topbarMenuChecker(e)} id="mobile-nav-trigger">
                  <div className="lines">
                    <span />
                    <span />
                    <span />
                  </div>
                </Link>
              </li>

              

              <li className="dropdown notification-list">
                <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="fe-bell noti-icon" />
                  {
                    notificationsData?.total_count > 0 ?
                      <span className="badge badge-danger rounded-circle noti-icon-badge">{notificationsData?.total_count}</span>
                      : null
                  }
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-lg">
                  <div className="dropdown-item noti-title">
                    <h5 className="m-0">
                      <span className="float-right">
                        {
                          notificationsData?.notifications?.length>0 ?
                          <Link to="#" className="text-dark" onClick={updateAllMyNotificationsAsViewed}>
                            <small>Clear All</small>
                          </Link>
                          : null
                        }
                      </span>Notification
                    </h5>
                  </div>
                  <div 
                    className="slimscroll noti-scroll"
                    style={{ overflowY: "auto" }}
                  >

                    <hr className="my-0 py-0"></hr>

                    {
                      notificationsData?.notifications?.length>0 ?
                        notificationsData?.notifications?.map((row, i) => {
                          return (

                            <>
                              <Link to="#" className="dropdown-item notify-item py-0"
                              onClick={(e) => notificationClickHandler(e, row)}
                              
                                  key={`notification-`+i}
                                >
                                  <div className="notify-icon bg-info mt-1">
                                    <i className="mdi mdi-download" />
                                  </div>
                                  <p className="notify-details">
                                    {row?.message}
                                    <small className="text-muted">{moment(row?.created_at).fromNow()}</small>
                                  </p>

                              </Link>
                            </>
                          )
                        })
                      :

                      <Link to="#" className="dropdown-item notify-item py-0 disabled">
                        <div className="notify-icon bg-info mt-1">
                          <i className="mdi mdi-information-variant" />
                        </div>
                        <p className="notify-details py-2 text-muted">
                          Not found any notifications yet.
                        </p>
                      </Link>
                    }

                  </div>
                
                </div>
              </li>
              <li className="dropdown notification-list">
                <Link to="#" className="nav-link dropdown-toggle nav-user mr-0" data-toggle="dropdown"  role="button" aria-haspopup="false" aria-expanded="false">
                  <img src="assets/images/users/avatar-4.jpg" alt="avatar-4.jpg" className="rounded-circle" />
                  <span className="pro-user-name ml-1 text-dark">
                    {props.user.name} <i className="mdi mdi-chevron-down" />
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right profile-dropdown ">
                  <div className="dropdown-item noti-title">
                    <h6 className="m-0">
                      {props.user.name}
                    </h6>
                  </div>
                  <Link to="/profile" className={`dropdown-item notify-item ${vCurPathA('/profile')}`}> 
                    <i className="dripicons-user" />
                    <span>My Account</span>
                  </Link>
                  
                  <div className="dropdown-divider" />
                  <Link to="#" onClick={userLogout} className="dropdown-item notify-item">
                    <i className="dripicons-power" />
                    <span>Logout</span>
                  </Link>
                </div>
              </li>
             
            </ul>
            <ul className="list-unstyled topnav-menu-left m-0">
              <li className="logo-box float-left">
                <Link to="/" className="logo">
                  <span className="logo-lg">
                    <img src="assets/images/logo.png" alt="logo" height={55} />
                  </span>
                  <span className="logo-sm">
                    <img src="assets/images/logo.png" alt="logo" height={35} />
                  </span>
                </Link>
              </li>

            </ul>
          </div> {/* end container-fluid*/}
        </div>
        {/* end Topbar */}
        <div className="topbar-menu" >
          <div className="container-fluid">
            <div id="navigation">
              {/* Navigation Menu*/}
              <ul className="navigation-menu">
                <li className="has-submenu">
                  <Link to="/" className={`dropdown-item ${vSubMenuCurPathA(['/'])}`}><i className="fe-airplay" />Dashboards</Link>
                </li>
                {
                  ['transaction report', 'activity log list', 'transaction amount reduction list', 'retry app status', 'ibbl-transaction-search'].some( ai => props?.permissions?.includes(ai) ) ?
                  <li className="has-submenu" id="has-submenu-reports">
                    <Link
                      to="#"
                      className={vSubMenuCurPathA(['/transaction-report', '/activity-log', '/reduction-list', '/retry-app-status', '/ibbl-transaction-search'])}
                    >
                      <i className="fe-bar-chart" />Reports <div className="arrow-down" />
                    </Link>
                    <ul className="submenu" id="submenu-reports">
                      {
                        props?.permissions?.includes('transaction report') ?
                          <li>
                            <Link to="/transaction-report" className={`dropdown-item ${vCurPathA('/transaction-report')}`}>Transaction Report</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('activity log list') ?
                          <li>
                            <Link to="/activity-log" className={`dropdown-item ${vCurPathA('/activity-log')}`}>Activity Log List</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('transaction amount reduction list') ?
                          <li>
                            <Link to="/reduction-list" className={`dropdown-item ${vCurPathA('/reduction-list')}`}>Reduction List</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('retry app status') ?
                          <li>
                            <Link to="/retry-app-status" className={`dropdown-item ${vCurPathA('/retry-app-status')}`}>Retry App Status</Link>
                          </li>
                          : null
                      }

                      {
                        props?.permissions?.includes('ibbl transaction search') ?
                          <li>
                            <Link to="/ibbl-transaction-search" className={`dropdown-item ${vCurPathA('/ibbl-transaction-search')}`}>IBBL Transaction Search</Link>
                          </li>
                          : null
                      }

                    </ul>
                  </li>

                  : null
                }
                
                {
                  ['trigger amount', 'trigger amount offer expire', 'trigger amount client bulk expire', 'allow all trigger amount to a client', 'add new trigger amount to clients'].some( ai => props?.permissions?.includes(ai) ) ?
                  <li className="has-submenu"  id="has-submenu-trigger-amount">
                    <Link to="#" 
                      className={vSubMenuCurPathA(['/trigger-amount', '/offer-expire', '/client-bulk-expire', '/allow-all-trigger-amount-to-client', '/add-new-trigger-amount-to-clients'])}
                    ><i className="fe-hard-drive" />Trigger Amount <div className="arrow-down" /></Link>
                    <ul className="submenu" id="submenu-trigger-amount">
                      {
                        props?.permissions?.includes('trigger amount') ?
                          <li>
                            <Link to="/trigger-amount" className={`dropdown-item ${vCurPathA('/trigger-amount')}`}>Trigger Amount</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('trigger amount offer expire') ?
                          <li>
                            <Link to="/offer-expire" className={`dropdown-item ${vCurPathA('/offer-expire')}`}>Offer Expire</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('trigger amount client bulk expire') ?
                          <li>
                            <Link to="/client-bulk-expire" className={`dropdown-item ${vCurPathA('/client-bulk-expire')}`}>Client Bulk Expire</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('allow all trigger amount to a client') ?
                          <li>
                            <Link to="/allow-all-trigger-amount-to-client" className={`dropdown-item ${vCurPathA('/allow-all-trigger-amount-to-client')}`}>Allow All Trigger Amount To A Client</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('add new trigger amount to clients') ?
                          <li>
                            <Link to="/add-new-trigger-amount-to-clients" className={`dropdown-item ${vCurPathA('/add-new-trigger-amount-to-clients')}`}>Add New Trigger Amount To Clients</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('blocked amount list') ?
                          <li>
                            <Link to="/blocked-amount-list" className={`dropdown-item ${vCurPathA('/blocked-amount-list')}`}>Blocked Amount</Link>
                          </li>
                          : null
                      }
                    </ul>
                  </li>
                : null
                }

                {
                  ['user list', 'role list', 'permission list'].some( ai => props?.permissions?.includes(ai) ) ?
                  <li className="has-submenu" id="has-submenu-access-control">
                    <Link
                      className={vSubMenuCurPathA(['/users', '/roles', '/permissions'])}
                      to="#"
                    >
                      <i className="fa fa-user-shield" />Access Control <div className="arrow-down" />
                    </Link>
                    <ul className="submenu" id="submenu-access-control">

                      {
                        props?.permissions?.includes('user list') ?
                          <li>
                            <Link to="/users" className={`dropdown-item ${vCurPathA('/users')}`}>Users</Link>
                          </li>
                          : null
                      }

                      {
                        props?.permissions?.includes('role list') ?
                          <li>
                            <Link to="/roles" className={`dropdown-item ${vCurPathA('/roles')}`}>Roles</Link>
                          </li>
                          : null
                      }
                      {
                        props?.permissions?.includes('permission list') ?
                          <li>
                            <Link to="/permissions" className={`dropdown-item ${vCurPathA('/permissions')}`}>Permissions</Link>
                          </li>
                          : null
                      }
                    </ul>
                  </li>
                  : null
                }

                {
                  ['callback list'].some( ai => props?.permissions?.includes(ai) ) ?
                  <li className="has-submenu"  id="has-submenu-manage">
                    <Link
                      className={vSubMenuCurPathA(['/manage-callback', '/client-ip'])}
                      to="#"
                    >
                      <i className="fa fa-tasks" />Manage <div className="arrow-down" />
                    </Link>
                    <ul className="submenu" id="submenu-manage">

                      {
                        props?.permissions?.includes('callback list') ?
                          <li>
                            <Link className={`dropdown-item ${vCurPathA('/manage-callback')}`} to="/manage-callback">Manage Callback</Link>
                          </li>
                          : null
                      }

                        <li className="has-submenu"  id="has-submenu-client">
                          <Link
                            className={vSubMenuCurPathA2(['/client-ip'])}
                            to="#"
                          >
                            Client 
                            <div className="arrow-down" />
                          </Link>

                          <ul className="submenu" id="submenu-client">
                              {
                                props?.permissions?.includes('client ip list') ?
                                <li>
                                  <Link className={`dropdown-item ${vCurPathA('/client-ip')}`} to="/client-ip">Client IP</Link>
                                </li>
                                : null
                              }
                          </ul>
                        </li>

                    </ul>
                  </li>
                  : null
                }



              </ul>
              {/* End navigation menu */}
              <div className="clearfix" />
            </div>
            {/* end #navigation */}
          </div>
          {/* end container */}
        </div>
        {/* end navbar-custom */}
      </header>
      {/* End Navigation Bar*/}


    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);