// src/components/TaskForm.js
import React, { useState } from 'react';
import { taskService } from '../services/api';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    setError(''); // Reset previous errors

    try {
      const newTask = await taskService.createTask({ title });
      setTitle('');
      if (onTaskAdded) onTaskAdded(newTask);
    } catch (error) {
      setError('Erreur lors de la création de la tâche');
      console.error('Erreur:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Ajouter une tâche</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
