import React, { useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux'
import Validation  from '../../components/Forms/Validation.js';
import { postCall } from '../../api/apiService'
import { PERMISSION_P, CREATE_PERMISSION, UPDATE_PERMISSION, MODULE_ALL } from '../../api/apiPath'
import Paginate from '../../components/Datatable/Paginate'
import { toast } from 'react-toastify'
import Svgsearchiconcomponent from '../../components/Icons/Svgsearchiconcomponent'
import Svgediticoncomponent from '../../components/Icons/Svgediticoncomponent'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action'
import { Link } from 'react-router-dom';
import { permissionsResets,  userAgent, badge_colors } from '../../components/Helpers/CommonHelpers'
import Select from 'react-select'
import Badge  from '../../components/Badges/Badge';
import INIT from '../../route/utils/Init';

function Permissions(props) {

    const breadcrumb = {
        pageTitle: 'Permissions',
        currentPath: '/permissions',
        layers:[
            {
                title: 'Home',
                link: '/'
            },
            {
                title: 'Access Control'
            },
            {
                title: 'Manage Permissions',
                default: 1
            }
        ]
    }

    const formInitial = {
        id: '',
        name: '',
        module_id: '',
        module_idSelectedOption:'',
        guard_name: 'web',
    }
    
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    

    const [permissionsData, setPermissionsData] = useState({})
    var [paginator, setPaginator] =  useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [noDataFound, setNoDataFound] = useState(false)

    const getPermissionsData = async (e, page=1, search='') => {
        setNoDataFound(false)

        setIsLoading(true)
        setPermissionsData([])
        if (e && e.preventDefault) { 
            e.preventDefault();
        }
        let request = {page:page, search:search}
        var response = await postCall(PERMISSION_P, request, props.user.access_token)
        if (response?.code === 200) {
            setPermissionsData(response?.data?.data);
            setPaginator(response?.data?.paginator);
            setIsLoading(false)
            if(response?.data?.data?.length==0) { setNoDataFound(true); }
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

        getPermissionsData()
        getAllModules()
    }, [])

    const getApi = () => {
        if(formData?.id){
            return UPDATE_PERMISSION
        }
        return CREATE_PERMISSION
    }

    const handleSubmit = async (e) => {
        if (e && e.preventDefault) { 
            e.preventDefault();
        }
        let request = {...formData, id: formData?.id}
        let api = getApi()
        var response = await postCall(api, request, props.user.access_token)
        if (response?.code === 200) {
            getPermissionsData(null, paginator?.current_page)
            setFormData(formInitial)
            toast.success(response?.message?.[0])
            closeDialog()
        } else {
            toast.error(response?.message?.[0])
        }
    }

    const updateModalProcess = async(id) => {
        var permissionData = permissionsData.find((item) => {
            return item.id==id
        })

        var moduleData = moduleOptions?.find((item) => {
            return item?.value==permissionData?.module_id
        })

        setFormData({...formData, ...permissionData, id: id,  module_idSelectedOption:moduleData})
    }

    // search
    const [search, setSearch] = useState('')
    const handleKeyPressForSearch = (event) => {
        if(event.key === 'Enter'){
            getPermissionsData(null, null, search)
        }
    }

    const closeDialog = () =>  {
        let modalclosebtn = document.getElementById('modalclosebtn')
        modalclosebtn.click();
    }

    const clear = () => {
        setFormData(formInitial)
    }


    const getAllModules = async () => {        
        var response = await postCall(MODULE_ALL, null, props?.user?.access_token)
        if (response?.code === 200) {
            var list = (response?.data?.modulelist).map((item) => {
                return { label: item?.name, value: item?.id  }
            })
            
            setModuleOptions(list)
        } else {
        }
    }

    // modules select process
    const [moduleOptions, setModuleOptions] = useState([])
    const moduleHandle = (value) =>{
        setFormData({...formData, module_id: value?.value, module_idSelectedOption:value })
    }




    return (
        <Fragment>


            <div className="card col-12">
            
                <div className="card-block  py-5 px-2">
                    {
                        props.permissions.includes('permission create') ?
                            <a className="btn btn-sm btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" href="#0" onClick={clear}>
                                <i className="icofont icofont-ui-add me-1"></i>
                                Create New Permission  
                            </a>
                            :
                            null
                    }


                    <div className="col-md-4 input-group mb-3 float-right w-lg-400px">
                        <input type="text" id="search" name="search" onChange={(e) => setSearch(e.target.value)} onKeyPress={handleKeyPressForSearch} value={search} placeholder="Search..." className="form-control form-control-sm form-control-solid h-38px bg-body fs-7 "  />
                        <div className="input-group-append">
                            <Link className="input-group btn btn-primary"  onClick={() => getPermissionsData(null, null, search)} style={{ borderRadius: '0', padding: '9px'}}>
                                <Svgsearchiconcomponent />
                            </Link>
                        </div>
                    </div>


                    {
                        isLoading || noDataFound ? 
                        <div className="row col-12" style={{marginTop: "100px"}}>
                            {
                                isLoading ?
                                <div className="spinner-border text-primary mx-auto " style={{ width: "70px", height:"70px"}} alt="Loading..." ></div>
                                : null
                            }
                            {
                                noDataFound ?
                                <div className="mx-auto">
                                    <label className="badge badge-inverse-warning label-lg label" style={{fontSize: "18px"}} >No Data Found!</label>
                                </div>
                                : null
                            }
                        </div>: null
                    }
                    

                    {
                        permissionsData?.length > 0 ?
                            <Fragment>

                                <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
                                    <thead>
                                        <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
                                            <th>Serial</th>
                                            <th>Name</th>
                                            <th>Module</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            permissionsData.map((row, i) => {
                                                return (
                                                    <tr key={'row-permission-'+i}>
                                                        <td>{ paginator?.current_page>1 ? ((paginator?.current_page-1)*paginator?.record_per_page)+i+1 :  i+1 }</td>
                                                        <td>{row.name}</td>
                                                        <td>
                                                            {
                                                                row?.module_id ?
                                                                <Badge badgeValue={row?.module?.name} badgeClass={badge_colors[(row?.module_id-1)%5]} />
                                                                : null
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                props.permissions.includes('permission update') ?
                                                                    <div className="form-inline" > 
                                                                        <Link role="button" data-bs-toggle="modal" data-bs-target="#saveConfirmationModal" title="Edit Record?" href="#0" className="btn btn-icon btn-active-light-primary w-30px h-30px me-3"
                                                                                onClick={()=>updateModalProcess(row.id)}
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

                                
                            </Fragment>
                        : null
                    }


                    {
                        paginator?.total_pages>1 ? 
                        <Paginate paginator={paginator} pagechanged={(page) => getPermissionsData(null, page )} /> : null
                    }

                    
                </div>                    
            </div>



            <div className="modal fade modal-backdrop-static" id="saveConfirmationModal" tabIndex="-1"  aria-labelledby="saveConfirmationModal" aria-hidden="true"  data-bs-backdrop="static" data-bs-keyboard="false" > 
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header  py-4">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id="saveConfirmationModal" style={{flex: "auto"}}>{formData?.id ? 'Update': 'Create New' } Permission</p>
                            <div className="btn btn-icon btn-sm btn-active-light-danger ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => setFormData(formInitial)}>
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-0" >
                            <form className="form-horizontal" onSubmit={handleSubmit} >
                                <div>
                                    <input type="number" className="form-control form-control-sm" id="id" name="id" value={formData?.id} onChange={handleChange}  readOnly hidden  style={{heigh: "0", width: "0"}}/>

                                    <div className="col-md-12 my-2">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label">Name<Validation.RequiredStar/></label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Name" value={formData?.name} onChange={handleChange} required />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label control-label" >Module<Validation.RequiredStar/></label>
                                            <div className="col-md-8">
                                                <Select options={moduleOptions}  value={formData?.module_idSelectedOption} onChange={moduleHandle} isClearable placeholder='Select Module'/>
                                            </div>
                                        </div>
                                    </div>


                                    <input type="text" className="form-control form-control-sm form-control-solid" id="name" name="name" placeholder="Guard name, Ex:web" value={formData?.guard_name} onChange={handleChange} required hidden/>
                                           
                                    

                                    <div className="modal-footer pb-0">
                                        <button type="button" className="btn btn-sm btn-outline btn-outline-dashed btn-outline-danger btn-active-light-danger" data-bs-dismiss="modal" onClick={() => setFormData(formInitial)}  id="modalclosebtn">Cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Permissions));

