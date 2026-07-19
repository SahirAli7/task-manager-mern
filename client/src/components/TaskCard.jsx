import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaCheck, FaUndo, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';

const TaskCard = ({ task, onEdit }) => {
  const { toggleWithToast, deleteTask } = useTasks();
  const [loading, setLoading] = useState(false);

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const handleToggle = async () => {
    setLoading(true);
    await toggleWithToast(task._id, task);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteTask(task._id);
    setLoading(false);
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-left">
        <div className="task-title">
          {task.title}
          <span className="task-badges">
            <span className={`badge-priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
            {isOverdue && <span className="badge-overdue">Overdue</span>}
          </span>
        </div>
        {task.description && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>{task.description}</div>}
        <div className="task-meta">
          <span>{task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}</span>
          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="task-actions">
        <button className="btn-icon complete" onClick={handleToggle} disabled={loading} title={task.completed ? 'Undo' : 'Complete'}>
          {loading ? <FaSpinner className="fa-spin" /> : (task.completed ? <FaUndo /> : <FaCheck />)}
        </button>
        <button className="btn-icon edit" onClick={() => onEdit(task)} disabled={loading} title="Edit"><FaEdit /></button>
        <button className="btn-icon delete" onClick={handleDelete} disabled={loading} title="Delete">
          {loading ? <FaSpinner className="fa-spin" /> : <FaTrash />}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
