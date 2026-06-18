import { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ onTaskCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = await createTask(formData);
            onTaskCreated(newTask); // Update the parent state
            // Reset form
            setFormData({ title: '', description: '', priority: 'Medium', dueDate: '' });
        } catch (error) {
            console.error('Failed to create task:', error);
            alert('Could not create task. Please try again.');
        }
    };

    return (
        <div className="task-form-container">
            <h3>Add a New Task</h3>
            <form onSubmit={handleSubmit} className="task-form">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Task Title (Required)" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="description" 
                    placeholder="Task Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                <div className="form-row">
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                    <input 
                        type="date" 
                        name="dueDate" 
                        value={formData.dueDate} 
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn-primary">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;