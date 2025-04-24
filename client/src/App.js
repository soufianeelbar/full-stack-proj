// src/App.js
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './TodoList.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="todo-container">
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList />
    </div>
  );
};

export default App;
