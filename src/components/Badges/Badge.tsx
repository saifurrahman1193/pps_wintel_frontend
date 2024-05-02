import React, {Fragment} from 'react'
import ReactHtmlParser from 'react-html-parser';

function Badge(props) {
    return (
        <Fragment>
            {
                ReactHtmlParser(`<span class="badge ${props?.badgeClass||'badge-light-primary'} fs-7 m-1">${props?.badgeValue}</span>`)
            }
        </Fragment>
    )
}

export default Badge

// import Badge  from '../components/Badges/Badge';
// <Badge badgeClass={row?.status==1?'badge-success':'badge-danger'} badgeValue={row?.status==1?'Active':'Inactive'} />