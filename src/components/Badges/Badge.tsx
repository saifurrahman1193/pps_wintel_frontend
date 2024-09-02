import  { Fragment } from 'react'

function Badge(props: any) {
    return (
        <Fragment>
            <span className={`badge ${props?.badgeClass || 'badge-soft-primary'} m-1`}>
                {props?.badgeValue}
            </span>
        </Fragment>
    )
}

export default Badge

// import Badge  from '../components/Badges/Badge';
// <Badge badgeClass={row?.status==1?'badge-success':'badge-danger'} badgeValue={row?.status==1?'Active':'Inactive'} />