import  { Fragment } from 'react';
import { getCurrentYear } from './Helpers/CommonHelpers'

function Footer() {
    return (
        <Fragment>

            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="text-sm-end d-sm-block">
                            Copyright &copy; {getCurrentYear()} | Wintel Limited | All Rights Reserved.
                        </div>
                    </div>
                </div>
            </footer>

        </Fragment>
    )
}

export default Footer;