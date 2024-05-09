import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall } from '../../api/apiService'
import { SINGLE_USER_INFO, UPDATE_PROFILE } from '../../api/apiPath'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets } from '../../components/Helpers/CommonHelpers'
import { Link } from 'react-router-dom';
import ProfileDetails from '../../components/Project/ProfileDetails'
import INIT from '../../route/utils/Init';

function Profile(props) {

    const breadcrumb = {
        pageTitle: 'Profile',
        currentPath: '/profile',
        layers: [
            {
                title: 'Dashboard',
                link: props?.user?.force_password == 0 ? '/dashboard' : null
            },
            {
                title: 'Profile',
                default: 1
            }
        ]
    }


    const formInitial = {
        id: '',
        name: '',
        email: '',
    }


    const [userData, setUserData] = useState()
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const request = { ...formData, id: formData?.id }
        const api = UPDATE_PROFILE
        const response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getUser(null, true)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const getUser = async (e, reload = false) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const response = await postCall(SINGLE_USER_INFO, { id: props?.user?.userId }, props.user.access_token)
        if (response?.code === 200) {
            // console.log(response)
            const userData = response?.data

            setUserData(userData)
            setFormData({ ...formInitial, name: userData?.name, id: userData?.id })
            if (userData?.force_password == 0 && reload) {
                window.location.reload();
            }
        } else {
            // console.log(response)
            toast.error(response?.message?.[0])
        }
    }

    useEffect(() => {
        INIT()
        permissionsResets(props, { checkPermissionsWiseRouteChecker: false })
        props.setPageBreadcrumb(breadcrumb)
        getUser(null, undefined)
    }, [])


    const updateModalProcess = async () => {
        setFormData({ ...formInitial, name: userData?.user?.name, id: userData?.user?.userId })
    }


    return (
        <Fragment>


            {
                props?.user?.force_password != 0
                    ?
                    <div className="alert alert-danger d-flex align-items-center p-5">
                        <span className="svg-icon svg-icon-2hx svg-icon-danger me-4 mb-5 mb-sm-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3" d="M20.5543 4.37824L12.1798 2.02473C12.0626 1.99176 11.9376 1.99176 11.8203 2.02473L3.44572 4.37824C3.18118 4.45258 3 4.6807 3 4.93945V13.569C3 14.6914 3.48509 15.8404 4.4417 16.984C5.17231 17.8575 6.18314 18.7345 7.446 19.5909C9.56752 21.0295 11.6566 21.912 11.7445 21.9488C11.8258 21.9829 11.9129 22 12.0001 22C12.0872 22 12.1744 21.983 12.2557 21.9488C12.3435 21.912 14.4326 21.0295 16.5541 19.5909C17.8169 18.7345 18.8277 17.8575 19.5584 16.984C20.515 15.8404 21 14.6914 21 13.569V4.93945C21 4.6807 20.8189 4.45258 20.5543 4.37824Z" fill="black"></path>
                                <path d="M10.5606 11.3042L9.57283 10.3018C9.28174 10.0065 8.80522 10.0065 8.51412 10.3018C8.22897 10.5912 8.22897 11.0559 8.51412 11.3452L10.4182 13.2773C10.8099 13.6747 11.451 13.6747 11.8427 13.2773L15.4859 9.58051C15.771 9.29117 15.771 8.82648 15.4859 8.53714C15.1948 8.24176 14.7183 8.24176 14.4272 8.53714L11.7002 11.3042C11.3869 11.6221 10.874 11.6221 10.5606 11.3042Z" fill="black"></path>
                            </svg>
                        </span>
                        <div className="d-flex flex-column pe-0">
                            <h5 className="mb-1 text-danger">Password Change Alert</h5>
                            <span>
                                You must change your password first!

                                <Link className="fw-bolder ms-2"
                                    role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Change Password" to="#0"
                                    onClick={updateModalProcess}
                                >Change Password</Link>

                            </span>

                        </div>

                    </div>
                    : null
            }





            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm order-2 order-sm-1">
                                    <div className="d-flex align-items-start mt-3 mt-sm-0">
                                        <div className="flex-shrink-0">
                                            <div className="avatar-xl me-3">
                                                <img src="assets/images/users/avatar-2.png" alt="avatar" className="img-fluid rounded-circle d-block" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <div>
                                                <h5 className="font-size-16 mb-1">{userData?.name}</h5>
                                                {/* <p className="text-muted font-size-13">Full Stack Developer</p> */}
                                                <div className="d-flex flex-wrap align-items-start gap-2 gap-lg-3 text-muted font-size-13">
                                                    <div><i className="mdi mdi-email me-1 text-success align-middle" />{userData?.email}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-auto order-1 order-sm-2">
                                    <div className="d-flex align-items-start justify-content-end gap-2">
                                        <div>
                                            <Link className="btn btn-primary waves-effect btn-label waves-light"
                                                role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" to="#0" modal-backdrop="static" data-keyboard="false"
                                                onClick={updateModalProcess}
                                            >
                                                <i className="bx bx-pencil label-icon"></i> Edit Profile
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul className="nav nav-tabs-custom card-header-tabs border-top mt-4" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link px-3 active" data-bs-toggle="tab" href="#overview" role="tab">Overview</a>
                                </li>

                            </ul>
                        </div>
                        {/* end card body */}
                    </div>
                    {/* end card */}
                    <div className="tab-content">
                        <div className="tab-pane active" id="overview" role="tabpanel">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">About</h5>
                                </div>
                                <div className="card-body">
                                    <div>
                                        <div className="pb-0">
                                            <div className="row">
                                                <div className="col-xl">
                                                    <ProfileDetails userId={props?.user?.userId} token={props?.user?.access_token} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* end card body */}
                            </div>
                            {/* end card */}

                        </div>
                        {/* end tab pane */}

                    </div>
                    {/* end tab content */}
                </div>
                {/* end col */}

            </div>


            <div className="modal fade " id="saveConfirmationModal" tabIndex="-1" aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header  py-4">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>Profile Update</p>
                            <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ heigh: "0", width: "0" }} />

                                    <div className="col-md-12 my-0">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="" value={formData?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator separator-content my-15"><span className="w-250px">Change Password</span></div>

                                    <div className="col-md-12 my-0">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Current Password<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="current_password" name="current_password" placeholder="Current Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-0">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">New Password<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="new_password" name="new_password" placeholder="New Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-0">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">New Confirm Password<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="new_confirm_password" name="new_confirm_password" placeholder="New Confirm Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={() => setFormData(formInitial)} id="modalclosebtn">Cancel</button>
                                        <button type="submit" className="btn btn-sm btn-primary" id="formSubmit">Save</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Profile));

