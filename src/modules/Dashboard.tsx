import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../redux/action'
import { permissionsResets, createAuditLog, userAgent, numberFormat } from '../components/Helpers/CommonHelpers'
import { toast } from 'react-toastify'
import { postCall } from '../api/apiService'

function Dashboard(props) {
    const breadcrumb = {
        pageTitle: 'Dashboard',
        currentPath: '/',
        layers: [
            {
                title: 'Home',
                link: '/',
            }
        ],

    }



    return (
        <React.Fragment>

            <div>
                {/* Begin page */}
                <div id="layout-wrapper">
                    <header id="page-topbar">
                        <div className="navbar-header">
                            <div className="d-flex">
                                {/* LOGO */}
                                <div className="navbar-brand-box">
                                    <a href="index.html" className="logo logo-dark">
                                        <span className="logo-sm">
                                            <img src="assets/images/logo-sm.svg" alt="image" height={24} />
                                        </span>
                                        <span className="logo-lg">
                                            <img src="assets/images/logo-sm.svg" alt="image" height={24} /> <span className="logo-txt">Minia</span>
                                        </span>
                                    </a>
                                    <a href="index.html" className="logo logo-light">
                                        <span className="logo-sm">
                                            <img src="assets/images/logo-sm.svg" alt="image" height={24} />
                                        </span>
                                        <span className="logo-lg">
                                            <img src="assets/images/logo-sm.svg" alt="image" height={24} /> <span className="logo-txt">Minia</span>
                                        </span>
                                    </a>
                                </div>
                                <button type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn">
                                    <i className="fa fa-fw fa-bars" />
                                </button>
                                {/* App Search*/}
                                <form className="app-search d-none d-lg-block">
                                    <div className="position-relative">
                                        <input type="text" className="form-control" placeholder="Search..." />
                                        <button className="btn btn-primary" type="button"><i className="bx bx-search-alt align-middle" /></button>
                                    </div>
                                </form>
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
                                <div className="dropdown d-none d-sm-inline-block">
                                    <button type="button" className="btn header-item" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img id="header-lang-img" src="assets/images/flags/us.jpg" alt="Header Language" height={16} />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item notify-item language" data-lang="en">
                                            <img src="assets/images/flags/us.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">English</span>
                                        </a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item notify-item language" data-lang="sp">
                                            <img src="assets/images/flags/spain.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Spanish</span>
                                        </a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item notify-item language" data-lang="gr">
                                            <img src="assets/images/flags/germany.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">German</span>
                                        </a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item notify-item language" data-lang="it">
                                            <img src="assets/images/flags/italy.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Italian</span>
                                        </a>
                                        {/* item*/}
                                        <a href="#!" className="dropdown-item notify-item language" data-lang="ru">
                                            <img src="assets/images/flags/russia.jpg" alt="user-image" className="me-1" height={12} /> <span className="align-middle">Russian</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="dropdown d-none d-sm-inline-block">
                                    <button type="button" className="btn header-item" id="mode-setting-btn">
                                        <i data-feather="moon" className="icon-lg layout-mode-dark" />
                                        <i data-feather="sun" className="icon-lg layout-mode-light" />
                                    </button>
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
                                    <button type="button" className="btn header-item right-bar-toggle me-2">
                                        <i data-feather="settings" className="icon-lg" />
                                    </button>
                                </div>
                                <div className="dropdown d-inline-block">
                                    <button type="button" className="btn header-item bg-soft-light border-start border-end" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img className="rounded-circle header-profile-user" src="assets/images/users/avatar-1.jpg" alt="Header Avatar" />
                                        <span className="d-none d-xl-inline-block ms-1 fw-medium">Shawn L.</span>
                                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        {/* item*/}
                                        <a className="dropdown-item" href="apps-contacts-profile.html"><i className="mdi mdi-face-profile font-size-16 align-middle me-1" /> Profile</a>
                                        <a className="dropdown-item" href="auth-lock-screen.html"><i className="mdi mdi-lock font-size-16 align-middle me-1" /> Lock Screen</a>
                                        <div className="dropdown-divider" />
                                        <a className="dropdown-item" href="auth-logout.html"><i className="mdi mdi-logout font-size-16 align-middle me-1" /> Logout</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {/* ========== Left Sidebar Start ========== */}
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
                    {/* Left Sidebar End */}
                    {/* ============================================================== */}
                    {/* Start right Content here */}
                    {/* ============================================================== */}
                    <div className="main-content">
                        <div className="page-content">
                            <div className="container-fluid">
                                {/* start page title */}
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                            <h4 className="mb-sm-0 font-size-18">Dashboard</h4>
                                            <div className="page-title-right">
                                                <ol className="breadcrumb m-0">
                                                    <li className="breadcrumb-item"><a href="#!">Dashboard</a></li>
                                                    <li className="breadcrumb-item active">Dashboard</li>
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end page title */}
                                <div className="row">
                                    <div className="col-xl-3 col-md-6">
                                        {/* card */}
                                        <div className="card card-h-100">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">My Wallet</span>
                                                        <h4 className="mb-3">
                                                            $<span className="counter-value" data-target="865.2">0</span>k
                                                        </h4>
                                                    </div>
                                                    <div className="col-6">
                                                        <div id="mini-chart1" data-colors="[&quot;#5156be&quot;]" className="apex-charts mb-2" />
                                                    </div>
                                                </div>
                                                <div className="text-nowrap">
                                                    <span className="badge bg-soft-success text-success">+$20.9k</span>
                                                    <span className="ms-1 text-muted font-size-13">Since last week</span>
                                                </div>
                                            </div>{/* end card body */}
                                        </div>{/* end card */}
                                    </div>{/* end col */}
                                    <div className="col-xl-3 col-md-6">
                                        {/* card */}
                                        <div className="card card-h-100">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">Number of Trades</span>
                                                        <h4 className="mb-3">
                                                            <span className="counter-value" data-target={6258}>0</span>
                                                        </h4>
                                                    </div>
                                                    <div className="col-6">
                                                        <div id="mini-chart2" data-colors="[&quot;#5156be&quot;]" className="apex-charts mb-2" />
                                                    </div>
                                                </div>
                                                <div className="text-nowrap">
                                                    <span className="badge bg-soft-danger text-danger">-29 Trades</span>
                                                    <span className="ms-1 text-muted font-size-13">Since last week</span>
                                                </div>
                                            </div>{/* end card body */}
                                        </div>{/* end card */}
                                    </div>{/* end col*/}
                                    <div className="col-xl-3 col-md-6">
                                        {/* card */}
                                        <div className="card card-h-100">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">Invested Amount</span>
                                                        <h4 className="mb-3">
                                                            $<span className="counter-value" data-target="4.32">0</span>M
                                                        </h4>
                                                    </div>
                                                    <div className="col-6">
                                                        <div id="mini-chart3" data-colors="[&quot;#5156be&quot;]" className="apex-charts mb-2" />
                                                    </div>
                                                </div>
                                                <div className="text-nowrap">
                                                    <span className="badge bg-soft-success text-success">+ $2.8k</span>
                                                    <span className="ms-1 text-muted font-size-13">Since last week</span>
                                                </div>
                                            </div>{/* end card body */}
                                        </div>{/* end card */}
                                    </div>{/* end col */}
                                    <div className="col-xl-3 col-md-6">
                                        {/* card */}
                                        <div className="card card-h-100">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <span className="text-muted mb-3 lh-1 d-block text-truncate">Profit Ration</span>
                                                        <h4 className="mb-3">
                                                            <span className="counter-value" data-target="12.57">0</span>%
                                                        </h4>
                                                    </div>
                                                    <div className="col-6">
                                                        <div id="mini-chart4" data-colors="[&quot;#5156be&quot;]" className="apex-charts mb-2" />
                                                    </div>
                                                </div>
                                                <div className="text-nowrap">
                                                    <span className="badge bg-soft-success text-success">+2.95%</span>
                                                    <span className="ms-1 text-muted font-size-13">Since last week</span>
                                                </div>
                                            </div>{/* end card body */}
                                        </div>{/* end card */}
                                    </div>{/* end col */}
                                </div>{/* end row*/}
                                <div className="row">
                                    <div className="col-xl-5">
                                        {/* card */}
                                        <div className="card card-h-100">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="d-flex flex-wrap align-items-center mb-4">
                                                    <h5 className="card-title me-2">Wallet Balance</h5>
                                                    <div className="ms-auto">
                                                        <div>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm">
                                                                ALL
                                                            </button>
                                                            <button type="button" className="btn btn-soft-primary btn-sm">
                                                                1M
                                                            </button>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm">
                                                                6M
                                                            </button>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm active">
                                                                1Y
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-sm">
                                                        <div id="wallet-balance" data-colors="[&quot;#777aca&quot;, &quot;#5156be&quot;, &quot;#a8aada&quot;]" className="apex-charts" />
                                                    </div>
                                                    <div className="col-sm align-self-center">
                                                        <div className="mt-4 mt-sm-0">
                                                            <div>
                                                                <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-success" /> Bitcoin</p>
                                                                <h6>0.4412 BTC = <span className="text-muted font-size-14 fw-normal">$ 4025.32</span></h6>
                                                            </div>
                                                            <div className="mt-4 pt-2">
                                                                <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-primary" /> Ethereum</p>
                                                                <h6>4.5701 ETH = <span className="text-muted font-size-14 fw-normal">$ 1123.64</span></h6>
                                                            </div>
                                                            <div className="mt-4 pt-2">
                                                                <p className="mb-2"><i className="mdi mdi-circle align-middle font-size-10 me-2 text-info" /> Litecoin</p>
                                                                <h6>35.3811 LTC = <span className="text-muted font-size-14 fw-normal">$ 2263.09</span></h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* end card */}
                                    </div>
                                    {/* end col */}
                                    <div className="col-xl-7">
                                        <div className="row">
                                            <div className="col-xl-8">
                                                {/* card */}
                                                <div className="card card-h-100">
                                                    {/* card body */}
                                                    <div className="card-body">
                                                        <div className="d-flex flex-wrap align-items-center mb-4">
                                                            <h5 className="card-title me-2">Invested Overview</h5>
                                                            <div className="ms-auto">
                                                                <select className="form-select form-select-sm">
                                                                    <option value="MAY">May</option>
                                                                    <option value="AP">April</option>
                                                                    <option value="MA">March</option>
                                                                    <option value="FE">February</option>
                                                                    <option value="JA">January</option>
                                                                    <option value="DE">December</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="row align-items-center">
                                                            <div className="col-sm">
                                                                <div id="invested-overview" data-colors="[&quot;#5156be&quot;, &quot;#34c38f&quot;]" className="apex-charts" />
                                                            </div>
                                                            <div className="col-sm align-self-center">
                                                                <div className="mt-4 mt-sm-0">
                                                                    <p className="mb-1">Invested Amount</p>
                                                                    <h4>$ 6134.39</h4>
                                                                    <p className="text-muted mb-4"> + 0.0012.23 ( 0.2 % ) <i className="mdi mdi-arrow-up ms-1 text-success" /></p>
                                                                    <div className="row g-0">
                                                                        <div className="col-6">
                                                                            <div>
                                                                                <p className="mb-2 text-muted text-uppercase font-size-11">Income</p>
                                                                                <h5 className="fw-medium">$ 2632.46</h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <div>
                                                                                <p className="mb-2 text-muted text-uppercase font-size-11">Expenses</p>
                                                                                <h5 className="fw-medium">-$ 924.38</h5>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <a href="#!" className="btn btn-primary btn-sm">View more <i className="mdi mdi-arrow-right ms-1" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end col */}
                                            <div className="col-xl-4">
                                                {/* card */}
                                                <div className="card bg-primary text-white shadow-primary card-h-100">
                                                    {/* card body */}
                                                    <div className="card-body p-0">
                                                        <div id="carouselExampleCaptions" className="carousel slide text-center widget-carousel" data-bs-ride="carousel">
                                                            <div className="carousel-inner">
                                                                <div className="carousel-item active">
                                                                    <div className="text-center p-4">
                                                                        <i className="mdi mdi-bitcoin widget-box-1-icon" />
                                                                        <div className="avatar-md m-auto">
                                                                            <span className="avatar-title rounded-circle bg-soft-light text-white font-size-24">
                                                                                <i className="mdi mdi-currency-btc" />
                                                                            </span>
                                                                        </div>
                                                                        <h4 className="mt-3 lh-base fw-normal text-white"><b>Bitcoin</b> News</h4>
                                                                        <p className="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                                                            over the Bitcoin past week has dampened Bitcoin basics
                                                                            sentiment for bitcoin. </p>
                                                                        <button type="button" className="btn btn-light btn-sm">View details <i className="mdi mdi-arrow-right ms-1" /></button>
                                                                    </div>
                                                                </div>
                                                                {/* end carousel-item */}
                                                                <div className="carousel-item">
                                                                    <div className="text-center p-4">
                                                                        <i className="mdi mdi-ethereum widget-box-1-icon" />
                                                                        <div className="avatar-md m-auto">
                                                                            <span className="avatar-title rounded-circle bg-soft-light text-white font-size-24">
                                                                                <i className="mdi mdi-ethereum" />
                                                                            </span>
                                                                        </div>
                                                                        <h4 className="mt-3 lh-base fw-normal text-white"><b>ETH</b> News</h4>
                                                                        <p className="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                                                            over the Bitcoin past week has dampened Bitcoin basics
                                                                            sentiment for bitcoin. </p>
                                                                        <button type="button" className="btn btn-light btn-sm">View details <i className="mdi mdi-arrow-right ms-1" /></button>
                                                                    </div>
                                                                </div>
                                                                {/* end carousel-item */}
                                                                <div className="carousel-item">
                                                                    <div className="text-center p-4">
                                                                        <i className="mdi mdi-litecoin widget-box-1-icon" />
                                                                        <div className="avatar-md m-auto">
                                                                            <span className="avatar-title rounded-circle bg-soft-light text-white font-size-24">
                                                                                <i className="mdi mdi-litecoin" />
                                                                            </span>
                                                                        </div>
                                                                        <h4 className="mt-3 lh-base fw-normal text-white"><b>Litecoin</b> News</h4>
                                                                        <p className="text-white-50 font-size-13">Bitcoin prices fell sharply amid the global sell-off in equities. Negative news
                                                                            over the Bitcoin past week has dampened Bitcoin basics
                                                                            sentiment for bitcoin. </p>
                                                                        <button type="button" className="btn btn-light btn-sm">View details <i className="mdi mdi-arrow-right ms-1" /></button>
                                                                    </div>
                                                                </div>
                                                                {/* end carousel-item */}
                                                            </div>
                                                            {/* end carousel-inner */}
                                                            <div className="carousel-indicators carousel-indicators-rounded">
                                                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                                                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                                                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
                                                            </div>
                                                            {/* end carousel-indicators */}
                                                        </div>
                                                        {/* end carousel */}
                                                    </div>
                                                    {/* end card body */}
                                                </div>
                                                {/* end card */}
                                            </div>
                                            {/* end col */}
                                        </div>
                                        {/* end row */}
                                    </div>
                                    {/* end col */}
                                </div> {/* end row*/}
                                <div className="row">
                                    <div className="col-xl-8">
                                        {/* card */}
                                        <div className="card">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="d-flex flex-wrap align-items-center mb-4">
                                                    <h5 className="card-title me-2">Market Overview</h5>
                                                    <div className="ms-auto">
                                                        <div>
                                                            <button type="button" className="btn btn-soft-primary btn-sm">
                                                                ALL
                                                            </button>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm">
                                                                1M
                                                            </button>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm">
                                                                6M
                                                            </button>
                                                            <button type="button" className="btn btn-soft-secondary btn-sm active">
                                                                1Y
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-xl-8">
                                                        <div>
                                                            <div id="market-overview" data-colors="[&quot;#5156be&quot;, &quot;#34c38f&quot;]" className="apex-charts" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4">
                                                        <div className="p-4">
                                                            <div className="mt-0">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm m-auto">
                                                                        <span className="avatar-title rounded-circle bg-soft-light text-dark font-size-16">
                                                                            1
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <span className="font-size-16">Coinmarketcap</span>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <span className="badge rounded-pill badge-soft-success font-size-12 fw-medium">+2.5%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm m-auto">
                                                                        <span className="avatar-title rounded-circle bg-soft-light text-dark font-size-16">
                                                                            2
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <span className="font-size-16">Binance</span>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <span className="badge rounded-pill badge-soft-success font-size-12 fw-medium">+8.3%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm m-auto">
                                                                        <span className="avatar-title rounded-circle bg-soft-light text-dark font-size-16">
                                                                            3
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <span className="font-size-16">Coinbase</span>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <span className="badge rounded-pill badge-soft-danger font-size-12 fw-medium">-3.6%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm m-auto">
                                                                        <span className="avatar-title rounded-circle bg-soft-light text-dark font-size-16">
                                                                            4
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <span className="font-size-16">Yobit</span>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <span className="badge rounded-pill badge-soft-success font-size-12 fw-medium">+7.1%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                <div className="d-flex align-items-center">
                                                                    <div className="avatar-sm m-auto">
                                                                        <span className="avatar-title rounded-circle bg-soft-light text-dark font-size-16">
                                                                            5
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3">
                                                                        <span className="font-size-16">Bitfinex</span>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <span className="badge rounded-pill badge-soft-danger font-size-12 fw-medium">-0.9%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 pt-2">
                                                                <a href="#!" className="btn btn-primary w-100">See All Balances <i className="mdi mdi-arrow-right ms-1" /></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card */}
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row*/}
                                    <div className="col-xl-4">
                                        {/* card */}
                                        <div className="card">
                                            {/* card body */}
                                            <div className="card-body">
                                                <div className="d-flex flex-wrap align-items-center mb-4">
                                                    <h5 className="card-title me-2">Sales by Locations</h5>
                                                    <div className="ms-auto">
                                                        <div className="dropdown">
                                                            <a className="dropdown-toggle text-reset" href="#!" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <span className="text-muted font-size-12">Sort By:</span> <span className="fw-medium">World<i className="mdi mdi-chevron-down ms-1" /></span>
                                                            </a>
                                                            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                                                                <a className="dropdown-item" href="#!">USA</a>
                                                                <a className="dropdown-item" href="#!">Russia</a>
                                                                <a className="dropdown-item" href="#!">Australia</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="sales-by-locations" data-colors='["#5156be"]' style={{ height: 250 }} />
                                                <div className="px-2 py-2">
                                                    <p className="mb-1">USA <span className="float-end">75%</span></p>
                                                    <div className="progress mt-2" style={{ height: 6 }}>
                                                        <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={75}>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-1">Russia <span className="float-end">55%</span></p>
                                                    <div className="progress mt-2" style={{ height: 6 }}>
                                                        <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{ width: '55%' }} aria-valuenow={55} aria-valuemin={0} aria-valuemax={55}>
                                                        </div>
                                                    </div>
                                                    <p className="mt-3 mb-1">Australia <span className="float-end">85%</span></p>
                                                    <div className="progress mt-2" style={{ height: 6 }}>
                                                        <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{ width: '85%' }} aria-valuenow={85} aria-valuemin={0} aria-valuemax={85}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* end card body */}
                                        </div>
                                        {/* end card */}
                                    </div>
                                    {/* end col */}
                                </div>
                                {/* end row*/}
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-header align-items-center d-flex">
                                                <h4 className="card-title mb-0 flex-grow-1">Trading</h4>
                                                <div className="flex-shrink-0">
                                                    <ul className="nav nav-tabs-custom card-header-tabs" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-bs-toggle="tab" href="#buy-tab" role="tab">Buy</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab" href="#sell-tab" role="tab">Sell</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>{/* end card header */}
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="buy-tab" role="tabpanel">
                                                        <div className="float-end ms-2">
                                                            <h5 className="font-size-14"><i className="bx bx-wallet text-primary font-size-16 align-middle me-1" /> <a href="#!" className="text-reset text-decoration-underline">$4335.23</a></h5>
                                                        </div>
                                                        <h5 className="font-size-14 mb-4">Buy Coins</h5>
                                                        <div>
                                                            <div className="form-group mb-3">
                                                                <label>Payment method :</label>
                                                                <select className="form-select">
                                                                    <option>Direct Bank Payment</option>
                                                                    <option>Credit / Debit Card</option>
                                                                    <option>Paypal</option>
                                                                    <option>Payoneer</option>
                                                                    <option>Stripe</option>
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label>Add Amount :</label>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Amount</label>
                                                                    <select className="form-select" style={{ maxWidth: 90 }}>
                                                                        <option value="BT" >BTC</option>
                                                                        <option value="ET">ETH</option>
                                                                        <option value="LT">LTC</option>
                                                                    </select>
                                                                    <input type="text" className="form-control" placeholder="0.00121255" />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Price</label>
                                                                    <input type="text" className="form-control" placeholder="$58,245" />
                                                                    <label className="input-group-text">$</label>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Total</label>
                                                                    <input type="text" className="form-control" placeholder="$36,854.25" />
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="button" className="btn btn-success w-md">Buy Coin</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end tab pane */}
                                                    <div className="tab-pane" id="sell-tab" role="tabpanel">
                                                        <div className="float-end ms-2">
                                                            <h5 className="font-size-14"><i className="bx bx-wallet text-primary font-size-16 align-middle me-1" /> <a href="#!" className="text-reset text-decoration-underline">$4235.23</a></h5>
                                                        </div>
                                                        <h5 className="font-size-14 mb-4">Sell Coins</h5>
                                                        <div>
                                                            <div className="form-group mb-3">
                                                                <label>Wallet ID :</label>
                                                                <input type="email" className="form-control" placeholder="1cvb254ugxvfcd280ki" />
                                                            </div>
                                                            <div>
                                                                <label>Add Amount :</label>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Amount</label>
                                                                    <select className="form-select" style={{ maxWidth: 90 }}>
                                                                        <option value="BT" >BTC</option>
                                                                        <option value="ET">ETH</option>
                                                                        <option value="LT">LTC</option>
                                                                    </select>
                                                                    <input type="text" className="form-control" placeholder="0.00121255" />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Price</label>
                                                                    <input type="text" className="form-control" placeholder="$23,754.25" />
                                                                    <label className="input-group-text">$</label>
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <label className="input-group-text">Total</label>
                                                                    <input type="text" className="form-control" placeholder="$6,852.41" />
                                                                </div>
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="button" className="btn btn-danger w-md">Sell Coin</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* end tab pane */}
                                                </div>
                                                {/* end tab content */}
                                            </div>
                                            {/* end card body */}
                                        </div>
                                        {/* end card */}
                                    </div>
                                    {/* end col */}
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-header align-items-center d-flex">
                                                <h4 className="card-title mb-0 flex-grow-1">Transactions</h4>
                                                <div className="flex-shrink-0">
                                                    <ul className="nav justify-content-end nav-tabs-custom rounded card-header-tabs" role="tablist">
                                                        <li className="nav-item">
                                                            <a className="nav-link active" data-bs-toggle="tab" href="#transactions-all-tab" role="tab">
                                                                All
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab" href="#transactions-buy-tab" role="tab">
                                                                Buy
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-bs-toggle="tab" href="#transactions-sell-tab" role="tab">
                                                                Sell
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    {/* end nav tabs */}
                                                </div>
                                            </div>{/* end card header */}
                                            <div className="card-body px-0">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="transactions-all-tab" role="tabpanel">
                                                        <div className="table-responsive px-3" data-simplebar style={{ maxHeight: 352 }}>
                                                            <table className="table align-middle table-nowrap table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">16 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$94.22</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">17 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$84.32</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">18 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$145.80</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* end tab pane */}
                                                    <div className="tab-pane" id="transactions-buy-tab" role="tabpanel">
                                                        <div className="table-responsive px-3" data-simplebar style={{ maxHeight: 352 }}>
                                                            <table className="table align-middle table-nowrap table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">18 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$145.80</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">16 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$94.22</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">17 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$84.32</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-success">
                                                                                <i className="bx bx-down-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Buy BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* end tab pane */}
                                                    <div className="tab-pane" id="transactions-sell-tab" role="tabpanel">
                                                        <div className="table-responsive px-3" data-simplebar style={{ maxHeight: 352 }}>
                                                            <table className="table align-middle table-nowrap table-borderless">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">18 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.018 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$145.80</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">15 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.56 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$112.34</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">16 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">1.88 LTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$94.22</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">17 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.42 ETH</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$84.32</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: 50 }}>
                                                                            <div className="font-size-22 text-danger">
                                                                                <i className="bx bx-up-arrow-circle d-block" />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div>
                                                                                <h5 className="font-size-14 mb-1">Sell BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">14 Mar, 2021</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 mb-0">0.016 BTC</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Coin Value</p>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="text-end">
                                                                                <h5 className="font-size-14 text-muted mb-0">$125.20</h5>
                                                                                <p className="text-muted mb-0 font-size-12">Amount</p>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* end tab pane */}
                                                </div>
                                                {/* end tab content */}
                                            </div>
                                            {/* end card body */}
                                        </div>
                                        {/* end card */}
                                    </div>
                                    {/* end col */}
                                    <div className="col-xl-4">
                                        <div className="card">
                                            <div className="card-header align-items-center d-flex">
                                                <h4 className="card-title mb-0 flex-grow-1">Recent Activity</h4>
                                                <div className="flex-shrink-0">
                                                    <select className="form-select form-select-sm mb-0 my-n1">
                                                        <option value="Today">Today</option>
                                                        <option value="Yesterday">Yesterday</option>
                                                        <option value="Week">Last Week</option>
                                                        <option value="Month">Last Month</option>
                                                    </select>
                                                </div>
                                            </div>{/* end card header */}
                                            <div className="card-body px-0">
                                                <div className="px-3" data-simplebar style={{ maxHeight: 352 }}>
                                                    <ul className="list-unstyled activity-wid mb-0">
                                                        <li className="activity-list activity-border">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-warning text-warning rounded-circle">
                                                                    <i className="bx bx-bitcoin font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">+0.5 BTC</h6>
                                                                        <div className="font-size-13">$178.53</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="activity-list activity-border">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                                    <i className="mdi mdi-ethereum font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">-20.5 ETH</h6>
                                                                        <div className="font-size-13">$3541.45</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="activity-list activity-border">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-warning text-warning rounded-circle">
                                                                    <i className="bx bx-bitcoin font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">+0.5 BTC</h6>
                                                                        <div className="font-size-13">$5791.45</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="activity-list activity-border">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                                    <i className="mdi mdi-litecoin font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">-1.5 LTC</h6>
                                                                        <div className="font-size-13">$5791.45</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="activity-list activity-border">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-warning text-warning rounded-circle">
                                                                    <i className="bx bx-bitcoin font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">+0.5 BTC</h6>
                                                                        <div className="font-size-13">$5791.45</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="activity-list">
                                                            <div className="activity-icon avatar-md">
                                                                <span className="avatar-title bg-soft-primary text-primary rounded-circle">
                                                                    <i className="mdi mdi-litecoin font-size-24" />
                                                                </span>
                                                            </div>
                                                            <div className="timeline-list-item">
                                                                <div className="d-flex">
                                                                    <div className="flex-grow-1 overflow-hidden me-4">
                                                                        <h5 className="font-size-14 mb-1">24/05/2021, 18:24:56</h5>
                                                                        <p className="text-truncate text-muted font-size-13">0xb77ad0099e21d4fca87fa4ca92dda1a40af9e05d205e53f38bf026196fa2e431</p>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end me-3">
                                                                        <h6 className="mb-1">+.55 LTC</h6>
                                                                        <div className="font-size-13">$91.45</div>
                                                                    </div>
                                                                    <div className="flex-shrink-0 text-end">
                                                                        <div className="dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-24" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                                                <i className="mdi mdi-dots-vertical" />
                                                                            </a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#!">Action</a>
                                                                                <a className="dropdown-item" href="#!">Another action</a>
                                                                                <a className="dropdown-item" href="#!">Something else here</a>
                                                                                <div className="dropdown-divider" />
                                                                                <a className="dropdown-item" href="#!">Separated link</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* end card body */}
                                        </div>
                                        {/* end card */}
                                    </div>
                                    {/* end col */}
                                </div>{/* end row */}
                            </div>
                            {/* container-fluid */}
                        </div>
                        {/* End Page-content */}
                        <footer className="footer">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-6">
                                        © Minia.
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="text-sm-end d-none d-sm-block">
                                            Design &amp; Develop by <a href="#!" className="text-decoration-underline">Themesbrand</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    {/* end main content*/}
                </div>
                {/* END layout-wrapper */}
                {/* Right Sidebar */}
                <div className="right-bar">
                    <div data-simplebar className="h-100">
                        <div className="rightbar-title d-flex align-items-center bg-dark p-3">
                            <h5 className="m-0 me-2 text-white">Theme Customizer</h5>
                            <a href="#!" className="right-bar-toggle ms-auto">
                                <i className="mdi mdi-close noti-icon" />
                            </a>
                        </div>
                        {/* Settings */}
                        <hr className="m-0" />
                        <div className="p-4">
                            <h6 className="mb-3">Layout</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout" id="layout-vertical" defaultValue="vertical" />
                                <label className="form-check-label" htmlFor="layout-vertical">Vertical</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout" id="layout-horizontal" defaultValue="horizontal" />
                                <label className="form-check-label" htmlFor="layout-horizontal">Horizontal</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2">Layout Mode</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-mode" id="layout-mode-light" defaultValue="light" />
                                <label className="form-check-label" htmlFor="layout-mode-light">Light</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-mode" id="layout-mode-dark" defaultValue="dark" />
                                <label className="form-check-label" htmlFor="layout-mode-dark">Dark</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2">Layout Width</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-width" id="layout-width-fuild" defaultValue="fuild" onChange={() => document.body.setAttribute('data-layout-size', 'fluid')} />
                                <label className="form-check-label" htmlFor="layout-width-fuild">Fluid</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-width" id="layout-width-boxed" defaultValue="boxed" onChange={()=>document.body.setAttribute('data-layout-size', 'boxed')} />
                                <label className="form-check-label" htmlFor="layout-width-boxed">Boxed</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2">Layout Position</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-position" id="layout-position-fixed" defaultValue="fixed" onChange={() => document.body.setAttribute('data-layout-scrollable', 'false')} />
                                <label className="form-check-label" htmlFor="layout-position-fixed">Fixed</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-position" id="layout-position-scrollable" defaultValue="scrollable" onChange={() => document.body.setAttribute('data-layout-scrollable', 'true')} />
                                <label className="form-check-label" htmlFor="layout-position-scrollable">Scrollable</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2">Topbar Color</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="topbar-color" id="topbar-color-light" defaultValue="light" onChange={() => document.body.setAttribute('data-topbar', 'light')} />
                                <label className="form-check-label" htmlFor="topbar-color-light">Light</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="topbar-color" id="topbar-color-dark" defaultValue="dark" onChange={() => document.body.setAttribute('data-topbar', 'dark')} />
                                <label className="form-check-label" htmlFor="topbar-color-dark">Dark</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2 sidebar-setting">Sidebar Size</h6>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-default" defaultValue="default" onChange={() => document.body.setAttribute('data-sidebar-size', 'lg')} />
                                <label className="form-check-label" htmlFor="sidebar-size-default">Default</label>
                            </div>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-compact" defaultValue="compact" onChange={() => document.body.setAttribute('data-sidebar-size', 'md')} />
                                <label className="form-check-label" htmlFor="sidebar-size-compact">Compact</label>
                            </div>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-size" id="sidebar-size-small" defaultValue="small" onChange={() => document.body.setAttribute('data-sidebar-size', 'sm')} />
                                <label className="form-check-label" htmlFor="sidebar-size-small">Small (Icon View)</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2 sidebar-setting">Sidebar Color</h6>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-light" defaultValue="light" onChange={() => document.body.setAttribute('data-sidebar', 'light')} />
                                <label className="form-check-label" htmlFor="sidebar-color-light">Light</label>
                            </div>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-dark" defaultValue="dark" onChange={() => document.body.setAttribute('data-sidebar', 'dark')} />
                                <label className="form-check-label" htmlFor="sidebar-color-dark">Dark</label>
                            </div>
                            <div className="form-check sidebar-setting">
                                <input className="form-check-input" type="radio" name="sidebar-color" id="sidebar-color-brand" defaultValue="brand" onChange={() => document.body.setAttribute('data-sidebar', 'brand')} />
                                <label className="form-check-label" htmlFor="sidebar-color-brand">Brand</label>
                            </div>
                            <h6 className="mt-4 mb-3 pt-2">Direction</h6>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-direction" id="layout-direction-ltr" defaultValue="ltr" />
                                <label className="form-check-label" htmlFor="layout-direction-ltr">LTR</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="layout-direction" id="layout-direction-rtl" defaultValue="rtl" />
                                <label className="form-check-label" htmlFor="layout-direction-rtl">RTL</label>
                            </div>
                        </div>
                    </div> {/* end slimscroll-menu*/}
                </div>
                {/* /Right-bar */}
                {/* Right bar overlay*/}
                <div className="rightbar-overlay" />
            </div>


        </React.Fragment>
    )
}


const mapStateToProps = (state) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
