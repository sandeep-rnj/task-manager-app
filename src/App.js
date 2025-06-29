import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskDashboard from './components/TaskDashboard';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter(task => task.id !== id));
  const editTask = (updatedTask) => {
    const newTasks = tasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(newTasks);
  };
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  return (
    <div className="container">
      <Header />
      <TaskForm addTask={addTask} />
      <TaskDashboard
        tasks={tasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleComplete={toggleComplete}
      />
      <Footer />
    </div>
  );
};

export default App;
