import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';


  const App = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/tasks');
      setTasks(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get('search') || '';
    setSearch(searchQuery);
  }, []);



  const addTask = async (task) => {
    const result = await axios.post('http://localhost:5000/tasks', task);
    setTasks([...tasks, result.data]);
  };

  const updateTask = async (updatedTask) => {
    const result = await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
    setTasks(tasks.map(task => task.id === updatedTask.id ? result.data : task));

  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const searchTasks = (query) => {
    setSearch(query);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('search', query);
    window.history.replaceState(null, null, '?' + queryParams.toString());
  };


  const editTask = async (updatedTask) => {
    const result = await axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask);
    setTasks(tasks.map(task => task.id === updatedTask.id ? result.data : task));
  };


  const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskForm addTask={addTask} editTask={editTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <input type="text" placeholder="Search tasks" onChange={(e) => searchTasks(e.target.value)} />
      <TaskList tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} setTaskToEdit={setTaskToEdit} />
    </div>
  );
};

export default App;




