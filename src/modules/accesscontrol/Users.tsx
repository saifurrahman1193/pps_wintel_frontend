import React, { useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux'
import Validation  from '../../components/Forms/Validation.js';
import Select from 'react-select'
import { postCall } from '../../api/apiService'
import { USERS, ROLES_ALL, CREATE_USER, UPDATE_USER, SINGLE_USER_INFO } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import Svgsearchiconcomponent from '../../components/Icons/Svgsearchiconcomponent'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import Badge  from '../../components/Badges/Badge';
import { permissionsResets, createAuditLog, userAgent } from '../../components/Helpers/CommonHelpers.js'
import { Link } from 'react-router-dom';
import ProfileDetailsModal from '../../components/Project/ProfileDetailsModal';

function Users(props) {

    const breadcrumb = {
        pageTitle: 'Users',
        currentPath: '/users',
        layers:[
            {
                title: 'Home',
                link: '/'
            },
            {
                title: 'Access Control'
            },
            {
                title: 'Manage Users',
                default: 1
            }
        ]
    }

    const formInitial = {
        id: '',
        name: '',
        email: '',
        password: '',
        status: 1,
        roles: [],
    }
    
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const [usersData, setUsersData] = useState({})
    var [paginator, setPaginator] =  useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getUsersData = async (e, page=1, search='') => {
        setNoDataFound(false)

        setIsLoading(true)
        setUsersData([])
        if (e && e.preventDefault) { 
            e.preventDefault();
        }
        let request = {page:page, search:search}
        var response = await postCall(USERS, request, props.user.access_token)
        if (response?.code === 200) {
            setUsersData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if(response?.data?.data?.length==0) { setNoDataFound(true); }
            else setNoDataFound(false)
        } else {
            toast.error(response?.message?.[0])
            setUsersData([]);
            setPaginator({});
            setIsLoading(false)
            setNoDataFound(true);
        }

        createAuditLog(props, {log_type_id:3, hit_map:'user list', page:breadcrumb?.pageTitle, page_url:window.location.href, user_agent:userAgent, api_path: process.env.REACT_APP_API_BASE_URL+USERS, api_request: JSON.stringify(request), api_response: JSON.stringify(response) })
    }

    // role select process
    const [rolesOptions, setRolesOptions] = useState([])
    const [roleSelectedOption, setRoleSelectedOption] = useState('')
    const roleHandle = (value) =>{
        setRoleSelectedOption(value)
    }

    const handleRoleMultipleSelect = (val) => {
        setRoleSelectedOption(val)
    }
    const handleRoleMultipleSelectAfter = () => {
        if (roleSelectedOption) {
            var roles = roleSelectedOption?.map((role) => {
                return role.value
            })
            setFormData({...formData, roles: roles})
        }
    } 

    

    useEffect(() => {
        handleRoleMultipleSelectAfter()        
    }, [roleSelectedOption])

    const getRoles = async () => {        
        var response = await postCall(ROLES_ALL , null, props.user.access_token)
        if (response?.code === 200) {
            var rolesData = (response?.data?.rolelist).map((role) => {
                return { label: role.name.capitalize(), value: role.name  }
            })
            setRolesOptions(rolesData || [])
        } else {
        }
    }


    useEffect(() => {
        permissionsResets(props)
        createAuditLog(props, {log_type_id:3, hit_map:'page', page:breadcrumb?.pageTitle, page_url:window.location.href, user_agent:userAgent })
        props.setPageBreadcrumb(breadcrumb)
        getRoles()
        getUsersData()
    }, [])
    

    const getApi = () => {
        if(formData?.id){
            return UPDATE_USER
        }
        return CREATE_USER
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) { 
            e.preventDefault();
        }
        let request = {...formData, id:formData?.id}
        let api = getApi()
        var response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getUsersData(null, paginator?.current_page)
            setFormData(formInitial)
            setRoleSelectedOption('')
            toast.success(response?.message?.[0])
            closeDialog()

        } else {
            toast.error(response?.message?.[0])
        }
        createAuditLog(props, {log_type_id:3, hit_map:`${formData?.id ?  'update' : 'create'} user`, page:breadcrumb?.pageTitle, page_url:window.location.href, user_agent:userAgent, api_path: process.env.REACT_APP_API_BASE_URL+api, api_request: JSON.stringify(request), api_response: JSON.stringify(response) })
    }

    const updateModalProcess = async(id) => {
        var userData = usersData.filter((item) => {
            return item.id==id
        })[0]
        setFormData({...formData, ...userData, id: id, password: ''})

        // get roles for single user
        var response = await postCall(SINGLE_USER_INFO, {id: id}, props.user.access_token)
        if (response?.code===200) {
            var rolesOptions = (response?.data?.roles_names_array).map((role) => {
                return { label: role?.capitalize(), value: role }
            })
            setRoleSelectedOption(rolesOptions)
        }
    }


    useEffect(() => {
        if (formData?.roles?.length==0 || (formData?.roles?.length==1 &&  formData?.roles[0]==null)) {
            setFormData({...formData, roles: ''})
            setRoleSelectedOption('')
        }
    }, [formData?.roles])

    // search
    const [search, setSearch] = useState('')
    const handleKeyPressForSearch = (event) => {
        if(event.key === 'Enter'){
            getUsersData(null, null, search)
        }
    }


    const closeDialog = () =>  {
        let modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn.click();
    }

    const clear = () => {
        setFormData(formInitial)
        setRoleSelectedOption(null)
    }


    // profile detail modal component related
    const [profileDetailModalUserId, setProfileDetailModalUserId] = useState('')
    const [profiledetail_row_id, setProfiledetail_row_id] = useState('')
    const profileDetailModalUpdate = (userId='', row_id='') => {
        setProfileDetailModalUserId(userId)
        setProfiledetail_row_id(row_id)
    }

    return (
        <Fragment>


            <div className="card col-12">

       
                <div className="card-block py-5 px-2">
                    {
                        props.permissions.includes('user create') ?
                                <a className="btn btn-sm btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" href="#0" onClick={clear}>
                                    <i className="icofont icofont-ui-add me-1"></i>
                                    Create New User
                                </a>
                        :
                        null
                    }


                    <div className="col-md-4 input-group mb-3 float-right w-lg-400px">
                        <input type="text" id="search" name="search" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPressForSearch} value={search} placeholder="Search..." className="form-control form-control-sm form-control-solid h-38px bg-body fs-7 "  />
                        <div className="input-group-append">
                            <Link className="input-group btn btn-primary"  onClick={() => getUsersData(null, null, search)} style={{ borderRadius: '0', padding: '9px'}}>
                                <Svgsearchiconcomponent />
                            </Link>
                        </div>
                    </div>

                    

                    

                    {
                        isLoading || noDataFound ? 
                        <div className="row col-12" style={{marginTop: "100px"}}>
                                {
                                    isLoading ?
                                    <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height:"70px"}} alt="Loading..." ></div>
                                    : null
                                }
                                {
                                    noDataFound ?
                                    <div className="mx-auto">
                                        <label className="badge badge-inverse-warning label-lg label" style={{fontSize: "18px"}} >No Data Found!</label>
                                    </div>
                                    : null
                                }
                        </div>: null
                    }

                    {
                        usersData?.length > 0 ?
                            <Fragment>

                                

                                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                                    <thead>
                                        <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                            <th>Serial</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Roles</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {
                                            usersData.map((row, i) => {
                                                return (
                                                    <tr key={'row-'+i}>
                                                        <td>{ paginator?.current_page>1 ? ((paginator?.current_page-1)*paginator?.record_per_page)+i+1 :  i+1 }</td>
                                                        <td>
                                                            <ProfileDetailsModal 
                                                                token={props?.user?.access_token}
                                                                text={row.name} 
                                                                profiledetail_row_id={i}
                                                                userId_row={row?.id}
                                                                userId={(i == profiledetail_row_id) ? profileDetailModalUserId : '' }
                                                                profileDetailModalUpdate={profileDetailModalUpdate}
                                                                key={'profile-details-modal-'+i}
                                                            />
                                                        </td>
                                                        <td>{row.email}</td>
                                                        <td>{row.roles_comma_seperated}</td>
                                                        <td><Badge badgeClass={row?.status==1?'badge-light-success':'badge-light-danger'} badgeValue={row?.status==1?'Active':'Inactive'} /></td>
                                                        <td>
                                                            {
                                                                props.permissions.includes('user update') ?
                                                                    <div className="form-inline" > 
                                                                        <a role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" href="#0" className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                                                                            onClick={()=>updateModalProcess(row.id)}
                                                                        >
                                                                            <span className="svg-icon svg-icon-3"><Svgediticoncomponent /></span>
                                                                        </a> 
                                                                    </div>
                                                                    :
                                                                    null
                                                            }

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </Fragment>
                        : null
                    }

                    {
                        paginator?.total_pages>1 ? 
                        <Paginate paginator={paginator} pagechanged={(page) => getUsersData(null, page )} /> : null
                    }

                </div>                    
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex="-1"  aria-labelledby="saveConfirmationModal" aria-hidden="true"   data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header  py-4">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{flex: "auto"}}>{formData?.id ? 'Update': 'Create New' } User</p>
                            <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => setFormData(formInitial)}>
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-0" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange}  readOnly hidden  style={{heigh: "0", width: "0"}}/>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Name" value={formData?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Email<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="email" className="form-control form-control-sm form-control-solid" id="email" name="email" placeholder="Email"  value={formData?.email} onChange={handleChange} required={formData?.id ? false : true } readOnly={formData?.id ? true : false} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">
                                                Password{formData?.id ? '': <Validation.RequiredStar/> }
                                                </label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="password" name="password" placeholder="Password" value={formData?.password} onChange={handleChange} required={formData?.id ? false : true} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Status<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <select className="form-control form-control-sm" id="status" name="status" onChange={handleChange} value={formData?.status} required>
                                                    <option value="0">Inactive</option>
                                                    <option value="1">Active</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Roles<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <Select options={rolesOptions} 
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                isMulti
                                                isClearable
                                                value={roleSelectedOption} 
                                                onChange={handleRoleMultipleSelect} 
                                                placeholder="Select Roles" 
                                                isOptionDisabled={() => roleSelectedOption.length >= 1}
                                                />
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
    permissions: state.permissions,
});

const mapDispatchToProps = (dispatch) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users));
