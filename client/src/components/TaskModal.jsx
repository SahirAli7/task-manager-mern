import { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

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
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{editTask ? 'Edit Task' : 'Add Task'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title *</label>
                <input className="form-control" value={form.title} required maxLength={200}
                  onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" rows="3" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Priority</label>
                  <select className="form-select" value={form.priority}
                    onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div className="col">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-control" value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editTask ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
