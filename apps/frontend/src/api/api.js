import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getRecipes = async (page = 1, limit = 12) => {
  const res = await api.get(`/api/recipes?page=${page}&limit=${limit}`);
  return res.data;
};

export const createRecipe = async (formData, token) => {
  const res = await api.post('/api/recipes', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCategories = async () => {
  const res = await api.get('/api/categories');
  return res.data;
};

export const getIngredients = async () => {
  const response = await api.get('/api/ingredients');
  return response.data;
};
