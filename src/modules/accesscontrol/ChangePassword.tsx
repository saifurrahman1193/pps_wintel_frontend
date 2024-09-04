import React, { useEffect, useState, Fragment} from 'react';
import { connect } from 'react-redux'
import { postCall } from '../../api/apiService'
import {  CHANGE_PASSWORD } from '../../api/apiPath'
import { toast } from 'react-toastify'
import { permissionsResets } from '../../components/Helpers/CommonHelpers'
import { SET_USER_DATA } from '../../redux/action'

function ChangePassword(props:any) {

    const formInitial = {
        currentPassword: '',
        password: '',
    }
    
    const [formData, setFormData] = useState(formInitial)

    const handleChange = (e:any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    useEffect(() => {
        permissionsResets(props)
    }, [])


    const handleSubmit = async (e:any) => {
        if (e && e.preventDefault) { 
            e.preventDefault();
        }
        const response = await postCall(CHANGE_PASSWORD, formData, props.user.access_token)
        if (response?.code === 200) {
            setFormData(formInitial);
            toast.success(response?.message?.[0])
        } else {
            toast.error(response?.message?.[0])
        }
    }



    return (
        <Fragment>

                <section className="login-block d-block" style={{ background: "none"}}  >
                {/* <!-- Container-fluid starts --> */}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">

                            <form className="md-float-material form-material" onSubmit={handleSubmit}>
                                <div className="auth-box card shadow" style={{borderRadius: "3%"}}>
                                    <div className="card-block">
                                        <div className="row m-b-20">
                                            <div className="col-md-12">
                                                <h3 className="text-center">Change Password</h3>
                                            </div>
                                        </div>
                                       
                                        <div className="form-group form-primary">
                                            <input type="password" name="currentPassword" className="form-control form-control-sm" required={true}
                                                value={formData?.currentPassword}
                                                placeholder="Current Password" onChange={handleChange} />
                                            <span className="form-bar"></span>
                                        </div>
                                        <div className="form-group form-primary">
                                            <input type="password" name="password" className="form-control form-control-sm" required={true}
                                                value={formData?.password}
                                                placeholder="New Password" onChange={handleChange} />
                                            <span className="form-bar"></span>
                                        </div>
                                        
                                        <div className="row m-t-30">
                                            <div className="col-md-12">
                                                <button type="submit"
                                                    className="btn btn-info btn-md btn-block waves-effect waves-light text-center m-b-20" style={{ background:"#03A9F4" }}>Save</button>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                            </form>
                            {/* <!-- end of form --> */}
                        </div>
                        {/* <!-- end of col-sm-12 --> */}
                    </div>
                    {/* <!-- end of row --> */}
                </div>
                {/* <!-- end of container-fluid --> */}
            </section>


        </Fragment>
    )
}



const mapStateToProps = (state:any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch:any) => ({
    me: (data: any) => dispatch(SET_USER_DATA(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ChangePassword));

