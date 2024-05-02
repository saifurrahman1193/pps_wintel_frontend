import React, { Fragment } from 'react';
import {getCurrentYear} from './Helpers/CommonHelpers'

function Footer () {
    return (
        <Fragment>

            <footer className="footer mt-6">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            {/* 2018 - 2019 © Simulor theme by <a href="#">Coderthemes</a> */}
                        </div>
                        <div className="col-md-8">
                            <span className="float-right">Copyright &copy; {getCurrentYear()} | Software Shop Limited | All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>

        </Fragment>
    )
}

export default Footer;