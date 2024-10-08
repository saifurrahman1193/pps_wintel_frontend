import { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall } from '../../api/apiService'
import { ROLES_P, CREATE_ROLE, UPDATE_ROLE, SINGLE_ROLE_INFO, MODULE_ALL } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { permissionsResets } from '../../components/Helpers/CommonHelpers'
import Checkbox from '../../components/Forms/Checkbox.js';
import INIT from '../../route/utils/Init';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap'


function Roles(props:any) {

    const breadcrumb = {
        pageTitle: 'Roles',
        currentPath: '/roles',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
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
        permissions:  [] as any,
        modules:  [] as any,
        modules_list: [] as any
    }

    const [formData, setFormData] = useState({ ...formInitial })

    const handleChange = (e:any) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const [rolesData, setRolesData] = useState([] as any)
    const [paginator, setPaginator] = useState({} as any)
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getRolesData = async (e:any, page = 1) => {
        setNoDataFound(false)

        setIsLoading(true)
        setRolesData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { page: page }
        const response = await postCall(ROLES_P, request, props.user.access_token)
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
    }



    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)

        getRolesData(null, undefined)
        getAllModules()
    }, [])


    const getApi = () => {
        if (formData?.id) {
            return UPDATE_ROLE
        }
        return CREATE_ROLE
    }

    const handleSubmit = async (e:any) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData, id: formData?.id }
        const api = getApi()
        const response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getRolesData(null, paginator?.current_page)
            clear()
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async (id:any) => {
        const roleData = rolesData?.find((item:any) => {
            return item.id == id
        })

        // get permissions for single role
        let permissions:any = []
        const response = await postCall(SINGLE_ROLE_INFO, { id: id }, props.user.access_token)
        if (response?.code === 200) {
            permissions = response?.data?.permissions
            const modules = handle_module_permissions_select(null, permissions)
            setFormData((prev) => ({ ...prev, ...roleData, id: id, permissions: permissions, modules: modules }))
        }
    }


    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }


    const clear = () => {
        setFormData(formInitial)
        getAllModules()
    }

    // modules checkboxes select process
    // const [modulesData, setModulesData] = useState([])
    const getAllModules = async () => {
        const response = await postCall(MODULE_ALL, null, props?.user?.access_token)
        if (response?.code === 200) {
            // setModulesData(response?.data?.modulelist)
            setFormData({ ...formInitial, modules: response?.data?.modulelist })
        } else {
            setFormData({ ...formInitial, modules: [] })
        }
    }

    const handle_module_select = (e:any, item:any) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        let permissions_n_c_s:any = []
        let permissions_n_c_s_f:any = []

        let modules = [...formData?.modules]?.map((module:any) => {
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

        setFormData((prev) => ({ ...prev, modules: modules, permissions: permissions_n_c_s_f }))
    }

    const handle_module_permissions_select = (e:any, permission_names:any = []) => {
        
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        let modules:any = []
        let module_f = {}
        let permissions = []
        let permissions_n_c_s = []
        let permissions_n_c_s_f:any = []

        formData?.modules?.forEach((module:any) => {
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

            permissions_n_c_s = permissions?.filter(i => i?.selected == 1)?.map(i => i?.name)
            permissions_n_c_s_f = [...permissions_n_c_s_f, ...permissions_n_c_s]

            module_f = { ...module_f, selected: module_selected, permissions: permissions }
            modules = [...modules, module_f]
        })

        setFormData((prev) => ({ ...prev, modules: [...modules], permissions: permissions_n_c_s_f }))

        return modules
    }


    const getSingleRoleInfo = async (id:number) => {

        const roleData = rolesData.find((item:any) => {
            return item.id == id
        })

        // get permissions for single role
        const response = await postCall(SINGLE_ROLE_INFO, { id: id }, props?.user?.access_token)
        if (response.code === 200) {
            const modules_list = response?.data?.modules
            setFormData((prev) => ({ ...prev, ...roleData, id: id, modules_list: modules_list }))
        }
        else {
            setFormData((prev) => ({ ...prev, ...roleData, id: id }))
        }
    }

    return (
        <Fragment>


            <div className="card col-12">

                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">

                            {
                                props.permissions.includes('role create') ?
                                    <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0">
                                        <i className="bx bx-plus label-icon"></i>
                                        Create New Role
                                    </Link>
                                    :
                                    null
                            }
                        </div>
                    </div>

                    <div className="row">
                        {
                            isLoading ?
                                <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height: "70px" }}></div>
                                : null
                        }
                        {
                            noDataFound ?
                                <div className="text-center">
                                    <span className="badge badge-soft-danger" style={{ fontSize: "18px" }}>No Data Found!</span>
                                </div>
                                : null
                        }
                    </div>


                    {
                        rolesData?.length > 0 ?
                            <div className='table-responsive'>
                                <table className="table table-custom-sm table-hover table-rounded table-striped border">
                                    <thead>
                                        <tr className="text-start text-muted fw-bolder text-uppercase">
                                            <th>Serial</th>
                                            <th>Name</th>
                                            <th>Permissions</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rolesData.map((row:any, i:number) => {
                                                return (
                                                    <tr key={'row-' + i}>
                                                        <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                        <td className="align-middle">{row?.name}</td>
                                                        <td style={{ maxWidth: "250px", whiteSpace: "normal" }} >
                                                            <Link className="btn btn-icon" to="#0" role="button" data-bs-toggle="modal" data-bs-target="#permissions_list_modal" onClick={() => getSingleRoleInfo(row.id)}><i className="mdi mdi-eye mr-1 text-primary"></i>
                                                            </Link>
                                                        </td>
                                                        <td className="align-middle">
                                                            {
                                                                props?.permissions?.includes('role update') ?
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

                            : null
                    }

                    {
                        paginator?.total_pages > 1 ?
                            <Paginate paginator={paginator} pagechanged={(page:any) => getRolesData(null, page)} /> : null
                    }


                </div>
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex={-1} aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} Role</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={clear} data-bs-dismiss="modal"><i className="bx bx-x font-size-24 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange} readOnly hidden style={{ height: "0", width: "0" }} />

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

                                    <div className="row pt-2">
                                        <div className="card-header text-center py-0 bg-light-danger fs-5">
                                            <label>Select Permissions<Validation.RequiredStar /></label>
                                        </div>
                                        {
                                            [...formData?.modules]?.map((module:any, i:number) => {
                                                return (
                                                    <div className="col-lg-4 my-2" key={`module-` + i}>
                                                        <div className="card card-stretch card-bordered mb-0">
                                                            <div className="card-header">
                                                                <h3 className="card-title">
                                                                    <Checkbox
                                                                        key={'module-' + i + '-cbox'}
                                                                        label={module?.name}
                                                                        value={module?.selected}
                                                                        onChange={(e:any) => handle_module_select(e, module)}
                                                                    />
                                                                </h3>
                                                            </div>
                                                            <div className="card-body py-2">
                                                                {
                                                                    [...formData?.modules]?.find((m:any) => m?.name == module?.name)?.permissions?.map((permission:any, i:number) => {
                                                                        return (
                                                                            <Checkbox
                                                                                key={'module-permission-' + i + '-cbox'}
                                                                                label={permission?.name}
                                                                                value={permission?.selected}
                                                                                onChange={(e:any) => handle_module_permissions_select(e, [permission?.name])}
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


            <div className="modal fade" data-backdrop="static" id="permissions_list_modal" tabIndex={-1} role="dialog" aria-labelledby="permissions_list_modal" aria-hidden="true" >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id="permissions_list_modal" style={{ flex: "auto" }}>Permission List</h4>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={clear} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>

                        </div>
                        <div className="modal-body" >
                            <div className={(formData?.modules_list)?.length > 7 ? 'overflowY450' : ''}>

                                {
                                    formData?.modules_list?.length > 0 ?
                                        <Table cellPadding={0} cellSpacing={0} responsive striped bordered hover className="table-sm">
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Module</th>
                                                    <th>Permissions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    (formData?.modules_list)?.map((item:any, i:number) => {
                                                        return (
                                                            <tr key={'row-module-permission-' + i}>
                                                                <td>{i + 1}</td>
                                                                <td>{item?.name}</td>
                                                                <td>
                                                                    {
                                                                        item?.permissions?.map((perm:any, perm_i:number) => {
                                                                            return (
                                                                                <Fragment key={'row-module-permission-list-' + perm_i}>
                                                                                    <span className="badge rounded-pill font-size-12 fw-medium bg-light mx-1 mb-0">{perm?.name}</span>
                                                                                </Fragment>
                                                                            )
                                                                        })
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                        :

                                        <div className="text-center"><span className="badge badge-soft-danger" style={{ fontSize: "18px" }}>No Data Found!</span></div>


                                }

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={clear}>Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}



const mapStateToProps = (state:any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch:any) => ({
    setPageBreadcrumb: (data:any) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data:any) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Roles);

