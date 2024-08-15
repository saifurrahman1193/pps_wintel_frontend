import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import Select from 'react-select'
import { postCall } from '../../api/apiService'
import { USERS, FILTER_DATA, CREATE_USER, UPDATE_USER, SINGLE_USER_INFO } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
import ProfileDetailsModal from '../../components/Project/ProfileDetailsModal';
import INIT from '../../route/utils/Init';
import { Link } from 'react-router-dom';

function Users(props) {

    const breadcrumb = {
        pageTitle: 'Users',
        currentPath: '/users',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
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
        filter: {
            brand_list: [],
            role_list: [],
            status_list: [
                { label: 'Inactive', value: 0 },
                { label: 'Active', value: 1 },
            ]
        },
        form: {
            data: {
                id: '',
                name: '',
                email: '',
                password: '',
                status: 1,
                statusSelectedOption: { label: 'Active', value: 1 },
                role_ids: [],
                rolesSelectedOptions: null,
            },
            errors: null
        },
        table: {
            data: null,
            paginator: null,
            loading: false,
            empty: true,
            sort: {
                column: null,
                table: null,
                order: null,
            }
        },
    }

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            form: {
                ...prev?.form,
                data: {
                    ...prev?.form?.data,
                    [e.target.name]: e.target.value
                }
            }
        }))
    }

    const getTableData = async (e, page = 1, search = '', sort = null) => {
        setFormData((prev) => ({ ...prev, table: { ...prev?.table, sort, data: null, paginator: null, loading: true, empty: true } }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { page: page, search: search }
        const response = await postCall(USERS, request, props.user.access_token)
        if (response?.code === 200) {
            let empty = (response?.data?.data?.length == 0) ? true : false
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: response?.data?.data, paginator: response?.data?.paginator, loading: false, empty } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: null, paginator: null, loading: false, empty: false } }))
        }

    }

    const getFilterList = async () => {
        const response = await postCall(FILTER_DATA, null, props?.user?.access_token)
        if (response?.code === 200) {
            setFormData((prev) => ({
                ...prev,
                filter: response?.data
            }))
        }
    }

    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)
        getFilterList()
        getTableData(null, undefined, undefined, null)
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
            getTableData(null, formData?.table?.paginator?.current_page, undefined, null)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async (id) => {
        // const userData = usersData.filter((item) => {
        //     return item.id == id
        // })[0]
        // setFormData((prev) => ({ ...prev, ...userData, id: id, password: '' }))

        // // get roles for single user
        const response = await postCall(SINGLE_USER_INFO, { id: id }, props.user.access_token)
        if (response?.code === 200) {
            // const selected_options = (response?.data?.roles || []).map((role) => {
            //     return { label: role?.role_name, value: parseInt(role?.role_id) }
            // })

            // setFormData((prev) => ({ ...prev, role_ids: response?.data?.roles?.map(item => parseInt(item?.role_id)), rolesSelectedOptions: selected_options }))
            setFormData((prev) => ({ ...prev, form: {...prev?.form, data: response?.data} }))
        }

    }


    useEffect(() => {
        if (formData?.roles?.length == 0 || (formData?.roles?.length == 1 && formData?.roles[0] == null)) {
            setFormData((prev) => ({ ...prev, role_ids: '' }))
        }
    }, [formData?.roles])

    // search
    const [search, setSearch] = useState('')
    const handleKeyPressForSearch = (event) => {
        if (event.key === 'Enter') {
            getTableData(null, null, search, null)
        }
    }


    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const formClear = () => {
        setFormData((prev) => ({ ...prev, form: formInitial?.form }))
    }


    // profile detail modal component related
    const [profileDetailModalUserId, setProfileDetailModalUserId] = useState('')
    const [profiledetail_row_id, setProfiledetail_row_id] = useState('')
    const profileDetailModalUpdate = (userId = '', row_id = '') => {
        setProfileDetailModalUserId(userId)
        setProfiledetail_row_id(row_id)
    }

    

    const handleSortChange = (column: any, table: any, order: any) => {
        setFormData((prev) => ({ ...prev, table: { ...prev.table, sort: { column, table, order } } }))
        getTableData(null, null, { column, table, order }, null)
    };

    return (
        <Fragment>
            <div className="card col-12">
                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">
                            {props.permissions.includes('user create') && (
                                <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0" onClick={formClear}>
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
                                        <button className="btn btn-primary" onClick={() => getTableData(null, undefined, search, null)}><i className="bx bx-search-alt align-middle"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        formData?.table?.loading || formData?.table?.empty ?
                            <div className="row col-12" style={{ marginTop: "50px" }}>
                                {
                                    formData?.table?.loading ?
                                        <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height: "70px" }} alt="Loading..." ></div>
                                        : null
                                }
                                {
                                    !formData?.table?.loading && formData?.table?.empty ?
                                        <div className="text-center">
                                            <span className="badge badge-soft-danger" style={{ fontSize: "18px" }}>No Data Found!</span>
                                        </div>
                                        : null
                                }
                            </div> : null
                    }

                    {
                        formData?.table?.data?.length > 0 ?
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
                                                formData?.table?.data?.map((row, i) => {
                                                    return (
                                                        <tr key={'table-row-' + i}>
                                                            <td>{formData?.table?.paginator?.current_page > 1 ? ((formData?.table?.paginator?.current_page - 1) * formData?.table?.paginator?.record_per_page) + i + 1 : i + 1}</td>
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
                                                            <td>
                                                                {
                                                                    [...row?.roles]?.map((role, role_i) => {
                                                                        return <span key={'table-row-' + i + '-role-' + role_i} className="badge rounded-pill font-size-12 fw-medium mx-1 bg-light">{role?.name}</span>;
                                                                    })
                                                                }
                                                            </td>
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
                        formData?.table?.paginator?.total_pages > 1 ?
                            <Paginate paginator={formData?.table?.paginator} pagechanged={(page) => getTableData(null, page, formData?.table?.sort, null)} /> : null
                    }
                </div>
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex="-1" aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} User</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={formClear} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ height: "0", width: "0" }} />

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Name" value={formData?.form?.data?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Email<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="email" className="form-control form-control-sm form-control-solid" id="email" name="email" placeholder="Email" value={formData?.form?.data?.email} onChange={handleChange} required={formData?.form?.data?.id ? false : true} readOnly={formData?.form?.data?.id ? true : false} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">
                                                Password{formData?.form?.data?.id ? '' : <Validation.RequiredStar />}
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" id="password" name="password" placeholder="Password" value={formData?.form?.data?.password} onChange={handleChange} required={formData?.form?.data?.id ? false : true} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Status<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.status_list} value={formData?.form?.data?.statusSelectedOption}
                                                    onChange={(option) =>
                                                        setFormData((prev) => ({ ...prev, data:{...prev?.data, status: option?.value, statusSelectedOption: option} }))
                                                    }
                                                    isClearable placeholder="Select Status" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Roles<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.role_list}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    isMulti
                                                    isClearable
                                                    value={formData?.form?.data?.rolesSelectedOptions}
                                                    onChange={(selected_options) => {
                                                        const roles = selected_options?.map((role) => {
                                                            return parseInt(role?.value)
                                                        })
                                                        setFormData((prev) => ({ ...prev, role_ids: roles, rolesSelectedOptions: selected_options }))
                                                    }}
                                                    placeholder="Select Roles"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer pt-2 pb-0">
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

