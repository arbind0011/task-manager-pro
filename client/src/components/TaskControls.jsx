const TaskControls = ({ 
    searchQuery, setSearchQuery, 
    filter, setFilter, 
    sort, setSort 
}) => {
    return (
        <div className="task-controls">
            <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            
            <div className="filters">
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                    <option value="Priority">Priority (High to Low)</option>
                    <option value="DueDate">Due Date (Earliest)</option>
                </select>
            </div>
        </div>
    );
};

export default TaskControls;