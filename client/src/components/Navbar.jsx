import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand mb-0 h1">Task Manager</span>
      <div className="d-flex align-items-center gap-3">
        <span className="text-light">{user?.name}</span>
        <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
