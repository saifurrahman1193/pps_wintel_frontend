import { currentMonthName, previousMonthName } from '../../components/Helpers/CommonHelpers.js'


const Summary = ({ user, data }:any) => {

    return <>
        <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-3 col-xl-3">
                <div className="card card-h-100 text-white bg-gradient" style={{ background: "#003366" }}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <span className="mb-3 lh-1 d-block text-truncate">Total Hits</span>
                                <h4 className="mb-3 text-white">
                                    <span className="counter-value" data-target={data?.total_hit}>{data?.total_hit}</span>
                                </h4>
                            </div>

                        </div>
                        <div className="text-nowrap">
                            <span className="ms-1 font-size-13">All Time</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                (user?.brand_id || 0) == 0 ? //  has not brand id means is not brand
                    <div className="col-sm-6 col-md-3 col-xl-3">
                        <div className="card card-h-100 text-white bg-gradient" style={{ background: "#336699" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                        <h4 className="mb-3 text-white">
                                            ৳ <span className="counter-value" data-target={data?.total_revenue}>{data?.total_revenue}</span>
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

            <div className="col-sm-6 col-md-3 col-xl-3">
                <div className="card card-h-100 text-white bg-gradient" style={{ background: "#6699CC" }}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <span className="mb-3 lh-1 d-block text-truncate">Total Hits</span>
                                <h4 className="mb-3 text-white">
                                    <span className="counter-value" data-target={data?.today_hit}>{data?.today_hit}</span>
                                </h4>
                            </div>

                        </div>
                        <div className="text-nowrap">
                            <span className="ms-1 font-size-13">Today</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                (user?.brand_id || 0) == 0 ? //  has not brand id means is not brand
                    <div className="col-sm-6 col-md-3 col-xl-3">
                        <div className="card card-h-100 text-white bg-gradient" style={{ background: "#99CCFF" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                        <h4 className="mb-3 text-white">
                                            ৳ <span className="counter-value" data-target={data?.today_revenue}>{data?.today_revenue}</span>
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

            <div className="col-sm-6 col-md-3 col-xl-3">
                <div className="card card-h-100 text-white bg-gradient" style={{ background: "#3154a6" }}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <span className="mb-3 lh-1 d-block text-truncate">Total Hits</span>
                                <h4 className="mb-3 text-white">
                                    <span className="counter-value" data-target={data?.current_month_hit}>{data?.current_month_hit}</span>
                                </h4>
                            </div>

                        </div>
                        <div className="text-nowrap">
                            <span className="ms-1 font-size-13">{currentMonthName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                (user?.brand_id || 0) == 0 ? //  has not brand id means is not brand
                    <div className="col-sm-6 col-md-3 col-xl-3">
                        <div className="card card-h-100 text-white bg-gradient" style={{ background: "#6c77b7" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                        <h4 className="mb-3 text-white">
                                            ৳ <span className="counter-value" data-target={data?.current_month_revenue}>{data?.current_month_revenue}</span>
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

            <div className="col-sm-6 col-md-3 col-xl-3">
                <div className="card card-h-100 text-white bg-gradient" style={{ background: "#8e8dc1" }}>
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <span className="mb-3 lh-1 d-block text-truncate">Total Hits</span>
                                <h4 className="mb-3 text-white">
                                    <span className="counter-value" data-target={data?.prev_month_hit}>{data?.prev_month_hit}</span>
                                </h4>
                            </div>

                        </div>
                        <div className="text-nowrap">
                            <span className="ms-1 font-size-13">{previousMonthName}</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                (user?.brand_id || 0) == 0 ? //  has not brand id means is not brand
                    <div className="col-sm-6 col-md-3 col-xl-3">
                        <div className="card card-h-100 text-white bg-gradient" style={{ background: "#ae9ca7" }}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Revenue</span>
                                        <h4 className="mb-3 text-white">
                                            ৳ <span className="counter-value" data-target={data?.prev_month_revenue}>{data?.prev_month_revenue}</span>
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
        </div>
    </>;
};

export default Summary;
