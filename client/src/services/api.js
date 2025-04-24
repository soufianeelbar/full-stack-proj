import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL ||  'https://profound-radiance-production.up.railway.app/api' ,//'http://localhost:5000/api',    // change to work with hosted BAckend
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await apiClient.get('/tasks');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des tâches:', error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la tâche:', error);
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await apiClient.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const response = await apiClient.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
      throw error;
    }
  }
};
