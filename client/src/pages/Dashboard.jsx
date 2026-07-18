import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import StatsCards from '../components/StatsCards';
import FilterBar from '../components/FilterBar';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import { FaPlus, FaTrash, FaClipboardList } from 'react-icons/fa';

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
    <div className="dashboard-container">
      <StatsCards />

      <div className="dashboard-header">
        <h4>Tasks</h4>
        <div className="header-actions d-flex gap-2">
          <button className="btn-action danger-outline" onClick={deleteCompleted}>
            <FaTrash /> Clear Completed
          </button>
          <button className="btn-action primary" onClick={openAdd}>
            <FaPlus /> Add Task
          </button>
        </div>
      </div>

      <FilterBar />

      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon"><FaClipboardList /></div>
          <p>No tasks found</p>
          <button className="btn-action primary" onClick={openAdd}>Create your first task</button>
        </div>
      ) : (
        tasks.map((task) => <TaskCard key={task._id} task={task} onEdit={openEdit} />)
      )}

      <TaskModal show={showModal} onClose={() => setShowModal(false)} editTask={editTask} />
    </div>
  );
};

export default Dashboard;
