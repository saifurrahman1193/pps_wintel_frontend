import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../redux/action'
import { currentMonthName, previousMonthName } from '../components/Helpers/CommonHelpers'
import { toast } from 'react-toastify'
import { getCall } from '../api/apiService'
import INIT from '../route/utils/Init';
import { DASHBOARD_DATA } from '../api/apiPath.js'

function Dashboard(props: any) {

    useEffect(() => {
        INIT()
    }, [])

    const breadcrumb = {
        pageTitle: 'Dashboard',
        currentPath: '/dashboard',
        layers: [
            {
                title: 'Dashboard',
                link: '/dashboard',
            }
        ],

    }


    interface FormInitial {
        loading: boolean;
        summary: {
            total_hit: number;
            total_revenue: number;
            today_hit: number;
            today_revenue: number;
            current_month_hit: number;
            current_month_revenue: number;
            prev_month_hit: number;
            prev_month_revenue: number;
        };
    }

    const formInitial: FormInitial = {
        loading: false,
        summary: {
            total_hit: 0,
            total_revenue: 0,
            today_hit: 0,
            today_revenue: 0,
            current_month_hit: 0,
            current_month_revenue: 0,
            prev_month_hit: 0,
            prev_month_revenue: 0,
        },
    };
    const [formData, setFormData] = useState(formInitial)


    useEffect(() => {
        props.setPageBreadcrumb(breadcrumb)
        getDashboardData()
    }, [])


    const getDashboardData = async (e?: React.FormEvent<HTMLFormElement> | null) => {
        setFormData((prev: any) => ({ ...prev, ...formInitial, loading: true }))

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        const response = await getCall(DASHBOARD_DATA, {}, props.user.access_token)
        if (response?.code === 200) {
            setFormData((prev) => ({ ...prev, summary: { ...response?.data?.summary }, loading: false }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, ...formInitial, loading: false }))
        }
    }

    return (
        <>
            <div className="row">

                {
                    (props?.user?.brand_id || 0) != 0 ? //  has brand id means is brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-primary border-primary text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Hits</span>
                                            <h4 className="mb-3 text-white">
                                                <span className="counter-value" data-target={formData?.summary?.total_hit}>{formData?.summary?.total_hit}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">All Time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                {
                    (props?.user?.brand_id || 0) == 0 ? // no brand id means not brand

                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-primary border-primary text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                            <h4 className="mb-3 text-white">
                                                ৳ <span className="counter-value" data-target={formData?.summary?.total_revenue}>{formData?.summary?.total_revenue}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">All Time</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                {
                    (props?.user?.brand_id || 0) != 0 ? //  has brand id means is brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-info border-info text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
                                            <h4 className="mb-3 text-white">
                                                <span className="counter-value" data-target={formData?.summary?.today_hit}>{formData?.summary?.today_hit}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                {
                    (props?.user?.brand_id || 0) == 0 ? // no brand id means not brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-info border-info text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                            <h4 className="mb-3 text-white">
                                                ৳ <span className="counter-value" data-target={formData?.summary?.today_revenue}>{formData?.summary?.today_revenue}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }


                {
                    (props?.user?.brand_id || 0) != 0 ? //  has brand id means is brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-success border-success text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
                                            <h4 className="mb-3 text-white">
                                                <span className="counter-value" data-target={formData?.summary?.current_month_hit}>{formData?.summary?.current_month_hit}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">{currentMonthName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }

                {
                    (props?.user?.brand_id || 0) == 0 ? // no brand id means not brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-success border-success text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                            <h4 className="mb-3 text-white">
                                                ৳ <span className="counter-value" data-target={formData?.summary?.current_month_revenue}>{formData?.summary?.current_month_revenue}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">{currentMonthName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }


                {
                    (props?.user?.brand_id || 0) != 0 ? //  has brand id means is brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-danger border-danger text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
                                            <h4 className="mb-3 text-white">
                                                <span className="counter-value" data-target={formData?.summary?.prev_month_hit}>{formData?.summary?.prev_month_hit}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">{previousMonthName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null

                }

                {
                    (props?.user?.brand_id || 0) == 0 ? // no brand id means not brand
                        <div className="col-xl-3 col-md-4">
                            <div className="card card-h-100 bg-danger border-danger text-white bg-gradient">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                            <h4 className="mb-3 text-white">
                                                ৳ <span className="counter-value" data-target={formData?.summary?.prev_month_revenue}>{formData?.summary?.prev_month_revenue}</span>
                                            </h4>
                                        </div>

                                    </div>
                                    <div className="text-nowrap">
                                        <span className="ms-1 font-size-13">{previousMonthName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : null
                }





            </div>{/* end row*/}



        </>

    )
}


const mapStateToProps = (state: any) => ({
    user: state.user,
    roles: state.roles,
    permissions: state.permissions
});

const mapDispatchToProps = (dispatch: any) => ({
    setPageBreadcrumb: (data) => dispatch(SET_BREADCRUMB_DATA(data)),
    me: (data) => dispatch(SET_USER_DATA(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
