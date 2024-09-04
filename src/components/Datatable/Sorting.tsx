
const Sorting = ({ column, table, order, onSortChange }:any) => {
    const handleClick = () => {
        // Toggle sorting order when clicked
        const newOrder = order == 'asc' ? 'desc' : 'asc';
        // Trigger sorting change
        onSortChange(column, table, newOrder);
    };

    return (
        <>
            <i className={['asc', 'desc'].includes(order) ? (order == 'asc' ? 'mdi mdi-sort-alphabetical-ascending' : 'mdi mdi-sort-alphabetical-descending') : 'mdi mdi-order-alphabetical-ascending'}
                title="Click to sort"
                onClick={handleClick}
                style={{ cursor: 'pointer', color: (order ? '#74788d' : '#808080a8') }}
            />
        </>
    );
};

export default Sorting;
