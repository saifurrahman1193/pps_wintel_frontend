import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import MultiColorBadges from '../../components/Badges/MultiColor';
import { postCall } from '../../api/apiService'
import { ROLES_P, CREATE_ROLE, UPDATE_ROLE, SINGLE_ROLE_INFO, MODULE_ALL } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets, createAuditLog, userAgent } from '../../components/Helpers/CommonHelpers'
import Checkbox from '../../components/Forms/Checkbox.js';

function Roles(props) {

    const breadcrumb = {
        pageTitle: 'Roles',
        currentPath: '/roles',
        layers: [
            {
                title: 'Home',
                link: '/'
            },
            {
                title: 'Access Control'
            },
            {
                title: 'Manage Roles',
                default: 1
            }
        ]
    }


    const formInitial = {
        id: '',
        name: '',
        guard_name: 'web',
        permissions: [],
        modules: [],
    }

    const [formData, setFormData] = useState({ ...formInitial })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const [rolesData, setRolesData] = useState({})
    var [paginator, setPaginator] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getRolesData = async (e, page = 1) => {
        setNoDataFound(false)

        setIsLoading(true)
        setRolesData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let request = { page: page }
        var response = await postCall(ROLES_P, request, props.user.access_token)
        if (response?.code === 200) {
            setRolesData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if (response?.data?.data?.length == 0) { setNoDataFound(true); }
            else setNoDataFound(false)
        } else {
            toast.error(response?.message?.[0])
            setRolesData([]);
            setPaginator({});
            setIsLoading(false)
            setNoDataFound(true);
        }
        createAuditLog(props, { log_type_id: 3, hit_map: 'role list', page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent, api_path: process.env.REACT_APP_API_BASE_URL + ROLES_P, api_request: JSON.stringify(request), api_response: JSON.stringify(response) })
    }



    useEffect(() => {
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)

        createAuditLog(props, { log_type_id: 3, hit_map: 'page', page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent })
        getRolesData()
        getAllModules()
    }, [])


    const getApi = () => {
        if (formData?.id) {
            return UPDATE_ROLE
        }
        return CREATE_ROLE
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let request = { ...formData, id: formData?.id }
        let api = getApi()
        var response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getRolesData(null, paginator?.current_page)
            clear()
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }

        createAuditLog(props, { log_type_id: 3, hit_map: `${formData?.id ? 'update' : 'create'} role`, page: breadcrumb?.pageTitle, page_url: window.location.href, user_agent: userAgent, api_path: process.env.REACT_APP_API_BASE_URL + api, api_request: JSON.stringify(request), api_response: JSON.stringify(response) })

    }

    const updateModalProcess = async (id) => {
        var roleData = rolesData.find((item) => {
            return item.id == id
        })

        // get permissions for single role
        let permissions = []
        var response = await postCall(SINGLE_ROLE_INFO, { id: id }, props.user.access_token)
        if (response?.code === 200) {
            permissions = response?.data?.permissions
            let modules = handle_module_permissions_select(null, permissions)
            setFormData({ ...formData, ...roleData, id: id, permissions: permissions, modules: modules })
        }
    }


    const closeDialog = () => {
        let modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn.click();
    }


    const clear = () => {
        setFormData(formInitial)
        getAllModules()
    }

    // modules checkboxes select process
    const [modulesData, setModulesData] = useState([])
    const getAllModules = async () => {
        var response = await postCall(MODULE_ALL, null, props?.user?.access_token)
        if (response?.code === 200) {
            setModulesData(response?.data?.modulelist)
            setFormData({ ...formInitial, modules: response?.data?.modulelist })
        } else {
            setFormData({ ...formInitial, modules: [] })
        }
    }

    const handle_module_select = (e, item) => {
        let permissions_n_c_s = []
        let permissions_n_c_s_f = []

        let modules = [...formData?.modules]?.map(module => {
            permissions_n_c_s = []

            if (item?.id == module?.id) {
                if (module?.selected == 1) {
                    module.selected = 0
                    module.permissions = [...module?.permissions]?.map(permission => {
                        permission.selected = 0
                        return permission
                    })
                }
                else {
                    module.selected = 1
                    module.permissions = [...module?.permissions]?.map(permission => {
                        permission.selected = 1
                        return permission
                    })
                }
            }
            permissions_n_c_s = [...module?.permissions]?.filter(i => i?.selected == 1)?.map(i => i?.name)
            permissions_n_c_s_f = [...permissions_n_c_s_f, ...permissions_n_c_s]

            return module
        })

        setFormData({ ...formData, modules: modules, permissions: permissions_n_c_s_f })
    }

    const handle_module_permissions_select = (e, permission_names = []) => {
        let modules = []
        let module_f = {}
        let permissions = []
        let permissions_n_c_s = []
        let permissions_n_c_s_f = []

        formData?.modules?.forEach(module => {
            module_f = { ...module }
            permissions = []
            permissions_n_c_s = []

            permissions = [...module?.permissions].map(permission => {
                if (permission_names?.includes(permission?.name)) {
                    permission?.selected == 1 ? permission.selected = 0 : permission.selected = 1
                }
                return permission
            })

            let module_selected = (permissions?.length == permissions?.filter(i => i?.selected == 1)?.length) ? 1 : 0
            console.log(permissions, permissions?.length, permissions?.filter(i => i?.selected == 1), permissions?.filter(i => i?.selected == 1)?.length);

            permissions_n_c_s = permissions?.filter(i => i?.selected == 1)?.map(i => i?.name)
            permissions_n_c_s_f = [...permissions_n_c_s_f, ...permissions_n_c_s]

            module_f = { ...module_f, selected: module_selected, permissions: permissions }
            modules = [...modules, module_f]
        })

        setFormData({ ...formData, modules: [...modules], permissions: permissions_n_c_s_f })

        return modules
    }



    return (
        <Fragment>


            <div className="card col-12">

                <div className="card-block py-5 px-2">
                    {
                        props.permissions.includes('role create') ?
                            <a className="btn btn-sm btn-primary ms-1 mb-2" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" href="#0">
                                <i className="icofont icofont-ui-add me-1"></i>
                                Create New Role
                            </a>
                            :
                            null
                    }
                    <div className="row">
                        {
                            isLoading ?
                                <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height: "70px" }} alt="Loading..." ></div>
                                : null
                        }
                        {
                            noDataFound ?
                                <div className="mx-auto">
                                    <label className="badge badge-inverse-warning label-lg label" style={{ fontSize: "18px" }} >No Data Found!</label>
                                </div>
                                : null
                        }
                    </div>


                    {
                        rolesData?.length > 0 ?
                            <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                                <thead>
                                    <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                        <th>Serial</th>
                                        <th>Name</th>
                                        <th>Permissions</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        rolesData.map((row, i) => {
                                            return (
                                                <tr key={'row-' + i}>
                                                    <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                    <td className="align-middle">{row?.name}</td>
                                                    <td style={{ maxWidth: "250px", whiteSpace: "normal" }} >
                                                        <MultiColorBadges listingtype='serial' dataList={row?.permissions_list} />
                                                    </td>
                                                    <td className="align-middle">
                                                        {
                                                            props?.permissions?.includes('role update') ?
                                                                <div className="form-inline" >
                                                                    <a role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" href="#0" className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
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
                            : null
                    }

                    {
                        paginator?.total_pages > 1 ?
                            <Paginate paginator={paginator} pagechanged={(page) => getRolesData(null, page)} /> : null
                    }


                </div>
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex="-1" aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header  py-4">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} Role</p>
                            <div className="btn btn-icon btn-sm btn-danger ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={clear}>
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-5" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ heigh: "0", width: "0" }} />

                                    <div className="row">
                                        <div className="form-group row col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar /></label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Role name" value={formData?.name} onChange={handleChange} required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <div className="card-header text-center py-4 bg-light-danger fs-5">
                                            <label>Select Permissions<Validation.RequiredStar /></label>
                                        </div>
                                        {
                                            [...formData?.modules]?.map((module, i) => {
                                                return (
                                                    <div className="col-lg-4 my-2" key={`module-` + i}>
                                                        <div className="card card-stretch card-bordered mb-5">
                                                            <div className="card-header">
                                                                <h3 className="card-title">
                                                                    <Checkbox
                                                                        key={'module-' + i + '-cbox'}
                                                                        label={module?.name}
                                                                        value={module?.selected}
                                                                        onChange={(e) => handle_module_select(e, module)}
                                                                    />
                                                                </h3>
                                                            </div>
                                                            <div className="card-body py-2">
                                                                {
                                                                    [...formData?.modules]?.find(m => m?.name == module?.name)?.permissions?.map((permission, i) => {
                                                                        return (
                                                                            <Checkbox
                                                                                key={'module-permission-' + i + '-cbox'}
                                                                                label={permission?.name}
                                                                                value={permission?.selected}
                                                                                onChange={(e) => handle_module_permissions_select(e, [permission?.name])}
                                                                                className="my-1"
                                                                            />
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>


                                    <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Guard name, Ex: web" value={formData?.guard_name} onChange={handleChange} required hidden />



                                    <div className="modal-footer pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={clear} id="modalclosebtn">Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
