import  {  Fragment } from 'react';
import ProfileDetails from './ProfileDetails'
import { Link } from 'react-router-dom';

function ProfileDetailsModal(props:any) {

    const data_update = (userId:any, profiledetail_row_id:any) => {
        props.profileDetailModalUpdate(userId, profiledetail_row_id)
    }

    return (
        <Fragment>
            <Link data-bs-toggle="modal" data-bs-target={"#profileDetailModal-"+props?.profiledetail_row_id} to="#0" onClick={()=>data_update(props?.userId_row, props?.profiledetail_row_id)}>
                {props?.text}
            </Link>

            <div className="modal fade" id={"profileDetailModal-"+props?.profiledetail_row_id} tabIndex={-1}  aria-labelledby={"profileDetailModal-"+props?.profiledetail_row_id} aria-hidden="true" >
                <div className="modal-dialog modal-fullscreen" role="document">
                    <div className="modal-content">
                        <div className="modal-header py-2">
                            <p className="modal-title text-center text-dark fw-bolder d-block fs-3" id={"profileDetailModal-"+props?.profiledetail_row_id} style={{flex: "auto"}}> Profile Details</p>
                            <button type="button" className="btn btn-soft-danger waves-effect waves-light px-2 py-1" aria-label="Close" onClick={()=>data_update('','')} data-bs-dismiss="modal"><i className="bx bx-x font-size-16 align-middle"></i></button>
                        </div>
                        <div className="modal-body pt-0 mt-0 pb-2" >
                            <ProfileDetails {...props} />
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}




export default ProfileDetailsModal;

