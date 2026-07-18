import { useTasks } from '../context/TaskContext';

const FilterBar = () => {
  const { filters, setFilters } = useTasks();

  const update = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="row g-2 mb-3 align-items-end">
      <div className="col-md-3">
        <label className="form-label">Status</label>
        <select className="form-select" value={filters.status} onChange={(e) => update('status', e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Priority</label>
        <select className="form-select" value={filters.priority} onChange={(e) => update('priority', e.target.value)}>
          <option value="">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Sort By</label>
        <select className="form-select" value={filters.sort} onChange={(e) => update('sort', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
      <div className="col-md-3">
        <label className="form-label">Search</label>
        <input className="form-control" placeholder="Search tasks..." value={filters.search}
          onChange={(e) => update('search', e.target.value)} />
      </div>
    </div>
  );
};

export default FilterBar;
