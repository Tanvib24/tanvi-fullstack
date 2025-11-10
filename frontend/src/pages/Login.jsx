import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Welcome back</h2>
        <input name="email" placeholder="Email" onChange={onChange} required />
        <input name="password" placeholder="Password" type="password" onChange={onChange} required />
        <button type="submit">Log in</button>
        <p>
          Need an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
