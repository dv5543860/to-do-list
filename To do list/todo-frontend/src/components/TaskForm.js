import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, editTask, taskToEdit, setTaskToEdit }) => {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setDescription(taskToEdit.description);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      task,
      description,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    if (taskToEdit) {
      editTask({ ...taskToEdit, ...newTask });
    } else {
      addTask(newTask);
    }
    setTask('');
    setDescription('');
    setTaskToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{taskToEdit ? 'Edit Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
