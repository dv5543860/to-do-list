import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask,setTaskToEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCompleted = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    setTaskToEdit(task);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div>
      <h3 onClick={toggleExpanded}>{task.task} {task.completed && '(Done)'}</h3>
      {isExpanded && (
        <div>
          <p>{task.description}</p>
          <p>{new Date(task.timestamp).toLocaleString()}</p>
          <button onClick={toggleCompleted}>
            {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
          </button>
          <button onClick={handleEdit}>Edit Task</button>
          <button onClick={handleDelete}>Delete Task</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
