
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = './data.json';

// Read tasks from file
const readTasks = () => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]');
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Write tasks to file
const writeTasks = (tasks) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  const { search } = req.query;

  if (search) {
    const filteredTasks = tasks.filter(task =>
      task.task.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredTasks);
  } else {
    res.json(tasks);
  }
});

// Add new task
app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = req.body;
  newTask.id = Date.now();
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

// Update task
app.put('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const updatedTask = req.body;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id, 10));
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask, timestamp: new Date().toISOString() };
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id, 10));
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
