import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import Select from 'react-select'
import { postCall } from '../../api/apiService'
import { USERS, ROLES_ALL, CREATE_USER, UPDATE_USER, SINGLE_USER_INFO } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets, capitalizeFirstLetter } from '../../components/Helpers/CommonHelpers.js'
import ProfileDetailsModal from '../../components/Project/ProfileDetailsModal';
import INIT from '../../route/utils/Init';
import { Link } from 'react-router-dom';

function Users(props) {

    const breadcrumb = {
        pageTitle: 'Users',
        currentPath: '/users',
        layers: [
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
    const [paginator, setPaginator] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getUsersData = async (e, page = 1, search = '') => {
        setNoDataFound(false)

        setIsLoading(true)
        setUsersData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let request = { page: page, search: search }
        const response = await postCall(USERS, request, props.user.access_token)
        if (response?.code === 200) {
            setUsersData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if (response?.data?.data?.length == 0) { setNoDataFound(true); }
            else setNoDataFound(false)
        } else {
            toast.error(response?.message?.[0])
            setUsersData([]);
            setPaginator({});
            setIsLoading(false)
            setNoDataFound(true);
        }

    }

    // role select process
    const [rolesOptions, setRolesOptions] = useState([])
    const [roleSelectedOption, setRoleSelectedOption] = useState('')
    const roleHandle = (value) => {
        setRoleSelectedOption(value)
    }

    const handleRoleMultipleSelect = (val) => {
        setRoleSelectedOption(val)
    }
    const handleRoleMultipleSelectAfter = () => {
        if (roleSelectedOption) {
            const roles = roleSelectedOption?.map((role) => {
                return role.value
            })
            setFormData({ ...formData, roles: roles })
        }
    }



    useEffect(() => {
        handleRoleMultipleSelectAfter()
    }, [roleSelectedOption])

    const getRoles = async () => {
        const response = await postCall(ROLES_ALL, null, props?.user?.access_token)
        if (response?.code === 200) {
            const rolesData = (response?.data?.rolelist || []).map((role) => {
                return { label: capitalizeFirstLetter(role?.name || ''), value: role?.name }
            })
            setRolesOptions(rolesData || [])
        }
    }


    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)
        getRoles()
        getUsersData()

    }, [])


    const getApi = () => {
        if (formData?.id) {
            return UPDATE_USER
        }
        return CREATE_USER
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData, id: formData?.id }
        const api = getApi()
        const response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getUsersData(null, paginator?.current_page)
            setFormData(formInitial)
            setRoleSelectedOption('')
            toast.success(response?.message?.[0])
            closeDialog()

        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async (id) => {
        const userData = usersData.filter((item) => {
            return item.id == id
        })[0]
        setFormData({ ...formData, ...userData, id: id, password: '' })

        // get roles for single user
        const response = await postCall(SINGLE_USER_INFO, { id: id }, props.user.access_token)
        if (response?.code === 200) {
            const rolesOptions = (response?.data?.roles_names_array).map((role) => {
                return { label: capitalizeFirstLetter(role || ''), value: role }
            })
            setRoleSelectedOption(rolesOptions)
        }
    }


    useEffect(() => {
        if (formData?.roles?.length == 0 || (formData?.roles?.length == 1 && formData?.roles[0] == null)) {
            setFormData({ ...formData, roles: '' })
            setRoleSelectedOption('')
        }
    }, [formData?.roles])

    // search
    const [search, setSearch] = useState('')
    const handleKeyPressForSearch = (event) => {
        if (event.key === 'Enter') {
            getUsersData(null, null, search)
        }
    }


    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const clear = () => {
        setFormData(formInitial)
        setRoleSelectedOption(null)
    }


    // profile detail modal component related
    const [profileDetailModalUserId, setProfileDetailModalUserId] = useState('')
    const [profiledetail_row_id, setProfiledetail_row_id] = useState('')
    const profileDetailModalUpdate = (userId = '', row_id = '') => {
        setProfileDetailModalUserId(userId)
        setProfiledetail_row_id(row_id)
    }

    return (
        <Fragment>


            <div className="card col-12">


                <div className="card-block py-2 px-2">

                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">
                            {props.permissions.includes('user create') && (
                                <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0" onClick={clear}>
                                    <i className="bx bx-plus label-icon"></i>
                                    Create New User
                                </Link>
                            )}
                        </div>
                        <div className="col col-12 col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 mt-2">
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={handleKeyPressForSearch}
                                        value={search}
                                        placeholder="Search..."
                                        className="form-control"
                                        style={{ backgroundColor: '#f3f3f9', border: 'none', padding: '0 10px' }}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" onClick={() => getUsersData(null, null, search)}><i className="bx bx-search-alt align-middle"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>






                    {
                        isLoading || noDataFound ?
                            <div className="row col-12" style={{ marginTop: "50px" }}>
                                {
                                    isLoading ?
                                        <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height: "70px" }} alt="Loading..." ></div>
                                        : null
                                }
                                {
                                    noDataFound ?
                                        <div className="text-center">
                                            <span className="badge badge-soft-danger" style={{ fontSize: "18px" }}>No Data Found!</span>
                                        </div>
                                        : null
                                }
                            </div> : null
                    }

                    {
                        usersData?.length > 0 ?
                            <Fragment>

                                <div className='table-responsive'>
                                    <table className="table table-custom-sm table-hover table-rounded table-striped border">
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
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
                                                        <tr key={'row-' + i}>
                                                            <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>
                                                                <ProfileDetailsModal
                                                                    token={props?.user?.access_token}
                                                                    text={row.name}
                                                                    profiledetail_row_id={i}
                                                                    userId_row={row?.id}
                                                                    userId={(i == profiledetail_row_id) ? profileDetailModalUserId : ''}
                                                                    profileDetailModalUpdate={profileDetailModalUpdate}
                                                                    key={'profile-details-modal-' + i}
                                                                />
                                                            </td>
                                                            <td>{row.email}</td>
                                                            <td>{row.roles_comma_seperated}</td>
                                                            <td>
                                                                <span className={'badge rounded-pill font-size-12 fw-medium ' + (row?.status == 1 ? ' bg-soft-success text-success' : 'bg-soft-danger text-danger')}>{row?.status == 1 ? 'Active' : 'Inactive'}</span>
                                                            </td>
                                                            <td>
                                                                {
                                                                    props.permissions.includes('user update') ?
                                                                        <div className="form-inline" >
                                                                            <a role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" href="#0" className="btn btn-icon btn-sm btn-active-light-primary"
                                                                                onClick={() => updateModalProcess(row.id)}
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
                                </div>


                            </Fragment>
                            : null
                    }

                    {
                        paginator?.total_pages > 1 ?
                            <Paginate paginator={paginator} pagechanged={(page) => getUsersData(null, page)} /> : null
                    }

                </div>
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex="-1" aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} User</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={() => setFormData(formInitial)} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ heigh: "0", width: "0" }} />

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Name" value={formData?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Email<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="email" className="form-control form-control-sm form-control-solid" id="email" name="email" placeholder="Email" value={formData?.email} onChange={handleChange} required={formData?.id ? false : true} readOnly={formData?.id ? true : false} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">
                                                Password{formData?.id ? '' : <Validation.RequiredStar />}
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="password" name="password" placeholder="Password" value={formData?.password} onChange={handleChange} required={formData?.id ? false : true} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Status<Validation.RequiredStar /></label>
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
                                            <label className="col-sm-4 col-form-label control-label">Roles<Validation.RequiredStar /></label>
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
    permissions: state.permissions,
});

const mapDispatchToProps = (dispatch) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Users));

