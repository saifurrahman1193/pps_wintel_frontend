import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Validation from '../../components/Forms/Validation.js';
import Select from 'react-select'
import { postCall, getCall, putCall } from '../../api/apiService.js'
import { HANDSET_USER_P, HANDSET_USER_FILTER_DATA, SINGLE_HANDSET_USER_INFO, CREATE_HANDSET_USER, UPDATE_HANDSET_USER } from '../../api/apiPath.js'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent.js'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
import INIT from '../../route/utils/Init.js';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import Sorting from '../../components/Datatable/Sorting.js';
import LoaderSubmit from '../../components/LoaderSubmit/LoaderSubmit.js';


function HandsetUser(props: any) {

    const breadcrumb = {
        pageTitle: 'Handset User',
        currentPath: '/handset-users',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Access Control'
            },
            {
                title: 'Manage Handset User',
                default: 1
            }
        ]
    }

    interface FormInitial {
        filter: {
            data: {
                brand_id: string;
                brand_selected_option: string;
            };
            list: {
                brand_list: string[];
                status_list: Array<{ label: string; value: number }>;
            };
        };
        form: {
            data: {
                id: string;
    
                username: string;
                password: string;
                brand_name: string;
                k_cricket_update: string;
                k_cricket_update_status: number;
                k_cricket_update_status_selected_option: { label: string; value: number };
                k_hadith: string;
                k_hadith_status: number;
                k_hadith_status_selected_option: { label: string; value: number };
                k_jokes: string;
                k_jokes_status: number;
                k_jokes_status_selected_option: { label: string; value: number };
                k_beauty_tips: string;
                k_beauty_tips_status: number;
                k_beauty_tips_status_selected_option: { label: string; value: number };
                k_media_gossip: string;
                k_media_gossip_status: number;
                k_media_gossip_status_selected_option: { label: string; value: number };
                k_love_tips: string;
                k_love_tips_status: number;
                k_love_tips_status_selected_option: { label: string; value: number };
                status: number;
                statusSelectedOption: { label: string; value: number };
            };
            errors: null | Record<string, string>;
            submit: {
                loading: boolean;
            };
        };
        table: {
            data: any[] | null;
            paginator: {
                current_page: number;
                total_pages: number;
                previous_page_url: string | null;
                next_page_url: string | null;
                record_per_page: number;
                current_page_items_count: number | null;
                total_count: number | null;
                pagination_last_page: number | null;
            };
            loading: boolean;
            empty: boolean;
            sort: {
                column: string | null;
                table: string | null;
                order: 'asc' | 'desc' | null;
            };
        };
    }
    
    const formInitial: FormInitial = {
        filter: {
            data: {
                brand_id: '',
                brand_selected_option: '',
            },
            list: {
                brand_list: [],
                status_list: [
                    { label: 'Inactive', value: 0 },
                    { label: 'Active', value: 1 },
                ],
            },
        },
        form: {
            data: {
                id: '',
                username: '',
                password: '',
                brand_name: '',
                k_cricket_update: '',
                k_cricket_update_status: 0,
                k_cricket_update_status_selected_option: { label: 'Inactive', value: 0 },
                k_hadith: '',
                k_hadith_status: 0,
                k_hadith_status_selected_option: { label: 'Inactive', value: 0 },
                k_jokes: '',
                k_jokes_status: 0,
                k_jokes_status_selected_option: { label: 'Inactive', value: 0 },
                k_beauty_tips: '',
                k_beauty_tips_status: 0,
                k_beauty_tips_status_selected_option: { label: 'Inactive', value: 0 },
                k_media_gossip: '',
                k_media_gossip_status: 0,
                k_media_gossip_status_selected_option: { label: 'Inactive', value: 0 },
                k_love_tips: '',
                k_love_tips_status: 0,
                k_love_tips_status_selected_option: { label: 'Inactive', value: 0 },
                status: 1,
                statusSelectedOption: { label: 'Active', value: 1 },
            },
            errors: null,
            submit: {
                loading: false,
            },
        },
        table: {
            data: null,
            paginator: {
                current_page: 1,
                total_pages: 0,
                previous_page_url: null,
                next_page_url: null,
                record_per_page: 20,
                current_page_items_count: null,
                total_count: null,
                pagination_last_page: null,
            },
            loading: false,
            empty: true,
            sort: {
                column: null,
                table: null,
                order: null,
            },
        },
    };
    


    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e: any) => {
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
    const getTableData = async (e: any, filteredData = { ...formData?.filter?.data, page: 1, sort: null }) => {
        setFormData((prev: any) => ({ ...prev, table: { ...prev?.table, sort: filteredData?.sort, data: null, paginator: null, loading: true, empty: true } }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData?.filter?.data, ...filteredData }
        const response = await getCall(HANDSET_USER_P, request, props.user.access_token)
        if (response?.code === 200) {
            let empty = (response?.data?.data?.length == 0) ? true : false
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: response?.data?.data, paginator: response?.data?.paginator, loading: false, empty } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, table: { ...prev.table, data: null, paginator: null, loading: false, empty: false } }))
        }
    }

    const getFilterList = async () => {
        const response = await getCall(HANDSET_USER_FILTER_DATA, null, props?.user?.access_token)
        if (response?.code === 200) {
            setFormData((prev) => ({
                ...prev,
                filter: { ...prev.filter, list: { ...prev.filter?.list, ...response?.data } }
            }))
        }
    }

    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)
        getFilterList()
        getTableData(null, undefined)
    }, [])

    const handleSubmit = async (e: any) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        formData?.form?.submit?.loading
        setFormData((prev) => ({ ...prev, form: { ...prev?.form, submit: { ...prev?.form?.submit, loading: true } } }))

        const request = { ...formData?.form?.data, id: formData?.form?.data?.id }
        let response;
        if (formData?.form?.data?.id) {
            response = await putCall(UPDATE_HANDSET_USER, request, props.user.access_token)
        }
        else {
            response = await postCall(CREATE_HANDSET_USER, request, props.user.access_token)
        }
        if (response?.code === 200) {
            getTableData(null, { ...formData?.filter?.data, page: formData?.table?.paginator?.current_page, sort:formData?.table?.sort  })
            formClear()
            toast.success(response?.message?.[0])
            closeDialog()
            setFormData((prev) => ({ ...prev, form: { ...prev?.form, submit: { ...prev?.form?.submit, loading: false } } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev) => ({ ...prev, form: { ...prev?.form, submit: { ...prev?.form?.submit, loading: false } } }))
        }
    }

    const updateModalProcess = async (id: number) => {
        const response = await getCall(`${SINGLE_HANDSET_USER_INFO}/${id}`, null, props.user.access_token)
        if (response?.code === 200) {
            const k_cricket_update_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_cricket_update_status)
            const k_hadith_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_hadith_status)
            const k_jokes_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_jokes_status)
            const k_beauty_tips_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_beauty_tips_status)
            const k_media_gossip_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_media_gossip_status)
            const k_love_tips_status_selected_option = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.k_love_tips_status)

            const statusSelectedOption = (formData?.filter?.list?.status_list || []).find((item: any) => item?.value == response?.data?.status)

            setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, ...response?.data, statusSelectedOption: statusSelectedOption, k_cricket_update_status_selected_option, k_hadith_status_selected_option, k_jokes_status_selected_option, k_beauty_tips_status_selected_option, k_media_gossip_status_selected_option, k_love_tips_status_selected_option } } }))
        }
    }


    const closeDialog = () => {
        const modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn ? modalclosebtn.click() : null;
    }

    const formClear = () => {
        setFormData((prev) => ({ ...prev, form: {...formInitial?.form} }))
    }
    const filterClear = async () => {
        setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, ...formInitial?.filter?.data } } }))
        getTableData(null, { ...formInitial?.filter?.data, page:1 })
    }

    const handleSortChange = (column: any, table: any, order: any) => {
        setFormData((prev) => ({ ...prev, table: { ...prev.table, sort: { column, table, order } } }))
        getTableData(null, { ...formData?.filter?.data, page: 1, sort: { column, table, order } })
    };

    return (
        <Fragment>
            <div className="card col-12">
                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="col-md-3">
                            Brand
                            <Select options={formData?.filter?.list?.brand_list} value={formData?.filter?.data?.brand_selected_option}
                                onChange={(option: any) =>
                                    setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, brand_id: option?.value, brand_selected_option: option } } }))
                                }
                                isClearable placeholder="Select Brand" />
                        </div>

                        <div className="col-md-3">
                            <button type="button" className="btn btn-soft-primary waves-effect waves-light page-submit-margin-top"
                                onClick={getTableData}
                            ><i className="mdi mdi-filter font-size-16 align-middle"></i></button>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light page-submit-margin-top mx-1"
                                onClick={filterClear}
                            ><i className="mdi mdi-filter-remove  font-size-16 align-middle"></i></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card col-12">

                <div className="card-block py-2 px-2">
                    <div className="row mb-2">
                        <div className="d-flex align-items-end col col-12 col-xs-12 col-sm-4  col-md-6 col-lg-7 col-xl-8">
                            {props.permissions.includes('handset user create') && (
                                <Link className="btn btn-sm btn-primary waves-effect btn-label waves-light" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" to="#0" onClick={formClear}>
                                    <i className="bx bx-plus label-icon"></i>
                                    Create New Handset User
                                </Link>
                            )}
                        </div>

                    </div>

                    {
                        formData?.table?.loading || formData?.table?.empty ?
                            <div className="row col-12" style={{ marginTop: "50px" }}>
                                {
                                    formData?.table?.loading ?
                                        <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height: "70px" }} ></div>
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
                        (formData?.table?.data || [])?.length > 0 ?
                            <Fragment>

                                <div className='table-responsive'>
                                    <table className="table table-custom-sm table-hover table-rounded table-striped border">
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
                                                <th>Serial</th>

                                                <th>Username <Sorting column="username" order={formData?.table?.sort?.column == 'username' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>

                                                <th>Brand <Sorting column="brand_name" order={formData?.table?.sort?.column == 'brand_name' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>

                                                <th>Cricket Update <Sorting column="k_cricket_update" order={formData?.table?.sort?.column == 'k_cricket_update' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Hadith <Sorting column="k_hadith" order={formData?.table?.sort?.column == 'k_hadith' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Jokes <Sorting column="k_jokes" order={formData?.table?.sort?.column == 'k_jokes' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Beauty Tips <Sorting column="k_beauty_tips" order={formData?.table?.sort?.column == 'k_beauty_tips' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Media Gossip <Sorting column="k_media_gossip" order={formData?.table?.sort?.column == 'k_media_gossip' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Love Tips <Sorting column="k_love_tips" order={formData?.table?.sort?.column == 'k_love_tips' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>


                                                <th>Status <Sorting column="status" order={formData?.table?.sort?.column == 'status' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                (formData?.table?.data || [])?.map((row: any, i) => {
                                                    return (
                                                        <tr key={'table-row-' + i}>
                                                            <td>{formData?.table?.paginator?.current_page > 1 ? ((formData?.table?.paginator?.current_page - 1) * formData?.table?.paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>{row?.username}</td>
                                                            <td>{row?.brand_name}</td>
                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_cricket_update_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_cricket_update}</span></td>
                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_hadith_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_hadith}</span></td>

                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_jokes_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_jokes}</span></td>
                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_beauty_tips_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_beauty_tips}</span></td>
                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_media_gossip_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_media_gossip}</span></td>
                                                            <td><span className={"badge rounded-pill font-size-12 fw-medium " + (row?.k_love_tips_status ? 'badge-soft-success' : 'badge-soft-danger')}>{row?.k_love_tips}</span></td>
                                                            <td>
                                                                <span className={'badge rounded-pill font-size-12 fw-medium ' + (row?.status == 1 ? ' bg-soft-success text-success' : 'bg-soft-danger text-danger')}>{row?.status == 1 ? 'Active' : 'Inactive'}</span>
                                                            </td>
                                                            <td>
                                                                {
                                                                    props.permissions.includes('handset user update') ?
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
                            <Paginate paginator={formData?.table?.paginator} pagechanged={(page: number) => getTableData(null, { ...formData?.filter?.data, page: page })} /> : null
                    }
                </div>
            </div>



            <div className="modal fade" id="saveConfirmationModal" tabIndex={-1} aria-labelledby="saveConfirmationModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>{formData?.form?.data?.id ? 'Update' : 'Create New'} Handset User</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={formClear} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" name="id" value={formData?.form?.data?.id} onChange={handleChange} readOnly hidden style={{ height: "0", width: "0" }} />

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Username<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="username" placeholder="Name" value={formData?.form?.data?.username} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">
                                                Password{formData?.form?.data?.id ? '' : <Validation.RequiredStar />}
                                            </label>
                                            <div className="col-sm-8">
                                                <input type="password" className="form-control form-control-sm form-control-solid" name="password" placeholder="Password" value={formData?.form?.data?.password} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Brand Name <Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="brand_name" placeholder="Brand Name" value={formData?.form?.data?.brand_name} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Cricket Update Keyword</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_cricket_update" placeholder="Cricket Update" value={formData?.form?.data?.k_cricket_update} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Cricket Update Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_cricket_update_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_cricket_update_status: option?.value, k_cricket_update_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Cricket Update Status" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Hadith Keyword </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_hadith" placeholder="Hadith" value={formData?.form?.data?.k_hadith} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Hadith Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_hadith_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_hadith_status: option?.value, k_hadith_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Hadith Status" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Jokes Keyword </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_jokes" placeholder="Jokes" value={formData?.form?.data?.k_jokes} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Jokes Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_jokes_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_jokes_status: option?.value, k_jokes_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Jokes Status" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Beauty Tips Keyword </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_beauty_tips" placeholder="Beauty Tips" value={formData?.form?.data?.k_beauty_tips} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Beauty Tips Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_beauty_tips_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_beauty_tips_status: option?.value, k_beauty_tips_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Beauty Tips Status" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Media Gossip Keyword </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_media_gossip" placeholder="Media Gossip" value={formData?.form?.data?.k_media_gossip} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Media Gossip Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_media_gossip_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_media_gossip_status: option?.value, k_media_gossip_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Media Gossip Status" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Love Tips Keyword </label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" name="k_love_tips" placeholder="Love Tips" value={formData?.form?.data?.k_love_tips} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Love Tips Status</label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.k_love_tips_status_selected_option}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, k_love_tips_status: option?.value, k_love_tips_status_selected_option: option } } }))
                                                    }
                                                    isClearable placeholder="Select Love Tips Status" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Handset User Status<Validation.RequiredStar /></label>
                                            <div className="col-sm-8">
                                                <Select options={formData?.filter?.list?.status_list} value={formData?.form?.data?.statusSelectedOption}
                                                    onChange={(option: any) =>
                                                        setFormData((prev) => ({ ...prev, form: { ...prev?.form, data: { ...prev?.form?.data, status: option?.value, statusSelectedOption: option } } }))
                                                    }
                                                    isClearable placeholder="Select Handset User Status" required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="modal-footer pt-2 pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={formClear} id="modalclosebtn">Cancel</button>
                                        <LoaderSubmit loaderShow={formData?.form?.submit?.loading} />
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


const mapStateToProps = (state: any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions,
});

const mapDispatchToProps = (dispatch: any) => ({
    setPageBreadcrumb: (data: any) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data: any) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(HandsetUser));

