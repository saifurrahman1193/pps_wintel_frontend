import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall, getCall } from '../../api/apiService.js'
import { MERCHANT_P, CREATE_MERCHANT, UPDATE_MERCHANT } from '../../api/apiPath.js'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent.js'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { Link } from 'react-router-dom';
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
import Select from 'react-select'
import Badge from '../../components/Badges/Badge.js';
import INIT from '../../route/utils/Init.js';

function MerchantManagement(props) {

    const breadcrumb = {
        pageTitle: 'Merchant Management',
        currentPath: '/merchant-management',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Manage Merchant',
                default: 1
            }
        ]
    }

    const formInitial = {
        filter:{},
        form: {
            id: '',
            name: '',
            phone: '',
            email: '',
            email_verified_at: '',
            password: '',
            status: '',
            log_viewer: '',
            force_password: '',
            remember_token: '',
            organization_id: '',
        }
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

    const getPermissionsData = async (e, page = 1) => {
        setNoDataFound(false)

        setIsLoading(true)
        setPermissionsData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { page: page }
        const response = await getCall(MERCHANT_P, request, props.user.access_token)
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
    }, [])

    const getApi = () => {
        if (formData?.id) {
            return UPDATE_MERCHANT
        }
        return CREATE_MERCHANT
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



    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const clear = () => {
        setFormData(formInitial)
    }



    return (
        <Fragment>
            <div className="card col-12">
                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">
                            {
                                props.permissions.includes('merchant create') ?
                                    <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0" onClick={clear}>
                                        <i className="bx bx-plus label-icon"></i>
                                        Create New Merchant
                                    </Link>
                                    :
                                    null
                            }
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
                                                <th>Merchant Name</th>
                                                <th>POC Name</th>
                                                <th>POC Phone</th>
                                                <th>Masking Balance</th>
                                                <th>Non-masking Balance</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                permissionsData.map((row, i) => {
                                                    return (
                                                        <tr key={'row-permission-' + i}>
                                                            <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>{row?.client_name}</td>
                                                            <td>{row?.client_poc_name}</td>
                                                            <td>{row?.client_contact_no}</td>
                                                            <td></td>
                                                            <td></td>
                                                            <td>
                                                                {
                                                                    row?.status ?
                                                                        <Badge badgeValue={row?.status} badgeClass={row?.status=='active' ?'badge-soft-success' : 'badge-soft-danger' } />
                                                                        : null
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    props.permissions.includes('merchant update') ?
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
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.id ? 'Update' : 'Create New'} Merchant</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={() => setFormData(formInitial)} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.form?.id} onChange={handleChange} readOnly hidden style={{ height: "0", width: "0" }} />

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Merchant Name<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_name" placeholder="Merchant Name" value={formData?.form?.client_name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Address<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_address" placeholder="Address" value={formData?.form?.client_address} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Authorized Person Name<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_poc_name" placeholder="Name" value={formData?.form?.client_poc_name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Phone<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_contact_no" placeholder="Client Contact No" value={formData?.form?.client_contact_no} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Email<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_poc_email" placeholder="Client POC Email" value={formData?.form?.client_poc_email} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Provided Document<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="client_provided_doc" placeholder="Client Provided Document" value={formData?.form?.client_provided_doc} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>


                                    
                                    

                                    <input type="text" className="form-control form-control-sm form-control-solid" name="name" placeholder="Guard name, Ex:web" value={formData?.guard_name} onChange={handleChange} required hidden />

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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(MerchantManagement));

