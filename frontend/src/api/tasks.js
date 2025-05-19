// src/api/tasks.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // FastAPI server

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(`${API_URL}/tasks`, task);
  return res.data;
};

export const updateTask = async (id, task) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/tasks/${id}`);
  return res.data;
};
