import axiosClient from './axiosClient';

export const createTask = (data) => axiosClient.post('/tasks', data);
export const getTasks = (params) => axiosClient.get('/tasks', { params });
export const getTask = (id) => axiosClient.get(`/tasks/${id}`);
export const updateTask = (id, data) => axiosClient.put(`/tasks/${id}`, data);
export const deleteTask = (id) => axiosClient.delete(`/tasks/${id}`);
export const deleteCompleted = () => axiosClient.delete('/tasks/completed');
export const toggleTask = (id) => axiosClient.patch(`/tasks/${id}/toggle`);
export const getStats = () => axiosClient.get('/tasks/stats');
