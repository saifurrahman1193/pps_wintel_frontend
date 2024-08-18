import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postCall } from '../../api/apiService'
import { ALL_AUDIT_LOG_P, USER_LIST } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate'
import { toast } from 'react-toastify'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import Select from 'react-select'
import Submitbutton from '../../components/Buttons/Submitbutton'
import { permissionsResets, userAgent, getTodayStartTime, getTodayEndTime, getSpecificDateTimeAMPM } from '../../components/Helpers/CommonHelpers'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ProfileDetailsModal from '../../components/Projects/ProfileDetailsModal';

import ReactJson from 'react-json-view'

import Table from '../../components/Table/Table'

import moment from 'moment';

function AuditLog(props) {

    const breadcrumb = {
        pageTitle: 'Audit Log',
        currentPath: '/audit-log',
        layers: [
            {
                title: 'Home',
                link: '/dashboard'
            },
            {
                title: 'Audit Log'
            },
            {
                title: 'Audit Log List',
                default: 1
            }
        ]
    }

    const formInitial = {
        filter: {
            user_id: '',
            start_date: getTodayStartTime(),
            end_date: getTodayEndTime(),
        }
    }

    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const [reportData, setReportData] = useState({})
    var [paginator, setPaginator] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)


    const getAllAuditLog_p = async (e:any, page = 1) => {
        setNoDataFound(false)

        setIsLoading(true)
        setReportData([])
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const request = { page: page, ...formData?.filter }
        const response = await postCall(ALL_AUDIT_LOG_P, request, props.user.access_token)
        if (response?.code === 200) {
            setReportData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if (response?.data?.data?.length == 0) { setNoDataFound(true); }
            else setNoDataFound(false)
        } else {
            toast.error(response?.message?.[0])
            setReportData([]);
            setPaginator({});
            setIsLoading(false)
            setNoDataFound(true);
        }
    }


    useEffect(() => {
        permissionsResets(props)
        props.setPageBreadcrumb(breadcrumb)
        getAllAuditLog_p()
        getAllUserList()
    }, [])


    // userList select process
    const [userListOptions, setUserListOptions] = useState([])

    const getAllUserList = async () => {
        let response = await postCall(USER_LIST, {}, props.user.access_token)
        if (response?.code === 200) {
            let userListsData = (response?.data?.data).map((item) => {
                return { label: item.name, value: item.id }
            })

            setUserListOptions(userListsData)
        } else {
        }
    }


    // userList f select process
    const [userListFSelectedOption, setUserListFSelectedOption] = useState('')
    const userListFHandle = (value) => {
        setUserListFSelectedOption(value)
        console.log(value, value?.value);
        setFormData((prev) => ({ ...prev, filter: { ...formData.filter, user_id: value?.value } }))
    }


    // start_date process
    const start_date_handle = (value) => {
        setFormData((prev) => ({ ...prev, filter: { ...formData.filter, start_date: moment(value).format('yy-MM-DD HH:mm:ss') } }))
    }

    // end_date process
    const end_date_handle = (value) => {
        setFormData((prev) => ({ ...prev, filter: { ...formData.filter, end_date: moment(value).format('yy-MM-DD HH:mm:ss') } }))
    }


    const clearDetailModal = () => {
        setModalData({})
    }

    const [modalData, setModalData] = useState({})
    const updateDetailModalData = (data) => {
        setModalData(data)
    }

    const reset = () => {
        setFormData(formInitial)
        setUserListFSelectedOption(null)
        getAllAuditLog_p()
    }

    // profile detail modal component related
    const [profileDetailModalUserId, setProfileDetailModalUserId] = useState('')
    const [profiledetail_row_id, setProfiledetail_row_id] = useState('')
    const profileDetailModalUpdate = (userId = '', row_id = '') => {
        setProfileDetailModalUserId(userId)
        setProfiledetail_row_id(row_id)
    }

    return (
        <Fragment>


            <div className="card">



                <div className="card-header pt-5">
                    <form className="w-100" onSubmit={getAllAuditLog_p} >
                        <div className="row">
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-5">
                                <Select options={userListOptions} value={userListFSelectedOption} onChange={userListFHandle} isClearable placeholder="Select User" />
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-5">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} className="w-100" />}
                                        label="Start Date Time"
                                        value={formData?.filter?.start_date}
                                        onChange={(newValue) => {
                                            start_date_handle(newValue);
                                        }}
                                        inputFormat="yyyy-MM-dd HH:mm:ss"
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-5">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} className="w-100" />}
                                        label="End Date Time"
                                        value={formData?.filter?.end_date}
                                        onChange={(newValue) => {
                                            end_date_handle(newValue);
                                        }}
                                        inputFormat="yyyy-MM-dd HH:mm:ss"
                                    />
                                </LocalizationProvider>
                            </div>

                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <Submitbutton />
                                <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" onClick={reset}>Reset</button>

                            </div>


                        </div>

                    </form>

                </div>

                <div className="card-body">

                    {
                        isLoading || noDataFound ?
                            <div className="row col-12">
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
                        reportData?.length > 0 ?
                            <Fragment>
                                <div className='table-responsive'>
                                    <table className="table table-hover table-rounded table-striped border">
                                        <thead>
                                            <tr className="text-start text-muted fw-bolder text-uppercase">
                                                <th>Serial</th>
                                                <th>User</th>
                                                <th>Log Type</th>
                                                <th>Page</th>
                                                <th>Sagment</th>
                                                <th>Page URL</th>
                                                <th>Log Time</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                reportData.map((row, i) => {
                                                    return (
                                                        <tr key={'row-' + i}>
                                                            <td>{paginator?.current_page > 1 ? ((paginator?.current_page - 1) * paginator?.record_per_page) + i + 1 : i + 1}</td>
                                                            <td>
                                                                <ProfileDetailsModal
                                                                    token={props?.user?.access_token}
                                                                    text={row?.user?.name}
                                                                    profiledetail_row_id={i}
                                                                    userId_row={row?.user?.id}
                                                                    userId={(i == profiledetail_row_id) ? profileDetailModalUserId : ''}
                                                                    profileDetailModalUpdate={profileDetailModalUpdate}
                                                                    key={'profile-details-modal-' + i}
                                                                />
                                                            </td>
                                                            <td>{row?.logtype?.log_type}</td>
                                                            <td>{row?.page}</td>
                                                            <td>{row?.hit_map}</td>
                                                            <td>{row?.page_url}</td>
                                                            <td>{getSpecificDateTimeAMPM(row?.logtime)}</td>
                                                            <td>
                                                                <Link role="button" data-bs-toggle="modal" data-bs-target="#file_paths_modal" title="Edit Record?" to="#0" className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                                                                    onClick={() => updateDetailModalData(row)}
                                                                >
                                                                    <i className="las la-eye fs-2"></i>
                                                                </Link>
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
                            <Paginate paginator={paginator} pagechanged={(page) => getAllAuditLog_p(null, page)} /> : null
                    }

                </div>

            </div>




            <div className="modal fade" data-backdrop="static" id="file_paths_modal" tabIndex="-1" role="dialog" aria-labelledby="file_paths_modal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-theme">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{ flex: "auto" }}>Log Details</p>
                            <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={clearDetailModal}>
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-0" >

                            {
                                modalData ?
                                    <>
                                        <table className="table table-hover table-rounded table-striped border mt-3">
                                            <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Data</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>User Name</td>
                                                    <td>{modalData?.user?.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>User Email</td>
                                                    <td>{modalData?.user?.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Log Type</td>
                                                    <td>{modalData?.logtype?.log_type}</td>
                                                </tr>
                                                <tr>
                                                    <td>Page</td>
                                                    <td>{modalData?.page}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sagment</td>
                                                    <td>{modalData?.hit_map}</td>
                                                </tr>
                                                <tr>
                                                    <td>Page URL</td>
                                                    <td>{modalData?.page_url}</td>
                                                </tr>
                                                <tr>
                                                    <td>IP</td>
                                                    <td>{modalData?.request_ip}</td>
                                                </tr>
                                                <tr>
                                                    <td>Log Time</td>
                                                    <td>{getSpecificDateTimeAMPM(modalData?.logtime)}</td>
                                                </tr>

                                                {
                                                    modalData?.api_response && modalData?.db_query_log_details_req ?
                                                        <>
                                                            <tr>
                                                                <td colspan="2">
                                                                    <h3 className="text-center text-danger">User Viewed</h3>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="2">
                                                                    {
                                                                        modalData?.api_response && modalData?.db_query_log_details_req ?
                                                                            <Table data={JSON.parse(modalData?.api_response)?.data?.data} />
                                                                            : null
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </>
                                                        : null
                                                }

                                                {/* <tr>
                                                   <td>API Path</td>
                                                   <td>{modalData?.api_path}</td>
                                               </tr> */}

                                                <tr>
                                                    <td>API Request</td>
                                                    <td>
                                                        {
                                                            modalData?.api_request ?
                                                                <ReactJson src={JSON.parse(modalData?.api_request)} collapsed={1} />
                                                                : null
                                                        }
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>API Response</td>
                                                    <td>
                                                        {
                                                            modalData?.api_response ?
                                                                <ReactJson src={JSON.parse(modalData?.api_response)} collapsed={1} />
                                                                : null
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                    :

                                    <div className="text-center">No Data Found!</div>

                            }

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={clearDetailModal} id="modalclosebtn_detail_modal">Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(AuditLog));

