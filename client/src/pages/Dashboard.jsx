// Update your imports
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTasks, updateTask, deleteTask } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskStats from '../components/TaskStats';
import TaskControls from '../components/TaskControls';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Newest');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    // --- NEW LOGIC HERE --- //
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            alert('Failed to delete task');
        }
    };

    const handleToggleStatus = async (id, newStatus) => {
        try {
            const updatedTask = await updateTask(id, { status: newStatus });
            setTasks(tasks.map(task => task._id === id ? updatedTask : task));
        } catch (error) {
            alert('Failed to update status');
        }
    };

    const getProcessedTasks = () => {
        let result = [...tasks];

        // 1. Filter by Status
        if (filter !== 'All') {
            result = result.filter(task => task.status === filter);
        }

        // 2. Search by Title or Description
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(task => 
                task.title.toLowerCase().includes(query) || 
                (task.description && task.description.toLowerCase().includes(query))
            );
        }

        // 3. Sort
        result.sort((a, b) => {
            if (sort === 'Priority') {
                const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            }
            if (sort === 'DueDate') {
                if (!a.dueDate) return 1; // Push tasks without dates to bottom
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sort === 'Oldest') {
                return new Date(a.dueDate || 0) - new Date(b.dueDate || 0); // Fallback logic
            }
            // Default: Newest (assuming array is already prepended by handleTaskCreated, just keep order)
            return 0; 
        });

        return result;
    };

    const processedTasks = getProcessedTasks();

   return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Workspace</h1>
                <button onClick={logout} className="btn-secondary">Logout</button>
            </header>
            
            <main className="dashboard-content">
                {/* Render the Stats */}
                {!loading && <TaskStats tasks={tasks} />}

                <TaskForm onTaskCreated={handleTaskCreated} />

                {/* Render the Controls */}
                <TaskControls 
                    searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                    filter={filter} setFilter={setFilter}
                    sort={sort} setSort={setSort}
                />

                <div className="task-grid">
                    {loading ? (
                        <p>Loading tasks...</p>
                    ) : processedTasks.length === 0 ? (
                        <p>No tasks match your criteria.</p>
                    ) : (
                        processedTasks.map(task => (
                            <TaskCard 
                                key={task._id} 
                                task={task} 
                                onDelete={handleDelete}
                                onToggleStatus={handleToggleStatus}
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;