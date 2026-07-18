import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    try {
      await register(form);
      toast.success('Registered successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow" style={{ width: '100%', maxWidth: 400 }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">Sign Up</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input className="form-control" value={form.name} required
                onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={form.email} required
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={form.password} required minLength={6}
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <small className="text-muted">Min 6 characters</small>
            </div>
            <button type="submit" className="btn btn-success w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
