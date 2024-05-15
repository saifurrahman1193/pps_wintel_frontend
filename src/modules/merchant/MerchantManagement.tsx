import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import { postCall, putCall, getCall } from '../../api/apiService.js'
import { MERCHANT_P, CREATE_MERCHANT, UPDATE_MERCHANT, SINGLE_MERCHANT_INFO } from '../../api/apiPath.js'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { Link } from 'react-router-dom';
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
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
        filter: {},
        form: {
            id: '',
            client_name: '',
            client_address: '',
            client_poc_name: '',
            client_contact_no: '',
            client_poc_email: '',
            client_provided_doc: '',
            client_id: '',
            login_pass: '',
            role: '',
            create_time: '',
            status: '',
            is_real_client: '',
        }
    }

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            form: {
                ...formData?.form,
                [e.target.name]: e.target.value
            }
        }))
    }


    const [permissionsData, setPermissionsData] = useState({})
    const [paginator, setPaginator] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getTableData = async (e, page = 1) => {
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

        getTableData(null, undefined, undefined)
    }, [])

    const getApi = () => {
        if (formData?.form?.id) {
            return UPDATE_MERCHANT
        }
        return CREATE_MERCHANT
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData?.form, id: formData?.form?.id }
        let response;
        if (formData?.form?.id) {
            response = await putCall(UPDATE_MERCHANT, request, props.user.access_token)
        }
        else{
            response = await postCall(CREATE_MERCHANT, request, props.user.access_token)
        }
        if (response?.code === 200) {
            getTableData(null, paginator?.current_page, undefined)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeFormModal()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async (id) => {
        const response = await getCall(`${SINGLE_MERCHANT_INFO}/${id}`, {}, props.user.access_token)
        if (response?.code === 200) {
            setFormData((prev) => ({ ...prev, form: response?.data }))
        }
    }

    const closeFormModal = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
        setFormData((prev) => ({...prev, form: formInitial?.form}))
    }

    const formClear = () => {
        setFormData((prev) => ({...prev, form: formInitial?.form}))
    }

    return (
        <Fragment>
            <div className="card col-12">
                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">
                            {
                                props.permissions.includes('merchant create') ?
                                    <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveModal" to="#0" onClick={formClear}>
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
                                                                        <Badge badgeValue={row?.status} badgeClassName={row?.status == 'active' ? 'badge-soft-success' : 'badge-soft-danger'} />
                                                                        : null
                                                                }
                                                            </td>
                                                            <td>
                                                                {
                                                                    props.permissions.includes('merchant update') ?
                                                                        <div className="dropdown">
                                                                            <button className="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <i className="bx bx-dots-horizontal-rounded"></i>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">

                                                                                <li><Link role="button" data-bs-toggle="modal" data-bs-target="#saveModal" title="Edit Record?" className="dropdown-item px-1" to="#!" onClick={() => updateModalProcess(row.id)}><i className="mdi mdi-pencil" /> <span className='mx-2'>Edit</span></Link></li>

                                                                                <li><Link role="button" data-bs-toggle="modal" data-bs-target="#viewModal" title="View Record?" className="dropdown-item px-1" to="#!" onClick={() => updateModalProcess(row.id)}><i className="mdi mdi-eye" /> <span className='mx-2'>View</span></Link></li>
                                                                            </ul>
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
                            <Paginate paginator={paginator} pagechanged={(page) => getTableData(null, page)} /> : null
                    }
                </div>
            </div>

            <div className="modal fade modal-backdrop-static" id="saveModal" tabIndex="-1" aria-labelledby="saveModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveModal" style={{ flex: "auto" }}>{formData?.form?.id ? 'Update' : 'Create New'} Merchant</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={formClear} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
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


                                    <div className="modal-footer pt-2 pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={formClear} id="modalclosebtn">Cancel</button>
                                        <button type="submit" className="btn btn-sm btn-primary" id="formSubmit">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className="modal fade modal-backdrop-static" id="viewModal" tabIndex="-1" aria-labelledby="viewModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false" >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="viewModal" style={{ flex: "auto" }}> Merchant Details</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={formClear} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <div className="table-responsive my-1">
                                <table className="table table-custom-sm table-bordered table-striped table-nowrap mb-0">
                                    <tbody>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Merchant Name</th>
                                            <td>{formData?.form?.client_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Address</th>
                                            <td>{formData?.form?.client_address}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Authorized Person Name</th>
                                            <td>{formData?.form?.client_poc_name}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Phone</th>
                                            <td>{formData?.form?.client_contact_no}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Email</th>
                                            <td>{formData?.form?.client_poc_email}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Client Provided Document</th>
                                            <td>{formData?.form?.client_provided_doc}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Status</th>
                                            <td>
                                                {
                                                    formData?.form?.status ?
                                                        <Badge badgeValue={formData?.form?.status} badgeClassName={formData?.form?.status == 'active' ? 'badge-soft-success' : 'badge-soft-danger'} />
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-nowrap" scope="row">Is Real Client</th>
                                            <td>
                                                {
                                                    formData?.form?.is_real_client ?
                                                        <Badge badgeValue={formData?.form?.is_real_client ? 'YES' : 'NO'} badgeClassName={formData?.form?.is_real_client ? 'badge-soft-success' : 'badge-soft-danger'} />
                                                        : null
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
