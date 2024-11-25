import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import { getCall } from '../../api/apiService.js'
import { CHECK_BY_MSISDN_REPORT } from '../../api/apiPath.js'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { permissionsResets } from '../../components/Helpers/CommonHelpers.js'
import INIT from '../../route/utils/Init.js';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-datepicker/dist/react-datepicker.css';

function CheckByMSISDNReport(props: any) {

    const breadcrumb = {
        pageTitle: 'Check by MSISDN Report',
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
                title: 'Check by MSISDN Report',
                default: 1
            }
        ]
    }

    interface FormInitial {
        filter: {
            data: {
                msisdn: string;
            };
        };
        table: {
            data: any[] | null;
            loading: boolean;
            empty: boolean;
        };
    }

    const formInitial: FormInitial = {
        filter: {
            data: {
                msisdn: '',
            },
        },
        table: {
            data: null,
            loading: false,
            empty: true,
        },
    };


    const [formData, setFormData] = useState(formInitial)


    const getTableData = async (e: any, filteredData: any = { ...formData?.filter?.data }) => {
        setFormData((prev: any) => ({ ...prev, table: { ...prev?.table, data: null, loading: true, empty: true } }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { ...formData?.filter?.data, ...filteredData }
        const response = await getCall(CHECK_BY_MSISDN_REPORT, request, props.user.access_token)
        if (response?.code === 200) {
            let empty = (response?.data?.length == 0) ? true : false
            setFormData((prev) => ({ ...prev, table: { ...prev.table, data: response?.data, loading: false, empty } }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, table: { ...prev.table, data: null, loading: false, empty: false } }))
        }
    }


    useEffect(() => {
        INIT()
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)
    }, [])



    const filterClear = async () => {
        setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, ...formInitial?.filter?.data } } }))
        getTableData(null, { ...formInitial?.filter?.data, page: 1 })
    }

    return (
        <Fragment>
            <div className="card col-12">
                <div className="card-block py-2 px-2">
                    <div className="row mb-2">

                        <div className="col-md-3">
                            MSISDN
                            <input
                                type="text"
                                name="msisdn"
                                onChange={(e) => setFormData((prev) => ({ ...prev, filter: { ...prev?.filter, data: { ...prev?.filter?.data, msisdn: e.target.value } } }))}
                                value={formData?.filter?.data?.msisdn}
                                placeholder="EX: 88016"
                                className="form-control"
                            />
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
                                                <th>MSISDN</th>
                                                <th>Keyword</th>
                                                <th>Response</th>
                                                <th>Receive Time</th>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                (formData?.table?.data || [])?.map((row: any, i) => {
                                                    return (
                                                        <tr key={'table-row-' + i}>
                                                            <td>{i+1}</td>
                                                            <td>{row?.msisdn}</td>
                                                            <td>{row?.keyword}</td>
                                                            <td>{row?.response}</td>
                                                            <td>{row?.receive_time}</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(CheckByMSISDNReport));

