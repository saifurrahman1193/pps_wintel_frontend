import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { LOGOUT } from '../api/apiPath'
import { toast } from 'react-toastify'
import { getCall, postCall } from '../api/apiService'
import { USER_LOGOUT } from '../redux/action'
import Svgmenuiconcomponent from './Icons/Svgmenuiconcomponent'
import { kt_aside_mobile_toggle } from './Helpers/DesignHelpers'


function Sidebar(props) {

    const vCurPathA = (pathname) => {
        var path = props.breadcrumb.currentPath
        if (path == pathname) {
            return 'active'
        }
        return ''
    }

    const vSubMenuCurPathA = (arr) => {
        var path = props.breadcrumb.currentPath
        if (arr.includes(path)) {
            return 'menu-active-bg show'
        }
        return ''
    }

    const vSubMenuCurPathAAccordion = (arr) => {
        var path = props.breadcrumb.currentPath
        if (arr.includes(path)) {
            return ' hover show'
        }
        return ''
    }

    const userLogout = async (e) => {
        e.preventDefault()
        var response = await postCall(LOGOUT, null, props.user?.access_token)
        if (response?.code === 200) {
            toast.success(response?.message?.[0])
            props.logout()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    useEffect(() => {
    })

    const kt_aside_mobile_toggle_apply = () => {
        let options = {
            is_left_sidebar: 1
        }
        kt_aside_mobile_toggle(options)
    }

    const kt_aside_mobile_toggle_fullpage = (e) => {
        e.preventDefault()
        let kt_aside_mobile_toggle = document.querySelector('#kt_aside_mobile_toggle')
        kt_aside_mobile_toggle.click()
    }



    return (
        <React.Fragment>
            {/*begin::Aside*/}
            <div id="kt_aside" className="aside d-menu-mini w-desktop-73px" data-kt-drawer="true" data-kt-drawer-name="aside" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="false" data-kt-drawer-width="{default:'200px', '300px': '250px'}" data-kt-drawer-direction="start" data-kt-drawer-toggle="#kt_aside_mobile_toggle"
            >
                {/*begin::Aside menu*/}
                <div className="aside-menu flex-column-fluid">
                    {/*begin::Aside Menu*/}
                    <div className="hover-scroll-overlay-y my-5 my-lg-5" id="kt_aside_menu_wrapper" data-kt-scroll="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="{default: '#kt_aside_toolbar, #kt_aside_footer', lg: '#kt_header, #kt_aside_toolbar, #kt_aside_footer'}" data-kt-scroll-offset={0}>
                        {/*begin::Menu*/}
                        <div className="menu menu-column menu-title-gray-800 menu-state-title-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold" id="kt_aside_menu" data-kt-menu="true">





                            {
                                props?.user?.force_password == 0

                                    ?


                                    <>
                                        <div className="py-0 d-lg-none d-flex flex-row-reverse me-3">
                                            <Link to="#" className="btn btn-icon btn-light btn-sm border-0 fw-bolder flex-shrink-0 ms-3" replace
                                                onClick={kt_aside_mobile_toggle_fullpage}
                                            >
                                                <img src="/assets/media/icons/close.svg" width="14" alt='close' />
                                            </Link>
                                        </div>


                                        <div className="menu-item px-3">
                                            <Link className={'menu-link ' + vCurPathA('/')} to="/" onClick={kt_aside_mobile_toggle_apply}>
                                                <i className="la la-dashboard menu-icon"></i>
                                                {/* <i className="las la-home menu-icon"></i> */}
                                                <span className="menu-title">Dashboard</span>
                                            </Link>
                                        </div>


                                        {
                                            ['user list', 'role list', 'permission list'].some(ai => props?.permissions?.includes(ai)) ?

                                                <div data-kt-menu-trigger="click" className={"menu-item px-3 menu-accordion " + vSubMenuCurPathAAccordion(['/users', '/roles', '/permissions'])}>
                                                    <span className="menu-link">
                                                        <i className="la la-user-shield menu-icon"></i>
                                                        <span className="menu-title">Access Control</span>
                                                        <span className="menu-arrow"></span>
                                                    </span>
                                                    <div className={'menu-sub menu-sub-accordion ' + vSubMenuCurPathA(['/users', '/roles', '/permissions'])}>
                                                        {
                                                            props.permissions.includes('user list') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/users')} to="/users" onClick={kt_aside_mobile_toggle_apply}>
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        {/* <Svgmenuiconcomponent /> */}
                                                                        <span className="menu-title">Users</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }

                                                        {
                                                            props.permissions.includes('role list') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/roles')} to="/roles" onClick={kt_aside_mobile_toggle_apply}>
                                                                        {/* <Svgmenuiconcomponent /> */}
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        <span className="menu-title">Roles</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }

                                                        {
                                                            props.permissions.includes('permission list') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/permissions')} to="/permissions" onClick={kt_aside_mobile_toggle_apply}>
                                                                        {/* <Svgmenuiconcomponent /> */}
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        <span className="menu-title">Permissions</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }




                                        {
                                            ['date wise report', 'operator wise details report'].some(ai => props?.permissions?.includes(ai)) ?

                                                <div data-kt-menu-trigger="click" className={"menu-item px-3 menu-accordion " + vSubMenuCurPathAAccordion(['/date-wise-report', '/operator-wise-details-report'])}>
                                                    <span className="menu-link">
                                                        <i className="la la-bar-chart menu-icon"></i>
                                                        <span className="menu-title">Report</span>
                                                        <span className="menu-arrow"></span>
                                                    </span>
                                                    <div className={'menu-sub menu-sub-accordion ' + vSubMenuCurPathA(['/date-wise-report', '/operator-wise-details-report'])}>
                                                        {
                                                            props.permissions.includes('date wise report') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/date-wise-report')} to="/date-wise-report" onClick={kt_aside_mobile_toggle_apply}>
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        {/* <Svgmenuiconcomponent /> */}
                                                                        <span className="menu-title">Date wise Report</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }

                                                        {
                                                            props.permissions.includes('operator wise details report') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/operator-wise-details-report')} to="/operator-wise-details-report" onClick={kt_aside_mobile_toggle_apply}>
                                                                        {/* <Svgmenuiconcomponent /> */}
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        <span className="menu-title">Operator Wise Details</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }

                                                    </div>
                                                </div>
                                                :
                                                null
                                        }

                                        {
                                            props.permissions.includes('leaderboard') ?
                                                <div className="menu-item px-3">
                                                    <Link className={'menu-link ' + vCurPathA('/leaderboard')} to="/leaderboard" onClick={kt_aside_mobile_toggle_apply}>
                                                        <i className="la la-sort-amount-asc menu-icon"></i>
                                                        <span className="menu-title">Leaderboard</span>
                                                    </Link>
                                                </div>
                                                :
                                                null
                                        }


                                        {
                                            ['audit log list'].some(ai => props?.permissions?.includes(ai)) ?

                                                <div data-kt-menu-trigger="click" className={"menu-item px-3 menu-accordion " + vSubMenuCurPathAAccordion(['/audit-log'])}>
                                                    <span className="menu-link">
                                                        <i className="la la-map menu-icon"></i>
                                                        <span className="menu-title">Audit</span>
                                                        <span className="menu-arrow"></span>
                                                    </span>
                                                    <div className={'menu-sub menu-sub-accordion ' + vSubMenuCurPathA(['/audit-log'])}>

                                                        {
                                                            props.permissions.includes('audit log list') ?
                                                                <div className="menu-item px-3">
                                                                    <Link className={'menu-link ' + vCurPathA('/audit-log')} to="/audit-log" onClick={kt_aside_mobile_toggle_apply}>
                                                                        <span className="menu-bullet">
                                                                            <span className="bullet bullet-dot"></span>
                                                                        </span>
                                                                        <span className="menu-title">Audit Log List</span>
                                                                    </Link>
                                                                </div>
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                </div>
                                                :
                                                null
                                        }
                                    </>
                                    : null
                            }


                        </div>
                        {/*end::Menu*/}
                    </div>
                    {/*end::Aside Menu*/}
                </div>
                {/*end::Aside menu*/}
                {/*begin::Footer*/}

                {/*end::Footer*/}
            </div>
            {/*end::Aside*/}
        </React.Fragment>
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