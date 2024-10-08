import { useEffect } from 'react'
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Animate1 from '../../components/Animate/Animate1/Animate1'
import Loader from '../../components/Loader'
import FormikControl from '../../components/Forms/Formik/FormikControl'
import { postCall } from '../../api/apiService'
import { SET_USER_DATA } from '../../redux/action'
import { connect } from 'react-redux'
import { LOGIN } from '../../api/apiPath'
import { toast } from 'react-toastify';

function Login(props: any) {

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = async (request: any, onSubmitProps: any) => {
        // console.log('Form request =', request);
        const response = await postCall(LOGIN, request, null, { hitmap: 'login submit', pageurl: window.location.href, page: 'Login' })
        if (response.code === 200) {
            toast.success(response?.message?.[0])
            props.login(response.data)
            window.location.href = '/dashboard'
            onSubmitProps.setSubmitting(false)
            document.body.style.background = ''

        } else {
            toast.error(response?.message?.[0])
            onSubmitProps.setSubmitting(false)
        }
    }

    // formik validation schema
    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required!').email('Email format is invalid!'),
        password: Yup.string().required('Password is required!').min(8, 'Password must be at least 8 characters'),
    })


    useEffect(() => {
        document.body.style.background = `url("/assets/images/modules/accesscontrol/login/bg.jpg")`;
        document.body.style.backgroundSize = 'cover'
    }, [])

    return (
        <>
            <Animate1 />
            <Loader />
            {/* style={{ backgroundImage: `url("assets/images/login/bg.jpg")` }} */}
            <div className="container" >

                <div className="row justify-content-center">
                    <div className="col-lg-5 mt-5">
                        <div className="card mt-5" style={{ background: "rgba(18, 68, 100, 0.67)" }}>
                            {/* <div className="bg-primary bg-soft">
                    <div className="row">
                        <div className="col-7">
                            <div className="text-primary p-4">
                                <h5 className="text-primary">Welcome Back !</h5>
                                <p>Sign in to continue to VR.</p>
                            </div>
                        </div>
                        <div className="col-5 align-self-end">
                            <img src="assets/images/profile-img.png" alt="pic" className="img-fluid" />
                        </div>
                    </div>
                </div> */}

                            <div className="card-body p-4">
                                <div className="text-center w-25 m-auto">
                                    <img src="assets/images/logo/logo.png" alt="pic" className="img-fluid" />
                                </div>

                                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} enableReinitialize >

                                    {
                                        formik => (
                                            <Form action="#">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="emailaddress" className='text-white'>Email address</label>
                                                    <FormikControl
                                                        control="input"
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Your Email Address"
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <a href="pages-recoverpw.html" className="text-muted float-right"><small /></a>
                                                    <label htmlFor="password" className='text-white'>Password</label>
                                                    <FormikControl
                                                        control="input"
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Password"
                                                        required
                                                    />
                                                </div>

                                                {/* <p className="text-muted float-right"> <Link to="/forgot-password" className="text-muted ml-1">Forgot your password?</Link></p> */}

                                                <div className="form-group mb-0 text-center">
                                                    <button className="btn btn-primary w-100" style={{ background: "#32cadbb2" }} type="submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>
                                                        {
                                                            !formik.isSubmitting ?
                                                                <span>Login</span>
                                                                :
                                                                <span>Processing...</span>
                                                        }
                                                    </button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    login: (data: any) => dispatch(SET_USER_DATA(data)),
})

export default connect(null, mapDispatchToProps)(Login);