import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import Select from 'react-select'
import { getCall } from '../../api/apiService.js'
import { SUMMARY_REPORT_P, SUMMARY_REPORT_FILTER_DATA, SUMMARY_REPORT_DOWNLOAD } from '../../api/apiPath.js'
import Paginate from '../../components/Datatable/Paginate.js'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
import INIT from '../../route/utils/Init.js';
import 'react-datepicker/dist/react-datepicker.css';
import Sorting from '../../components/Datatable/Sorting.js';


import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';


function SummaryReport(props: any) {

    const breadcrumb = {
        pageTitle: 'Summary Report',
        currentPath: '/summary-report',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Report'
            },
            {
                title: 'Summary Report',
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
                start_time_init: Date | null;
                start_time: string;
                end_time_init: Date | null;
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
            summary: {
                sub_total: {
                    total_hit_count: number;
                    total_revenue_summary: number;
                };
                grand_total: {
                    total_hit_count: number;
                    total_revenue_summary: number;
                };
            };
            loading: boolean;
            empty: boolean;
            sort: {
                column: string | null;
                table: string | null;
                order: 'asc' | 'desc' | null;
            };
            downloading: {
                excel: boolean;
            }
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
                start_time_init: null,
                start_time: '',
                end_time_init: null,
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
            summary: {
                sub_total: {
                    total_hit_count: 0,
                    total_revenue_summary: 0,
                },
                grand_total: {
                    total_hit_count: 0,
                    total_revenue_summary: 0,
                }
            },
            loading: false,
            empty: true,
            sort: {
                column: null,
                table: null,
                order: null,
            },
            downloading: {
                excel: false
            }
        },
    };


    const [formData, setFormData] = useState(formInitial)


    const getTableData = async (e: any, filteredData:any = { ...formData?.filter?.data, page: 1, sort: null }) => {
        setFormData((prev: any) => ({ ...prev, table: { ...prev?.table, sort: filteredData?.sort, data: null, paginator: null, summary: null, loading: true, empty: true } }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData?.filter?.data, ...filteredData }
        const response = await getCall(SUMMARY_REPORT_P, request, props.user.access_token)
        if (response?.code === 200) {
            let empty = (response?.data?.data?.length == 0) ? true : false
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: response?.data?.data, paginator: response?.data?.paginator, summary: response?.data?.summary, loading: false, empty } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, table: { ...prev.table, data: null, paginator: null, summary: null, loading: false, empty: false } }))
        }
    }

    const downloadReport = async () => {
        // Set the downloading state to true
        setFormData(prev => ({ ...prev, table: { ...prev.table, downloading: { ...prev.table.downloading, excel: true } } }));

        try {
            const response = await axios.post(import.meta.env.VITE_API_BASE_URL + SUMMARY_REPORT_DOWNLOAD, { ...formData?.filter?.data }, {
                responseType: 'blob',
                headers: {
                    Authorization: props.user.access_token ? `Bearer ${props.user.access_token}` : "",
                }
            });

            if (!(response.data instanceof Blob) || !response.data.size || !response.data.type) {
                // Handle error notification
                toast.error('Cannot download the Excel file.')
            } else {
                const blob = new Blob([response.data]);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'summary-report.xlsx';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading the report:", error);
            toast.error('Cannot download the Excel file.')
        } finally {
            setFormData(prev => ({ ...prev, table: { ...prev.table, downloading: { ...prev.table.downloading, excel: false } } }));
        }
    };

    const getFilterList = async () => {
        const response = await getCall(SUMMARY_REPORT_FILTER_DATA, null, props?.user?.access_token)
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
        // getTableData(null, undefined)
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
                            Start Time
                            <DatePicker
                                selected={formData?.filter?.data?.start_time_init}
                                onChange={(date) => setFormData((prev) => ({
                                    ...prev,
                                    filter: {
                                        ...prev.filter,
                                        data: {
                                            ...prev.filter?.data,
                                            start_time_init: date,
                                            start_time: moment(date).format('yy-MM-DD HH:mm:ss')
                                        }
                                    }
                                }))}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                className="form-control"
                                placeholderText="Start Time"
                                showTimeSelect
                            />
                        </div>

                        <div className="col-md-3">
                            End Time
                            <DatePicker
                                selected={formData?.filter?.data?.end_time_init}
                                onChange={(date) => setFormData((prev) => ({
                                    ...prev,
                                    filter: {
                                        ...prev.filter,
                                        data: {
                                            ...prev.filter?.data,
                                            end_time_init: date,
                                            end_time: moment(date).format('yy-MM-DD HH:mm:ss')
                                        }
                                    }
                                }))}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                className="form-control"
                                placeholderText="End Time"
                                showTimeSelect
                            />
                        </div>


                        <div className="col-md-3">
                            <button type="button" className="btn btn-soft-primary waves-effect waves-light page-submit-margin-top"
                                onClick={getTableData}
                            ><i className="mdi mdi-filter font-size-16 align-middle"></i></button>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light page-submit-margin-top mx-1"
                                onClick={filterClear}
                            ><i className="mdi mdi-filter-remove  font-size-16 align-middle"></i></button>

                            <button type="button" className="btn btn-soft-success waves-effect waves-light page-submit-margin-top"
                                onClick={downloadReport}
                                disabled={formData?.table?.downloading?.excel}
                            >
                                {
                                    formData?.table?.downloading?.excel ?
                                        <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>
                                        : <i className="mdi mdi-download font-size-16 align-middle"></i>
                                }
                            </button>
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
                                                <th>HIT</th>
                                                {(props?.user?.brand_id || 0) == 0 ? <th>Revenue </th> : null}

                                            </tr>
                                        </thead>
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
                                                <th></th>
                                                <th></th>
                                                <th style={{  textAlign: 'end' }}>Grand Total</th>
                                                <th style={{ background: "rgba(233, 233, 239, 0.64)" }}>{formData?.table?.summary?.grand_total?.total_hit_count}</th>
                                                {(props?.user?.brand_id || 0) == 0 ? <th style={{ background: "rgba(233, 233, 239, 0.64)" }}>{formData?.table?.summary?.grand_total?.total_revenue_summary}</th> : null}
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
                                                            <td>{row?.hit}</td>
                                                            {(props?.user?.brand_id || 0) == 0 ? <td>{row?.revenue}</td> : null}
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                        <tfoot>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
                                                <th></th>
                                                <th></th>
                                                <th style={{  textAlign: 'end' }}>Sub Total</th>
                                                <th style={{ background: "rgba(233, 233, 239, 0.64)" }}>{formData?.table?.summary?.sub_total?.total_hit_count}</th>
                                                {(props?.user?.brand_id || 0) == 0 ? <th style={{ background: "rgba(233, 233, 239, 0.64)" }}>{formData?.table?.summary?.sub_total?.total_revenue_summary}</th> : null}
                                            </tr>
                                        </tfoot>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(SummaryReport));

