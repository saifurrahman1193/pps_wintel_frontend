import { currentMonthName, previousMonthName } from '../../components/Helpers/CommonHelpers.js'


const Summary = ({ user, data }) => {


    return <>
        <div className="row">

            {
                (user?.brand_id || 0) != 0 ? //  has brand id means is brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-primary border-primary text-white bg-gradient">
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
                    : null
            }

            {
                (user?.brand_id || 0) == 0 ? // no brand id means not brand

                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-primary border-primary text-white bg-gradient">
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

            {
                (user?.brand_id || 0) != 0 ? //  has brand id means is brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-info border-info text-white bg-gradient">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
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
                    : null
            }

            {
                (user?.brand_id || 0) == 0 ? // no brand id means not brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-info border-info text-white bg-gradient">
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


            {
                (user?.brand_id || 0) != 0 ? //  has brand id means is brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-success border-success text-white bg-gradient">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
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
                    : null
            }

            {
                (user?.brand_id || 0) == 0 ? // no brand id means not brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-success border-success text-white bg-gradient">
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


            {
                (user?.brand_id || 0) != 0 ? //  has brand id means is brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-danger border-danger text-white bg-gradient">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-12">
                                        <span className="mb-3 lh-1 d-block text-truncate">Total Hit</span>
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
                    : null

            }

            {
                (user?.brand_id || 0) == 0 ? // no brand id means not brand
                    <div className="col-xl-3 col-md-4">
                        <div className="card card-h-100 bg-danger border-danger text-white bg-gradient">
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
