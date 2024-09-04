import { Fragment } from 'react';

interface ListProps {
    dataList?: string[];
    padding?: number;
}

function List({ dataList = [], padding = 1 }: ListProps) {
    return (
        <Fragment>
            <div className="list-group">
                {dataList.length > 0 ? (
                    dataList.map((value, i) => (
                        <li
                            className={`list-group-item list-group-item-action py-${padding}`}
                            key={`${value}-${i}`}
                        >
                            {value}
                        </li>
                    ))
                ) : null}
            </div>
        </Fragment>
    );
}

export default List;
