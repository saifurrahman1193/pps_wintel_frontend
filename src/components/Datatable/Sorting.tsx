import { useState, useEffect } from "react";

const Sorting = ({ column, table, order, onSortChange }) => {
    const handleClick = () => {
        // Toggle sorting order when clicked
        const newOrder = order == 'asc' ? 'desc' : 'asc';
        // Trigger sorting change
        onSortChange(column, table, newOrder);
        iconClassHandler(newOrder)
    };

    const [iconClass, setIconClass] = useState('');

    // Define icon class based on sorting order
    const iconClassHandler = (order=null) => {
        if (order == 'asc') setIconClass('mdi mdi-sort-alphabetical-ascending');
        else if (order == 'desc') setIconClass('mdi mdi-sort-alphabetical-descending');
        else return setIconClass('mdi mdi-order-alphabetical-ascending');
    }
    useEffect(() => {
        iconClassHandler()
    }, []);

    return (
        <>
            <i className={iconClass}
                title="Click to sort"
                onClick={handleClick}
                style={{ cursor: 'pointer', color: (order ? '#74788d' : '#808080a8') }}
            />
        </>
    );
};

export default Sorting;
