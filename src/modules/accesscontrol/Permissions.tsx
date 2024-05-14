import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall } from '../../api/apiService'
import { PERMISSION_P, CREATE_PERMISSION, UPDATE_PERMISSION, MODULE_ALL } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { Link } from 'react-router-dom';
import { permissionsResets, badge_colors } from '../../components/Helpers/CommonHelpers'
import Select from 'react-select'
import Badge from '../../components/Badges/Badge';
import INIT from '../../route/utils/Init';

function Permissions(props) {

    const breadcrumb = {
        pageTitle: 'Permissions',
        currentPath: '/permissions',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Access Control'
            },
            {
                title: 'Manage Permissions',
                default: 1
            }
        ]
    }

    const formInitial = {
        id: '',
        name: '',
        module_id: '',
        module_idSelectedOption: '',
        guard_name: 'web',
    }

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const [permissionsData, setPermissionsData] = useState({})
    const [paginator, setPaginator] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getPermissionsData = async (e, page = 1, search = '') => {
        setNoDataFound(false)

        setIsLoading(true)
        setPermissionsData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { page: page, search: search }
        const response = await postCall(PERMISSION_P, request, props.user.access_token)
        if (response?.code === 200) {
            setPermissionsData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if (response?.data?.data?.length == 0) { setNoDataFound(true); }
            else setNoDataFound(false)
        } else {
            toast.error(response?.message?.[0])
            setPermissionsData([]);
            setPaginator({});
            setIsLoading(false)
            setNoDataFound(true);
        }
    }




    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)

        getPermissionsData(null, undefined, undefined)
        getAllModules()
    }, [])

    const getApi = () => {
        if (formData?.id) {
            return UPDATE_PERMISSION
        }
        return CREATE_PERMISSION
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData, id: formData?.id }
        const api = getApi()
        const response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getPermissionsData(null, paginator?.current_page, undefined)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async (id) => {
        const permissionData = permissionsData.find((item) => {
            return item.id == id
        })

        const moduleData = moduleOptions?.find((item) => {
            return item?.value == permissionData?.module_id
        })

        setFormData((prev) => ({ ...prev, ...permissionData, id: id, module_id: moduleData?.value, module_idSelectedOption: moduleData }))
    }

    // search
    const [search, setSearch] = useState('')
    const handleKeyPressForSearch = (event) => {
        if (event.key === 'Enter') {
            getPermissionsData(null, null, search)
        }
    }

    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const clear = () => {
        setFormData(formInitial)
    }


    const getAllModules = async () => {
        const response = await postCall(MODULE_ALL, null, props?.user?.access_token)
        if (response?.code === 200) {
            const list = (response?.data?.modulelist || []).map((item) => {
                return { label: item?.name, value: item?.id }
            })

            setModuleOptions(list)
        }
    }

    // modules select process
    const [moduleOptions, setModuleOptions] = useState([])

    return (
        <Fragment>


            <div className="card col-12">

                <div className="card-block py-2 px-2">

                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">

                            {
                                props.permissions.includes('permission create') ?
                                    <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0" onClick={clear}>
                                        <i className="bx bx-plus label-icon"></i>
                                        Create New Permission
                                    </Link>
                                    :
                                    null
                            }
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
                                        <button className="btn btn-primary" type="submit" onClick={() => getPermissionsData(null, null, search)}><i className="bx bx-search-alt align-middle"></i></button>
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
                        permissionsData?.length > 0 ?
                            <Fragment>
                                <div className='table-responsive'>
                                    <table className="table table-custom-sm table-hover table-rounded table-striped border">
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
                                                <th>Serial</th>
                                                <th>Name</th>
                                                <th>Module</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                permissionsData.map((row, i) => {
                                                    return (
                                                        <tr key={'row-permission-' + i}>
                                                            <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>{row.name}</td>
                                                            <td>
                                                                {
                                                                    row?.module_id ?
                                                                        <Badge badgeValue={row?.module?.name} badgeClass={badge_colors[(row?.module_id - 1) % 5]} />
                                                                        : null
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    props.permissions.includes('permission update') ?
                                                                        <div className="form-inline" >
                                                                            <Link role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" to="#0" className="btn btn-icon btn-sm btn-active-light-primary"
                                                                                onClick={() => updateModalProcess(row.id)}
                                                                            >
                                                                                <span className="svg-icon svg-icon-3"><Svgediticoncomponent /></span>
                                                                            </Link>
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
                            <Paginate paginator={paginator} pagechanged={(page) => getPermissionsData(null, page)} /> : null
                    }


                </div>
            </div>



            <div className="modal fade modal-backdrop-static" id="saveConfirmationModal" tabIndex="-1" aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} Permission</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={() => setFormData(formInitial)} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ height: "0", width: "0" }} />

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
                                            <label className="col-sm-4 col-form-label control-label" >Module<Validation.RequiredStar /></label>
                                            <div className="col-md-8">
                                                <Select
                                                    options={moduleOptions}
                                                    value={formData?.module_idSelectedOption}
                                                    onChange={(option) =>
                                                        setFormData((prev) => ({ ...prev, module_id: option?.value, module_idSelectedOption: option }))
                                                    }
                                                    isClearable
                                                    placeholder='Select Module'
                                                />
                                            </div>
                                        </div>
                                    </div>


                                    <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Guard name, Ex:web" value={formData?.guard_name} onChange={handleChange} required hidden />

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
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Permissions));

