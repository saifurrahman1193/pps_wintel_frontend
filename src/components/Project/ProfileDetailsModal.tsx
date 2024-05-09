import React, { useEffect, Fragment } from 'react';
import ProfileDetails from './ProfileDetails'

function ProfileDetailsModal(props) {

    const data_update = (userId, profiledetail_row_id) => {
        props.profileDetailModalUpdate(userId, profiledetail_row_id)
    }

    return (
        <Fragment>
            <a data-bs-toggle="modal" data-bs-target={"#profileDetailModal-"+props?.profiledetail_row_id} href="#0" onClick={()=>data_update(props?.userId_row, props?.profiledetail_row_id)}>
                {props?.text}
            </a>

            <div className="modal fade" id={"profileDetailModal-"+props?.profiledetail_row_id} tabIndex="-1"  aria-labelledby={"profileDetailModal-"+props?.profiledetail_row_id} aria-hidden="true" >
                <div className="modal-dialog modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id={"profileDetailModal-"+props?.profiledetail_row_id} style={{flex: "auto"}}> Profile Details</p>
                            <div className="btn btn-icon btn-sm btn-danger ms-2" data-bs-dismiss="modal" aria-label="Close" onClick={()=>data_update('','')} >
                                <i className="icofont icofont-ui-close me-1"></i>
                            </div>
                        </div>
                        <div className="modal-body pt-0 mt-0" >
                            <ProfileDetails {...props} />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}




export default ProfileDetailsModal;

