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
        <div className="vertical-menu">
            <div data-simplebar className="h-100">
                {/*- Sidemenu */}
                <div id="sidebar-menu">
                    {/* Left Menu Start */}
                    <ul className="metismenu list-unstyled" id="side-menu">
                        <li className="menu-title" data-key="t-menu">Menu</li>
                        <li>
                            <a href="index.html">
                                <i data-feather="home" />
                                <span data-key="t-dashboard">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="grid" />
                                <span data-key="t-apps">Apps</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li>
                                    <a href="apps-calendar.html">
                                        <span data-key="t-calendar">Calendar</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="apps-chat.html">
                                        <span data-key="t-chat">Chat</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#!" className="has-arrow">
                                        <span data-key="t-email">Email</span>
                                    </a>
                                    <ul className="sub-menu" aria-expanded="false">
                                        <li><a href="apps-email-inbox.html" data-key="t-inbox">Inbox</a></li>
                                        <li><a href="apps-email-read.html" data-key="t-read-email">Read Email</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#!" className="has-arrow">
                                        <span data-key="t-invoices">Invoices</span>
                                    </a>
                                    <ul className="sub-menu" aria-expanded="false">
                                        <li><a href="apps-invoices-list.html" data-key="t-invoice-list">Invoice List</a></li>
                                        <li><a href="apps-invoices-detail.html" data-key="t-invoice-detail">Invoice Detail</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#!" className="has-arrow">
                                        <span data-key="t-contacts">Contacts</span>
                                    </a>
                                    <ul className="sub-menu" aria-expanded="false">
                                        <li><a href="apps-contacts-grid.html" data-key="t-user-grid">User Grid</a></li>
                                        <li><a href="apps-contacts-list.html" data-key="t-user-list">User List</a></li>
                                        <li><a href="apps-contacts-profile.html" data-key="t-profile">Profile</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="users" />
                                <span data-key="t-authentication">Authentication</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="auth-login.html" data-key="t-login">Login</a></li>
                                <li><a href="auth-register.html" data-key="t-register">Register</a></li>
                                <li><a href="auth-recoverpw.html" data-key="t-recover-password">Recover Password</a></li>
                                <li><a href="auth-lock-screen.html" data-key="t-lock-screen">Lock Screen</a></li>
                                <li><a href="auth-logout.html" data-key="t-logout">Log Out</a></li>
                                <li><a href="auth-confirm-mail.html" data-key="t-confirm-mail">Confirm Mail</a></li>
                                <li><a href="auth-email-verification.html" data-key="t-email-verification">Email Verification</a></li>
                                <li><a href="auth-two-step-verification.html" data-key="t-two-step-verification">Two Step Verification</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="file-text" />
                                <span data-key="t-pages">Pages</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="pages-starter.html" data-key="t-starter-page">Starter Page</a></li>
                                <li><a href="pages-maintenance.html" data-key="t-maintenance">Maintenance</a></li>
                                <li><a href="pages-comingsoon.html" data-key="t-coming-soon">Coming Soon</a></li>
                                <li><a href="pages-timeline.html" data-key="t-timeline">Timeline</a></li>
                                <li><a href="pages-faqs.html" data-key="t-faqs">FAQs</a></li>
                                <li><a href="pages-pricing.html" data-key="t-pricing">Pricing</a></li>
                                <li><a href="pages-404.html" data-key="t-error-404">Error 404</a></li>
                                <li><a href="pages-500.html" data-key="t-error-500">Error 500</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="layouts-horizontal.html">
                                <i data-feather="layout" />
                                <span data-key="t-horizontal">Horizontal</span>
                            </a>
                        </li>
                        <li className="menu-title mt-2" data-key="t-components">Elements</li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="briefcase" />
                                <span data-key="t-components">Components</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="ui-alerts.html" data-key="t-alerts">Alerts</a></li>
                                <li><a href="ui-buttons.html" data-key="t-buttons">Buttons</a></li>
                                <li><a href="ui-cards.html" data-key="t-cards">Cards</a></li>
                                <li><a href="ui-carousel.html" data-key="t-carousel">Carousel</a></li>
                                <li><a href="ui-dropdowns.html" data-key="t-dropdowns">Dropdowns</a></li>
                                <li><a href="ui-grid.html" data-key="t-grid">Grid</a></li>
                                <li><a href="ui-images.html" data-key="t-images">Images</a></li>
                                <li><a href="ui-modals.html" data-key="t-modals">Modals</a></li>
                                <li><a href="ui-offcanvas.html" data-key="t-offcanvas">Offcanvas</a></li>
                                <li><a href="ui-progressbars.html" data-key="t-progress-bars">Progress Bars</a></li>
                                <li><a href="ui-placeholders.html" data-key="t-progress-bars">Placeholders</a></li>
                                <li><a href="ui-tabs-accordions.html" data-key="t-tabs-accordions">Tabs &amp; Accordions</a></li>
                                <li><a href="ui-typography.html" data-key="t-typography">Typography</a></li>
                                <li><a href="ui-video.html" data-key="t-video">Video</a></li>
                                <li><a href="ui-general.html" data-key="t-general">General</a></li>
                                <li><a href="ui-colors.html" data-key="t-colors">Colors</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="gift" />
                                <span data-key="t-ui-elements">Extended</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="extended-lightbox.html" data-key="t-lightbox">Lightbox</a></li>
                                <li><a href="extended-rangeslider.html" data-key="t-range-slider">Range Slider</a></li>
                                <li><a href="extended-sweet-alert.html" data-key="t-sweet-alert">SweetAlert 2</a></li>
                                <li><a href="extended-session-timeout.html" data-key="t-session-timeout">Session Timeout</a></li>
                                <li><a href="extended-rating.html" data-key="t-rating">Rating</a></li>
                                <li><a href="extended-notifications.html" data-key="t-notifications">Notifications</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!">
                                <i data-feather="box" />
                                <span className="badge rounded-pill bg-soft-danger text-danger float-end">7</span>
                                <span data-key="t-forms">Forms</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="form-elements.html" data-key="t-form-elements">Basic Elements</a></li>
                                <li><a href="form-validation.html" data-key="t-form-validation">Validation</a></li>
                                <li><a href="form-advanced.html" data-key="t-form-advanced">Advanced Plugins</a></li>
                                <li><a href="form-editors.html" data-key="t-form-editors">Editors</a></li>
                                <li><a href="form-uploads.html" data-key="t-form-upload">File Upload</a></li>
                                <li><a href="form-wizard.html" data-key="t-form-wizard">Wizard</a></li>
                                <li><a href="form-mask.html" data-key="t-form-mask">Mask</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="sliders" />
                                <span data-key="t-tables">Tables</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="tables-basic.html" data-key="t-basic-tables">Bootstrap Basic</a></li>
                                <li><a href="tables-datatable.html" data-key="t-data-tables">DataTables</a></li>
                                <li><a href="tables-responsive.html" data-key="t-responsive-table">Responsive</a></li>
                                <li><a href="tables-editable.html" data-key="t-editable-table">Editable</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="pie-chart" />
                                <span data-key="t-charts">Charts</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="charts-apex.html" data-key="t-apex-charts">Apexcharts</a></li>
                                <li><a href="charts-echart.html" data-key="t-e-charts">Echarts</a></li>
                                <li><a href="charts-chartjs.html" data-key="t-chartjs-charts">Chartjs</a></li>
                                <li><a href="charts-knob.html" data-key="t-knob-charts">Jquery Knob</a></li>
                                <li><a href="charts-sparkline.html" data-key="t-sparkline-charts">Sparkline</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="cpu" />
                                <span data-key="t-icons">Icons</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="icons-boxicons.html" data-key="t-boxicons">Boxicons</a></li>
                                <li><a href="icons-materialdesign.html" data-key="t-material-design">Material Design</a></li>
                                <li><a href="icons-dripicons.html" data-key="t-dripicons">Dripicons</a></li>
                                <li><a href="icons-fontawesome.html" data-key="t-font-awesome">Font Awesome 5</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="map" />
                                <span data-key="t-maps">Maps</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="false">
                                <li><a href="maps-google.html" data-key="t-g-maps">Google</a></li>
                                <li><a href="maps-vector.html" data-key="t-v-maps">Vector</a></li>
                                <li><a href="maps-leaflet.html" data-key="t-l-maps">Leaflet</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#!" className="has-arrow">
                                <i data-feather="share-2" />
                                <span data-key="t-multi-level">Multi Level</span>
                            </a>
                            <ul className="sub-menu" aria-expanded="true">
                                <li><a href="#!" data-key="t-level-1-1">Level 1.1</a></li>
                                <li>
                                    <a href="#!" className="has-arrow" data-key="t-level-1-2">Level 1.2</a>
                                    <ul className="sub-menu" aria-expanded="true">
                                        <li><a href="#!" data-key="t-level-2-1">Level 2.1</a></li>
                                        <li><a href="#!" data-key="t-level-2-2">Level 2.2</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div className="card sidebar-alert border-0 text-center mx-4 mb-0 mt-5">
                        <div className="card-body">
                            <img src="assets/images/giftbox.png" alt="image" />
                            <div className="mt-4">
                                <h5 className="alertcard-title font-size-16">Unlimited Access</h5>
                                <p className="font-size-13">Upgrade your plan from a Free trial, to select ‘Business Plan’.</p>
                                <a href="#!" className="btn btn-primary mt-2">Upgrade Now</a>
                            </div>
                        </div>
                    </div>
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