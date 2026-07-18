import { createContext, useState, useContext, useCallback } from 'react';
import * as taskApi from '../api/taskApi';
import toast from 'react-hot-toast';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [filters, setFilters] = useState({ status: 'all', search: '', sort: 'newest', priority: '' });

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (filters.status !== 'all') params.status = filters.status;
      if (filters.search) params.search = filters.search;
      if (filters.sort !== 'newest') params.sort = filters.sort;
      if (filters.priority) params.priority = filters.priority;
      const res = await taskApi.getTasks(params);
      setTasks(res.data);
    } catch {
      toast.error('Failed to fetch tasks');
    }
  }, [filters]);

  const fetchStats = useCallback(async () => {
    try {
      const res = await taskApi.getStats();
      setStats(res.data);
    } catch {
      toast.error('Failed to fetch stats');
    }
  }, []);

  const createTask = async (data) => {
    await taskApi.createTask(data);
    toast.success('Task created');
    await fetchTasks();
    await fetchStats();
  };

  const updateTask = async (id, data) => {
    await taskApi.updateTask(id, data);
    toast.success('Task updated');
    await fetchTasks();
    await fetchStats();
  };

  const deleteTask = async (id) => {
    await taskApi.deleteTask(id);
    toast.success('Task deleted');
    await fetchTasks();
    await fetchStats();
  };

  const deleteCompleted = async () => {
    await taskApi.deleteCompleted();
    toast.success('Completed tasks deleted');
    await fetchTasks();
    await fetchStats();
  };

  const toggleTask = async (id) => {
    await taskApi.toggleTask(id);
    await fetchTasks();
    await fetchStats();
  };

  return (
    <TaskContext.Provider value={{
      tasks, stats, filters, setFilters,
      fetchTasks, fetchStats, createTask, updateTask,
      deleteTask, deleteCompleted, toggleTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
