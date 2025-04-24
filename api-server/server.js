const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ----------------------
// Mock data and routes
// ----------------------
let tasks = [
  { id: 1, title: 'Apprendre Express', completed: false },
  { id: 2, title: 'Créer une API REST', completed: false }
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// GET task by ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(task);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Tâche non trouvée' });
  const deleted = tasks.splice(index, 1)[0];
  res.json(deleted);
});

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API opérationnelle' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});
