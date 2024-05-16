const Sorting = ({ column, table, order, onSortChange }) => {
    const handleClick = () => {
        // Toggle sorting order when clicked
        const newOrder = order === 'asc' ? 'desc' : 'asc';
        // Trigger sorting change
        onSortChange(column, table, newOrder);
    };

    // Define icon class based on sorting order
    const iconClass = () => {
        if (order == 'asc') return 'mdi mdi-sort-alphabetical-ascending';
        else if (order == 'desc') return 'mdi mdi-sort-alphabetical-descending';
        else return 'mdi mdi-sort-reversed';
    }

    return (
        <>
            {
                (order == 'asc' || order == 'desc') ?

                    <i className={iconClass} // Use neutral icon
                        title="Click to sort"
                        onClick={handleClick}
                        style={{ cursor: 'pointer' }} // Add cursor pointer style for indicating clickability
                    />
                    : null
            }
        </>
    );
};

export default Sorting;
