import React, { useEffect, useState, Fragment } from 'react';
import {  TRIGGER_AMOUNT_SINGLE } from '../../api/apiPath'
import { postCall } from '../../api/apiService'
import LoaderComponent from '../Loader/LoaderComponent.js';
import { Table } from 'react-bootstrap'

function AllowedClientList(props) {
    const formInitial = {
        search: '',
    }
    const [formData, setFormData] = useState(formInitial)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const { token, allowedclientlist_row_id, id_row, id } = props

    const [allowed_client_loading, set_allowed_client_loading] = useState(false);

    const [singleTriggerAmountData, setSingleTriggerAmountData] = useState({});
    const [singleTriggerAmountData_f, setSingleTriggerAmountData_f] = useState({});


    const getSingleTriggerAmount = async (id) => {
        set_allowed_client_loading(true)

        var response = await postCall(TRIGGER_AMOUNT_SINGLE, { id: id }, token)
        if (response?.code === 200) {
            setSingleTriggerAmountData(response?.data)
            set_allowed_client_loading(false)
        }
        else{
            set_allowed_client_loading(false)
            setSingleTriggerAmountData({})
        }
    }

    const data_update = (id, allowedclientlist_row_id) => {
        console.log('data_update', id, allowedclientlist_row_id);
        props.allowedclientlistModalUpdate(id, allowedclientlist_row_id)
    }

    useEffect(() => {
        setFormData(formInitial)
        
        if (id && id>0) 
        {
            getSingleTriggerAmount(id)
        }
        else
        {
            setSingleTriggerAmountData({})
        }
        
    }, [id]);

    useEffect(() => {
        setSingleTriggerAmountData_f(singleTriggerAmountData)
    }, [singleTriggerAmountData]);

    useEffect(() => {
        if (formData?.search) 
        {
            let allowed_client_names = [...singleTriggerAmountData?.allowed_client_names]?.filter(item=> ((item.toLowerCase())?.indexOf((formData?.search).toLowerCase()) > -1))
            setSingleTriggerAmountData_f({...singleTriggerAmountData, allowed_client_names:allowed_client_names})
        }
        else
        {
            setSingleTriggerAmountData_f(singleTriggerAmountData)
        }
        
    }, [formData?.search]);

    return (
        <>
            <a className="btn btn-label" href="#0" role="button" data-toggle="modal" data-target={"#allowed_client_list_modal-"+allowedclientlist_row_id} 
                onClick={()=>data_update(id_row, allowedclientlist_row_id )}
            >
                <i className="mdi mdi-eye mr-1 text-primary"></i>
            </a>
            <div className="modal fade" data-backdrop="static" id={"allowed_client_list_modal-"+allowedclientlist_row_id} tabIndex="-1" role="dialog" aria-labelledby={"allowed_client_list_modal-"+allowedclientlist_row_id} aria-hidden="true" >
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title text-center" id={"allowed_client_list_modal-"+allowedclientlist_row_id} style={{ flex: "auto" }}>Allowed Client List</h4>
                            <div className="btn btn-light-danger cursor-pointer btn-sm" data-dismiss="modal" aria-label="Close" title="Close" onClick={()=>data_update('','')}>
                                <i className="mdi mdi-close"></i>
                            </div>
                        </div>
                        <div className="modal-body" >

                            {
                                (singleTriggerAmountData?.allowed_client_names)?.length > 0 ?
                                    <div className="row mb-2">
                                        <div className="col-8 input-group input-group-sm ">
                                            <input type="text" id="search" name="search" onChange={handleChange} value={formData?.search} placeholder="Search Client..." className="form-control"/>
                                            <div className="input-group-append" style={{ height: '28px'}}>
                                                <span className="btn btn-primary text-white cursor-pointer waves-effect waves-light" id="basic-addon2"  >
                                                    <i className="mdi mdi-magnify"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <button type="button" className="btn btn-outline-purple btn-rounded waves-effect waves-light btn-xs float-right">
                                                Total: 
                                                {(singleTriggerAmountData_f?.allowed_client_names)?.length}

                                                {
                                                    formData?.search ? ' out of '+(singleTriggerAmountData?.allowed_client_names)?.length : null
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    : null
                            }

                            <div className={(singleTriggerAmountData_f?.allowed_client_names)?.length > 7 ? 'overflowY450' : ''}>

                                {
                                    
                                    <>
                                        {
                                            allowed_client_loading ?
                                                <LoaderComponent />
                                            :
                                                (
                                                    singleTriggerAmountData_f?.allowed_client_names?.length > 0 ?

                                                        <Table cellPadding={0} cellSpacing={0} responsive striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th className="font-weight-bold">Serial</th>
                                                                    <th className="font-weight-bold">Allowed Client Names</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    (singleTriggerAmountData_f?.allowed_client_names)?.map((client_name, i) => {
                                                                        return (
                                                                            <tr key={'row-' + i}>
                                                                                <td>{i + 1}</td>
                                                                                <td>
                                                                                    {client_name}
                                                                                    { ! singleTriggerAmountData_f?.allowed_client_names_active?.includes(client_name)  ? <label className="badge badge-light-danger ml-2" >Inactive</label> : null}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                    
                                                                }

                                                            </tbody>
                                                        </Table>
                                                    : 
                                                    <div className="text-center text-danger font-weight-bold">No Data Found!</div>
                                                )
                                        }
                                    </>
                                        
                                }

                                {
                                    singleTriggerAmountData?.allowed_client == 'blockedAmount' ?
                                        <div className="row">
                                            <label className="badge badge-light-danger fs-1 m-1 mx-auto" style={{ fontSize: "18px" }} >This amount is blocked!</label>
                                        </div>
                                        : null
                                }

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-dismiss="modal" onClick={()=>data_update('','')}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllowedClientList