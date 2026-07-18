import { useTasks } from '../context/TaskContext';
import { FaCheck, FaUndo, FaEdit, FaTrash } from 'react-icons/fa';

const priorityColors = { Low: 'success', Medium: 'warning', High: 'danger' };

const TaskCard = ({ task, onEdit }) => {
  const { toggleTask, deleteTask } = useTasks();

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`card mb-2 ${task.completed ? 'border-success' : ''}`}>
      <div className="card-body d-flex align-items-center justify-content-between">
        <div className="flex-grow-1">
          <h6 className={`card-title mb-1 ${task.completed ? 'text-decoration-line-through text-muted' : ''}`}>
            {task.title}
            <span className={`badge bg-${priorityColors[task.priority]} ms-2`}>{task.priority}</span>
            {isOverdue && <span className="badge bg-danger ms-1">Overdue</span>}
          </h6>
          {task.description && <p className="mb-1 text-muted small">{task.description}</p>}
          <div className="d-flex gap-2 align-items-center">
            <small className="text-muted">
              {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
            </small>
            <small className="text-muted">| Created: {new Date(task.createdAt).toLocaleDateString()}</small>
          </div>
        </div>
        <div className="d-flex gap-1 ms-3">
          <button className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
            onClick={() => toggleTask(task._id)} title={task.completed ? 'Undo' : 'Complete'}>
            {task.completed ? <FaUndo /> : <FaCheck />}
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => onEdit(task)} title="Edit">
            <FaEdit />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => deleteTask(task._id)} title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
