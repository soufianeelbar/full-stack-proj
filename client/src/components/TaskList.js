// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des tâches');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression');
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updated = await taskService.updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => t.id === task.id ? updated : t));
    } catch (err) {
      setError('Erreur lors du changement de statut');
    }
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const handleEditChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditSubmit = async (id) => {
    try {
      const updated = await taskService.updateTask(id, { title: editTitle });
      setTasks(tasks.map(t => t.id === id ? updated : t));
      setEditId(null);
      setEditTitle('');
    } catch (err) {
      setError('Erreur lors de la modification');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input type="checkbox" checked={task.completed} onChange={() => handleToggleComplete(task)} />
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={handleEditChange}
                  onKeyDown={e => { if(e.key === 'Enter') handleEditSubmit(task.id); }}
                  autoFocus
                  style={{ marginLeft: 8, marginRight: 8 }}
                />
                <button onClick={() => handleEditSubmit(task.id)} style={{ marginRight: 6 }}>Enregistrer</button>
                <button onClick={() => { setEditId(null); setEditTitle(''); }}>Annuler</button>
              </>
            ) : (
              <>
                <span style={{ marginLeft: 8, marginRight: 8 }}>{task.title}</span>
                <button onClick={() => handleEdit(task)} style={{ marginRight: 6 }}>Éditer</button>
                <button onClick={() => handleDelete(task.id)} style={{ color: '#e53935' }}>Supprimer</button>
              </>
            )}
            <span className="status">{task.completed ? '✔️' : '❌'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
