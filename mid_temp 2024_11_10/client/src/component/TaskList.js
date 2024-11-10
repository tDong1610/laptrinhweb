import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    const toggleComplete = async (id) => {
        await axios.patch(`http://localhost:5000/api/tasks/${id}/toggleComplete`);
        fetchTasks();
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                            {task.title}
                        </span>
                        <button onClick={() => toggleComplete(task._id)}>
                            {task.isCompleted ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
