const TaskStats = ({ tasks }) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    
    // Calculate overdue (Pending tasks with a due date in the past)
    const today = new Date().setHours(0, 0, 0, 0);
    const overdue = tasks.filter(t => {
        if (t.status === 'Completed' || !t.dueDate) return false;
        const dueDate = new Date(t.dueDate).setHours(0, 0, 0, 0);
        return dueDate < today;
    }).length;

    return (
        <div className="task-stats-grid">
            <div className="stat-card">
                <h3>Total</h3>
                <p className="stat-num">{total}</p>
            </div>
            <div className="stat-card">
                <h3>Completed</h3>
                <p className="stat-num text-success">{completed}</p>
            </div>
            <div className="stat-card">
                <h3>Pending</h3>
                <p className="stat-num text-warning">{pending}</p>
            </div>
            <div className="stat-card">
                <h3>Overdue</h3>
                <p className="stat-num text-danger">{overdue}</p>
            </div>
        </div>
    );
};

export default TaskStats;