import { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Paginate(props:any) {

    const paginator = props.paginator || {}
    const total_pages = paginator.total_pages || 1
    const current_page = paginator.current_page || 1
    const next_page_url = paginator.next_page_url
    const previous_page_url = paginator.previous_page_url


    var paginationPages = []
    for (let i = 1; i <= total_pages; i++) {
        paginationPages.push(i)
    }

    function onClickPage(e:any, page:any) {
        e.preventDefault();

        props.pagechanged(page)
    }


    return (
        <Fragment>
            <div className='row'>
                <div className="col-sm-12 col-md-5">
                    Showing {paginator?.current_page == 1 ? 1 : (paginator?.current_page - 1) * paginator?.record_per_page + 1} to {paginator?.current_page == 1 ? paginator?.current_page_items_count : (paginator?.current_page - 1) * paginator?.record_per_page + paginator?.current_page_items_count} of {paginator?.total_count} entries
                </div>
                <div className='col-sm-12 col-md-7'>
                    <nav aria-label="Page navigation">
                        <ul className="pagination pagination-sm justify-content-end">

                            <li className={`page-item ${previous_page_url ? '' : 'disabled'}`}>
                                <Link to="#0" className="page-link" onClick={(e) => onClickPage(e, 1)} aria-label="First page" title="First page">
                                    <i className="fa fa-fast-backward"></i>
                                </Link>
                            </li>

                            <li className={`page-item ${previous_page_url ? '' : 'disabled'}`}>
                                <Link to="#0" className="page-link" onClick={(e) => onClickPage(e, current_page - 1)} aria-label="Previous" title="Previous page">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </Link>
                            </li>


                            {
                                paginator?.current_page > 3 ?
                                    <li className="page-item">
                                        <Link className="page-link" to="#0" onClick={(e) => onClickPage(e, 1)}
                                            title={'Go to page 1'}
                                        >1</Link>
                                    </li>
                                    : null
                            }

                            {
                                paginator?.current_page > 4 ?
                                    <li className="mx-1"><span>...</span></li>
                                    : null
                            }



                            {
                                (Array.from({ length: paginator?.total_pages }, (_, i) => i + 1))?.map((pageNumber) => (
                                    (pageNumber >= (paginator?.current_page - 2) && pageNumber <= (paginator?.current_page + 2)) ?
                                        (pageNumber == paginator?.current_page) ?
                                            <li key={'page-num-' + pageNumber} className={`page-item ${(paginator?.current_page == pageNumber) ? ' active' : ''}`}  >
                                                <Link className="page-link"
                                                    onClick={(e) => onClickPage(e, pageNumber)}
                                                    title={'Go to page ' + pageNumber}
                                                    to="#0"
                                                >{pageNumber}</Link>
                                            </li>
                                            :
                                            <li key={'page-num-' + pageNumber}>
                                                <Link className="page-link" to="#0"
                                                    onClick={(e) => onClickPage(e, pageNumber)}
                                                    title={'Go to page ' + pageNumber}
                                                >{pageNumber}</Link>
                                            </li>

                                        : null
                                )


                                )
                            }


                            {
                                paginator?.current_page < paginator?.pagination_last_page - 3 ?
                                    <li className="mx-1"><span>...</span></li>
                                    : null
                            }

                            <li className={`page-item ${next_page_url ? '' : 'disabled'}`}>
                                <Link to="#0" className="page-link" onClick={(e) => onClickPage(e, current_page + 1)} aria-label="Next" title="Next page">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </Link>
                            </li>


                            <li className={`page-item ${next_page_url ? '' : 'disabled'}`}>
                                <Link to="#0" className="page-link" onClick={(e) => onClickPage(e, total_pages)} aria-label="Last page" title="Last page">
                                    <i className="fa fa-fast-forward"></i>
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </Fragment>
    )
}

export default Paginate
