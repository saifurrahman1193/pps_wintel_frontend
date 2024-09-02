import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { SET_BREADCRUMB_DATA, SET_USER_DATA } from '../../redux/action.js'
import { toast } from 'react-toastify'
import { getCall } from '../../api/apiService.js'
import INIT from '../../route/utils/Init.js';
import { DASHBOARD_DATA } from '../../api/apiPath.js'
import Summary from './Summary.js';
import TodayTotalHitBarchart from './TodayTotalHitBarchart.js';
import TodayTotalRevenuePiechart from './TodayTotalRevenuePiechart.js';
import Last6MonthTotalHitMonthWiseBarChart from './Last6MonthTotalHitMonthWiseBarChart.js';
import LastWeekTotalHitDateWiseBarChart from './LastWeekTotalHitDateWiseBarChart.js';

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
        today_total_hit_rev: any,
        last_6_month_total_hit_month_wise: any,
        last_week_total_hit_day_wise: any,
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
        today_total_hit_rev: null,
        last_6_month_total_hit_month_wise: null,
        last_week_total_hit_day_wise: null,
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
            setFormData((prev) => ({ ...prev, loading: false, ...response?.data }))
        } else {
            toast.error(response?.message?.[0])
            setFormData((prev: any) => ({ ...prev, ...formInitial, loading: false }))
        }
    }

    return (
        <>
            <Summary data={formData?.summary} user={props?.user} />
            <div className="row">
                <div className="col-xl-6 col-md-6 col-sm-12">
                    <TodayTotalHitBarchart data={formData?.today_total_hit_rev} />
                </div>
                {
                    (props?.user?.brand_id || 0) == 0 ? //  has not brand id means is not brand
                        <div className="col-xl-6 col-md-6 col-sm-12">
                            <TodayTotalRevenuePiechart data={formData?.today_total_hit_rev} />
                        </div>
                        : null
                }

                <div className="col-xl-6 col-md-6 col-sm-12">
                    <Last6MonthTotalHitMonthWiseBarChart data={formData?.last_6_month_total_hit_month_wise} />
                </div>

                <div className="col-xl-6 col-md-6 col-sm-12">
                    <LastWeekTotalHitDateWiseBarChart data={formData?.last_week_total_hit_day_wise} />
                </div>
            </div>
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
