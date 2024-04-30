import React, {Fragment} from 'react'
import ReactHtmlParser from 'react-html-parser';

function MultiColor(props) {

    const label_colors = ['badge badge-pill badge-warning', 'badge badge-pill badge-primary', 'badge badge-pill badge-success', 'badge badge-pill badge-danger' , 'badge badge-pill badge-info', 'badge badge-pill badge-inverse']
    function getBadge(value){
        var label = label_colors[Math.floor(Math.random()*label_colors.length)]
        return `<label class="label ${label}">${value}</label>`;
    }

    return (
        <Fragment>
            {
                props?.dataList ?
                    props?.dataList?.map((value, i) => {
                        return ReactHtmlParser(getBadge(value))
                    })
                : null
            }
        </Fragment>
    )
}

export default MultiColor
{/* <MultiColorBadges dataList={row.permissions.split(', ')}/> */}
