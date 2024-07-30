import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const API_URL = 'https://to-do-list-mfvj.onrender.com';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_URL}/tasks`);
        setTasks(result.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchQuery = queryParams.get('search') || '';
    setSearch(searchQuery);
  }, []);

  const addTask = async (task) => {
    try {
      const result = await axios.post(`${API_URL}/tasks`, task);
      setTasks([...tasks, result.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const result = await axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? result.data : task));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const searchTasks = (query) => {
    setSearch(query);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('search', query);
    window.history.replaceState(null, null, '?' + queryParams.toString());
  };

  const editTask = async (updatedTask) => {
    try {
      const result = await axios.put(`${API_URL}/tasks/${updatedTask.id}`, updatedTask);
      setTasks(tasks.map(task => task.id === updatedTask.id ? result.data : task));
    } catch (error) {
      console.error('Error editing task:', error);
    }
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
