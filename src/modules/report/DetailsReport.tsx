import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import { postCall, getCall, putCall } from '../../api/apiService.js'
import { DETAILS_REPORT_P, DETAILS_REPORT_FILTER_DATA } from '../../api/apiPath.js'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { permissionsResets, getSpecificDateTimeAMPM } from '../../components/Helpers/CommonHelpers.js'
import INIT from '../../route/utils/Init.js';
import 'react-datepicker/dist/react-datepicker.css';
import Sorting from '../../components/Datatable/Sorting.js';


function DetailsReport(props: any) {

    const breadcrumb = {
        pageTitle: 'Details Report',
        currentPath: '/details-report',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Report'
            },
            {
                title: 'Details Report',
                default: 1
            }
        ]
    }

    interface FormInitial {
        filter: {
            data: {
                msisdn: string;
                brand_id: string;
                brand_selected_option: string;
                service_id: string;
                service_selected_option: string;
                operator_id: string;
                operator_selected_option: string;
                start_time: string;
                end_time: string;
            };
            list: {
                service_list: Array<{ label: string; value: number }>;
                brand_list: Array<{ label: string; value: number }>;
                operator_list: Array<{ label: string; value: number }>;

            };
        };
        form: {
            data: {

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
                msisdn: '',
                brand_id: '',
                brand_selected_option: '',
                service_id: '',
                service_selected_option: '',
                operator_id: '',
                operator_selected_option: '',
                start_time: '',
                end_time: '',
            },
            list: {
                service_list: [],
                brand_list: [],
                operator_list: [],
            },
        },
        form: {
            data: {

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


    const getTableData = async (e: any, filteredData = { ...formData?.filter?.data, page: 1, sort: null }) => {
        setFormData((prev: any) => ({ ...prev, table: { ...prev?.table, sort: filteredData?.sort, data: null, paginator: null, loading: true, empty: true } }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData?.filter?.data, ...filteredData }
        const response = await getCall(DETAILS_REPORT_P, request, props.user.access_token)
        if (response?.code === 200) {
            let empty = (response?.data?.data?.length == 0) ? true : false
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: response?.data?.data, paginator: response?.data?.paginator, loading: false, empty } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, table: { ...prev.table, data: null, paginator: null, loading: false, empty: false } }))
        }
    }

    const getFilterList = async () => {
        const response = await getCall(DETAILS_REPORT_FILTER_DATA, null, props?.user?.access_token)
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



    const filterClear = async () => {
        setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, ...formInitial?.filter?.data } } }))
        getTableData(null, { ...formInitial?.filter?.data, page: 1 })
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
                            Service
                            <Select options={formData?.filter?.list?.service_list} value={formData?.filter?.data?.service_selected_option}
                                onChange={(option: any) =>
                                    setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, service_id: option?.value, service_selected_option: option } } }))
                                }
                                isClearable placeholder="Select Service" />
                        </div>

                        <div className="col-md-3">
                            Brand
                            <Select options={formData?.filter?.list?.brand_list} value={formData?.filter?.data?.brand_selected_option}
                                onChange={(option: any) =>
                                    setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, brand_id: option?.value, brand_selected_option: option } } }))
                                }
                                isClearable placeholder="Select Brand" />
                        </div>

                        <div className="col-md-3">
                            Operator
                            <Select options={formData?.filter?.list?.operator_list} value={formData?.filter?.data?.operator_selected_option}
                                onChange={(option: any) =>
                                    setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, operator_id: option?.value, operator_selected_option: option } } }))
                                }
                                isClearable placeholder="Select Operator" />
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
                                                <th>Service <Sorting table="service" column="service" order={formData?.table?.sort?.column == 'service' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Brand <Sorting table="handset_users" column="brand_name" order={formData?.table?.sort?.column == 'brand_name' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Operator <Sorting table="operator" column="name" order={formData?.table?.sort?.column == 'operator' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>MSISDN <Sorting column="msisdn" order={formData?.table?.sort?.column == 'msisdn' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                                <th>Logtime <Sorting column="logtime" order={formData?.table?.sort?.column == 'logtime' ? formData?.table?.sort?.order : null} onSortChange={handleSortChange} /></th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                (formData?.table?.data || [])?.map((row: any, i) => {
                                                    return (
                                                        <tr key={'table-row-' + i}>
                                                            <td>{formData?.table?.paginator?.current_page > 1 ? ((formData?.table?.paginator?.current_page - 1) * formData?.table?.paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>{row?.service?.service}</td>
                                                            <td>{row?.brand?.brand_name}</td>
                                                            <td>{row?.operator?.name}</td>
                                                            <td>{row?.msisdn}</td>
                                                            <td>{getSpecificDateTimeAMPM(row?.logtime)}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(DetailsReport));

