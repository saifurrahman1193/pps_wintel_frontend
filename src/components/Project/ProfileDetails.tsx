import React, { useEffect, useState, Fragment } from 'react';
import { postCall } from '../../api/apiService'
import {  MODULE_ALL, SINGLE_USER_INFO } from '../../api/apiPath'
import { Link } from 'react-router-dom';
import Svgsearchiconcomponent from '../Icons/Svgsearchiconcomponent'

function ProfileDetails(props) {

    const formInitial = {
        search: ''
    }
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const { userId, token} = props;
    const [userData, setUserData] = useState()
    

    useEffect(() => {
        if (userId && userId>0) 
        {
            getUser()
            getAllModules()
        }
    }, [userId]);


    const getUser = async (e, reload = false) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        var response = await postCall(SINGLE_USER_INFO, {id:userId}, token)
        if (response?.code === 200) {
            var userData = response?.data

            setUserData(userData)
            setFormData({...formInitial, name:userData?.name, id:userData?.userId})
        } else {
        }
    }


    // modules checkboxes select process
    const [modulesData, setModulesData] = useState([])
    const getAllModules = async () => {        
        var response = await postCall(MODULE_ALL, null, token)
        if (response?.code === 200) {
            setModulesData(response?.data?.modulelist)
            setFormData({...formInitial, modules: response?.data?.modulelist})
        } else {
            setFormData({...formInitial, modules: []})
        }
    }

    return (
        <Fragment>


            
                <div className="card-body p-9">
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Full Name</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-gray-800">{userData?.name}</span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Email</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-gray-800">{userData?.email}</span>
                        </div>
                    </div>
                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Role</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-gray-800">{userData?.roles[0]}</span>
                        </div>
                    </div>


                    <div className="row mb-7">
                        <label className="col-lg-4 fw-bold text-muted">Permissions</label>
                        <div className="col-lg-8">
                            <span className="fw-bolder fs-6 text-gray-800">
                                <div className="col-md-4 input-group mb-3 w-lg-400px">
                                    <input type="text" id="search" name="search" onChange={handleChange} onKeyUp={handleChange} value={formData?.search} placeholder="Search Permission" className="form-control form-control-sm form-control-solid h-40px bg-body fs-7" autoComplete='off' />
                                    <div className="input-group-append">
                                        <Link to="0#" onClick={(e)=>e.preventDefault()} className="input-group btn btn-primary"   style={{ borderRadius: '0', padding: '9px'}}>
                                            <Svgsearchiconcomponent />
                                        </Link>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    

                    <div className="row pt-4">
                        {
                            modulesData?.length > 0 ?

                            [...modulesData]?.map((module, i)=> {
                                return(                                        

                                    [...modulesData]?.find(m=>m?.name==module?.name)?.permissions?.filter(itm=>userData?.permissions?.includes(itm?.name))?.length ?
                                            <div className="col-lg-4 my-2" key={`profiledetail-module-`+i}>
                                                <div className="card card-stretch card-bordered mb-5">
                                                    <div className="card-header">
                                                        <h3 className="card-title">
                                                            {module?.name}
                                                        </h3>
                                                    </div>
                                                    <div className="card-body py-2">
                                                        {
                                                            [...modulesData]?.find(m=>m?.name==module?.name)?.permissions?.filter(itm=>userData?.permissions?.includes(itm?.name))?.map((permission, j)=> {
                                                                return(

                                                                    formData?.search ?
                                                                        (permission?.name?.toLowerCase().match(formData?.search?.toLowerCase())) ? 
                                                                            <div className="d-flex flex-column"  key={`profiledetail-permission-`+j}>
                                                                                <li className="d-flex align-items-center py-2">
                                                                                    <span className="bullet bullet-dot bg-danger me-5"></span> {permission?.name}
                                                                                </li>
                                                                            </div>
                                                                        : null

                                                                    :
                                                                        <div className="d-flex flex-column"  key={`profiledetail-permission-`+j}>
                                                                            <li className="d-flex align-items-center py-2">
                                                                                <span className="bullet bullet-dot bg-danger me-5"></span> {permission?.name}
                                                                            </li>
                                                                        </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                    : null
                                )
                            })
                            : null
                        }
                    </div>


                </div>


        </Fragment>
    )
}




export default ProfileDetails;
