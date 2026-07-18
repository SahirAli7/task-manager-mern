import { useTasks } from '../context/TaskContext';
import { FaCheck, FaUndo, FaEdit, FaTrash } from 'react-icons/fa';

const TaskCard = ({ task, onEdit }) => {
  const { toggleTask, deleteTask } = useTasks();

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

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
        <button className={`btn-icon complete`} onClick={() => toggleTask(task._id)} title={task.completed ? 'Undo' : 'Complete'}>
          {task.completed ? <FaUndo /> : <FaCheck />}
        </button>
        <button className="btn-icon edit" onClick={() => onEdit(task)} title="Edit"><FaEdit /></button>
        <button className="btn-icon delete" onClick={() => deleteTask(task._id)} title="Delete"><FaTrash /></button>
      </div>
    </div>
  );
};

export default TaskCard;
