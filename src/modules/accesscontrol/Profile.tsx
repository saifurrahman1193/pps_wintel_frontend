import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall } from '../../api/apiService'
import { SINGLE_USER_INFO, UPDATE_PROFILE, MODULE_ALL } from '../../api/apiPath'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets, createAuditLog, userAgent } from '../../components/Helpers/CommonHelpers'
import { Link } from 'react-router-dom';
import ProfileDetails from '../../components/Project/ProfileDetails'

function Profile(props) {

    const breadcrumb = {
        pageTitle: 'Profile',
        currentPath: '/profile',
        layers: [
            {
                title: 'Home',
                link: props?.user?.force_password == 0 ? '/' : null
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

        let request = { ...formData, id: formData?.id }
        let api = UPDATE_PROFILE
        var response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getUser(null, true)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
        createAuditLog(props, { hit_map: `Profile update`, page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent, api_path: process.env.REACT_APP_API_BASE_URL + UPDATE_PROFILE, api_request: JSON.stringify(request), api_response: JSON.stringify(response) })
    }

    const closeDialog = () =>  {
        let modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn.click();
    }


    const getUser = async (e, reload = false) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        var response = await postCall(SINGLE_USER_INFO, {id:props?.user?.userId}, props.user.access_token)
        if (response?.code === 200) {
            // console.log(response)
            var userData = response?.data

            setUserData(userData)
            setFormData({...formInitial, name:userData?.name, id:userData?.id})
            if (userData?.force_password == 0 && reload) {
                window.location.reload();
            }
        } else {
            // console.log(response)
            toast.error(response?.message?.[0])
        }
        createAuditLog(props, { hit_map: 'me data', page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent, api_path: process.env.REACT_APP_API_BASE_URL + SINGLE_USER_INFO, api_response: JSON.stringify(response) })
    }

    useEffect(() => {
        createAuditLog(props, { hit_map: 'page', page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent })
        permissionsResets(props, {checkPermissionsWiseRouteChecker:false})
        props.setPageBreadcrumb(breadcrumb)
        getUser()
    }, [])


    const updateModalProcess = async() => {
        setFormData({...formInitial, name:userData?.user?.name, id:userData?.user?.userId})
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
                                    role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Change Password" href="#0" 
                                    onClick={updateModalProcess}
                                >Change Password</Link>
                                
                            </span>
                            
                        </div>
                       
                    </div>
                    : null
            }


            <div className="card mb-5 mb-xl-10">
                <div className="card-body pt-9 pb-0">
                    <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                        <div className="me-7 mb-4">
                            <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                                <img src="assets/media/logos/user-logo.png" alt="pic" />
                                <div className="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px" />
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                                <div className="d-flex flex-column">
                                    <div className="d-flex align-items-center mb-2">
                                        <Link className="text-gray-900 text-hover-primary fs-2 fw-bolder me-1">
                                            {userData?.name}
                                        </Link>
                                        
                                    </div>
                                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                                        <Link className="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2">
                                            <span className="svg-icon svg-icon-4 me-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path opacity="0.3" d="M22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12ZM12 7C10.3 7 9 8.3 9 10C9 11.7 10.3 13 12 13C13.7 13 15 11.7 15 10C15 8.3 13.7 7 12 7Z" fill="black" />
                                                    <path d="M12 22C14.6 22 17 21 18.7 19.4C17.9 16.9 15.2 15 12 15C8.8 15 6.09999 16.9 5.29999 19.4C6.99999 21 9.4 22 12 22Z" fill="black" />
                                                </svg>
                                            </span>
                                            {userData?.roles[0]}
                                        </Link>
                                        
                                        <Link href="#" className="d-flex align-items-center text-gray-400 text-hover-primary mb-2">
                                            <span className="svg-icon svg-icon-4 me-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path opacity="0.3" d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z" fill="black" />
                                                    <path d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z" fill="black" />
                                                </svg>
                                            </span>
                                            {userData?.email}
                                        </Link>
                                    </div>
                                </div>
                    
                            </div>
                            <div className="d-flex flex-wrap flex-stack">
                                <div className="d-flex flex-column flex-grow-1 pe-8">
                                    <div className="d-flex flex-wrap">

                                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                                            <div className="d-flex align-items-center">
                                                <span className="svg-icon svg-icon-3 svg-icon-success me-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <rect opacity="0.5" x={13} y={6} width={13} height={2} rx={1} transform="rotate(90 13 6)" fill="black" />
                                                        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="black" />
                                                    </svg>
                                                </span>
                                                <div className="fs-2 fw-bolder" data-kt-countup="true" data-kt-countup-value={userData?.permissions?.length} data-kt-countup-prefix=""
                                                >
                                                    {userData?.permissions?.length}
                                                </div>
                                            </div>
                                            <div className="fw-bold fs-6 text-gray-400">Permissions</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link  className="btn btn-primary align-self-center"
                            role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" href="#0"   modal-backdrop="static" data-keyboard="false" 
                            onClick={updateModalProcess}
                        >
                            Edit Profile
                        </Link>
                    </div>
                    <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                        <li className="nav-item mt-2">
                            <Link className="nav-link text-active-primary ms-0 me-10 py-5 active" >Overview</Link>
                        </li>
                    </ul>
                    
                </div>


                <div >
                    <div className="card-header cursor-pointer">
                        <div className="card-title m-0">
                            <h3 className="fw-bolder m-0">Profile Details</h3>
                        </div>
                    </div>

                    <ProfileDetails userId={props?.user?.userId} token={props?.user?.access_token}/>
                </div>

                
            </div>







            <div className="modal fade " id="saveConfirmationModal" tabIndex="-1"  aria-labelledby="saveConfirmationModal" aria-hidden="true"  data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header  py-4">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{flex: "auto"}}>Profile Update</p>
                            <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange}  readOnly hidden  style={{heigh: "0", width: "0"}}/>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="" value={formData?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator separator-content my-15"><span className="w-250px">Change Password</span></div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Current Password<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="current_password" name="current_password" placeholder="Current Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">New Password<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="new_password" name="new_password" placeholder="New Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">New Confirm Password<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="new_confirm_password" name="new_confirm_password" placeholder="New Confirm Password" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={() => setFormData(formInitial)}  id="modalclosebtn">Cancel</button>
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

