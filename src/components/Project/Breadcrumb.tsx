import  { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';


function Breadcrumb(props:any) {

    useEffect(() => {
        document.title = props?.breadcrumb?.pageTitle || "Virtual Recharge"
      }, [props?.breadcrumb]);

    return (
        <>
           {
                !(props?.breadcrumb?.hidden) ?
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    {
                                        props?.breadcrumb?.layers?.map((layer:any, i:number) => {
                                            return (
                                                <Fragment key={'layer-' + i}>
                                                    <li className={"breadcrumb-item "+(layer?.link ? '':'active')}>
                                                        {
                                                            layer?.link ?
                                                            <Link to={layer?.link}>{layer?.title||''}</Link>
                                                            : layer?.title
                                                        }
                                                    </li>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                            <h4 className="page-title">{props?.breadcrumb?.pageTitle || ''}</h4>
                        </div>
                    </div>
                </div>
                : null
            }
        </>
    )
}


export default Breadcrumb