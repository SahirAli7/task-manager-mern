import { useTasks } from '../context/TaskContext';

const cards = [
  { label: 'Total Tasks', key: 'total', color: 'primary' },
  { label: 'Completed', key: 'completed', color: 'success' },
  { label: 'Pending', key: 'pending', color: 'warning' },
  { label: 'Overdue', key: 'overdue', color: 'danger' },
];

const StatsCards = () => {
  const { stats } = useTasks();

  return (
    <div className="row g-3 mb-4">
      {cards.map((c) => (
        <div className="col-6 col-md-3" key={c.key}>
          <div className={`card text-bg-${c.color} text-center`}>
            <div className="card-body">
              <h5 className="card-title display-6">{stats[c.key]}</h5>
              <p className="card-text">{c.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
