import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="custom-navbar d-flex align-items-center justify-content-between">
      <span className="brand">Task Manager</span>
      <div className="d-flex align-items-center gap-3">
        <span className="user-name">{user?.name}</span>
        <button className="btn-glow" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
