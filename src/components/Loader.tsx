import { Fragment, useEffect, useState } from 'react'

export default function Loader() {
    const [isLoader, setIsLoader] = useState(true)

    useEffect(() => {
        setIsLoader(false)
    }, [])

    return (
        <Fragment>
            {
                isLoader ?
                    <div className="theme-loader">
                        <div className="ball-scale">
                            <div className='contain'>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                                <div className="ring">
                                    <div className="frame"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

        </Fragment>
    )
}
