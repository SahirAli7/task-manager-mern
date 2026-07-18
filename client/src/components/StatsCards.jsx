import { useTasks } from '../context/TaskContext';
import { FaTasks, FaCheckCircle, FaHourglassHalf, FaExclamationTriangle } from 'react-icons/fa';

const cards = [
  { label: 'Total Tasks', key: 'total', icon: <FaTasks />, color: '#6c5ce7' },
  { label: 'Completed', key: 'completed', icon: <FaCheckCircle />, color: '#00d68f' },
  { label: 'Pending', key: 'pending', icon: <FaHourglassHalf />, color: '#ffaa00' },
  { label: 'Overdue', key: 'overdue', icon: <FaExclamationTriangle />, color: '#ff4757' },
];

const StatsCards = () => {
  const { stats } = useTasks();

  return (
    <div className="stats-grid">
      {cards.map((c) => (
        <div className="stat-card" key={c.key}>
          <div className="stat-icon" style={{ color: c.color }}>{c.icon}</div>
          <div className="stat-number">{stats[c.key]}</div>
          <div className="stat-label">{c.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
