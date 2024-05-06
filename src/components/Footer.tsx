import React, { Fragment } from 'react';
import { getCurrentYear } from './Helpers/CommonHelpers'

function Footer() {
    return (
        <Fragment>

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            © Minia.
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block">
                                Design &amp; Develop by <a href="#!" className="text-decoration-underline">Themesbrand</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </Fragment>
    )
}

export default Footer;