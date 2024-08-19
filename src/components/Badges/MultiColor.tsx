import React, {Fragment} from 'react'
import ReactHtmlParser from 'react-html-parser';

function MultiColor(props:any) {

    const badge_colors = ['primary', 'success', 'danger' , 'info']
    function getBadge(value){
        var badge_color = badge_colors[Math.floor(Math.random()*badge_colors.length)]
        return `<span class="badge rounded-pill font-size-12 fw-medium badge-${badge_color} bg-soft-${badge_color} text-${badge_color} mx-1">${value}</span>`;
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
