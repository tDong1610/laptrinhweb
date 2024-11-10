import React from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <div className="App">
            <h1>Todo App</h1>
            <TaskForm fetchTasks={() => {}} />
            <TaskList />
        </div>
    );
}

export default App;
