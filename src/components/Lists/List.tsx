import React, {Fragment} from 'react'
import ReactHtmlParser from 'react-html-parser';

function List(props:any) {

    return (
        <Fragment>
            <div className="list-group">
                {
                    props?.dataList ?
                        props?.dataList?.map((value, i) => {
                            return ReactHtmlParser(`<li class="list-group-item list-group-item-action py-${props.padding||1}" key="${value+'-'+i}">${value}</li>`)
                        })
                    : null
                }
            </div>
        </Fragment>
    )
}

export default List


{/* <List title={`Permission list of role ${row.name}`} realData={row.permissions}  dataList={row.permissions.split(', ')} showCharecters={60}/> */}
