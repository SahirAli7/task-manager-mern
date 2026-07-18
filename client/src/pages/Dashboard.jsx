import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import StatsCards from '../components/StatsCards';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const { tasks, fetchTasks, fetchStats, deleteCompleted } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [fetchTasks, fetchStats]);

  const openAdd = () => {
    setEditTask(null);
    setShowModal(true);
  };

  const openEdit = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  return (
    <div className="container py-4">
      <StatsCards />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Tasks</h4>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm" onClick={deleteCompleted}>
            <FaTrash className="me-1" />Clear Completed
          </button>
          <button className="btn btn-primary btn-sm" onClick={openAdd}>
            <FaPlus className="me-1" />Add Task
          </button>
        </div>
      </div>

      <FilterBar />

      {tasks.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p className="fs-5">No tasks found</p>
          <button className="btn btn-primary" onClick={openAdd}>Create your first task</button>
        </div>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} onEdit={openEdit} />)
      )}

      <TaskModal show={showModal} onClose={() => setShowModal(false)} editTask={editTask} />
    </div>
  );
};

export default Dashboard;
