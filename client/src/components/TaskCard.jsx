const TaskCard = ({ task, onDelete, onToggleStatus }) => {
    const isCompleted = task.status === 'Completed';

    return (
        <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
            <div className="task-header">
                <h4>{task.title}</h4>
                <span className={`badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>
            
            {task.description && <p className="task-desc">{task.description}</p>}
            
            <div className="task-footer">
                <span className="due-date">
                    {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
                </span>
                
                <div className="task-actions">
                    <button 
                        className={`btn-status ${isCompleted ? 'btn-pending' : 'btn-complete'}`}
                        onClick={() => onToggleStatus(task._id, isCompleted ? 'Pending' : 'Completed')}
                    >
                        {isCompleted ? 'Mark Pending' : 'Complete'}
                    </button>
                    <button 
                        className="btn-delete"
                        onClick={() => onDelete(task._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;