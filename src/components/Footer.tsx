import React, { Fragment } from 'react';
import { getCurrentYear } from './Helpers/CommonHelpers'

function Footer() {
    return (
        <Fragment>

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            {/* © Minia. */}
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block">
                                Copyright &copy; {getCurrentYear()} | Wintel Limited | All Rights Reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </Fragment>
    )
}

export default Footer;