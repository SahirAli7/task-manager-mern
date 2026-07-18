import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaTimes } from 'react-icons/fa';

const TaskModal = ({ show, onClose, editTask }) => {
  const { createTask, updateTask } = useTasks();
  const [form, setForm] = useState({ title: '', description: '', priority: 'Medium', dueDate: '' });

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        priority: editTask.priority,
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm({ title: '', description: '', priority: 'Medium', dueDate: '' });
    }
  }, [editTask, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const payload = { ...form };
    if (!payload.dueDate) delete payload.dueDate;
    if (editTask) {
      await updateTask(editTask._id, payload);
    } else {
      await createTask(payload);
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h5>{editTask ? 'Edit Task' : 'Add Task'}</h5>
          <button className="modal-close" onClick={onClose}><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="field">
              <label>Title *</label>
              <input value={form.title} required maxLength={200}
                onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter task title" />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea rows="3" value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Optional description" />
            </div>
            <div className="row-fields">
              <div className="field">
                <label>Priority</label>
                <select value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div className="field">
                <label>Due Date</label>
                <input type="date" value={form.dueDate}
                  onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit" style={{ width: 'auto', padding: '9px 24px' }}>
              {editTask ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
