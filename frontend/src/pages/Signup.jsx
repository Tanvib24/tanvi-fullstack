import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Create account</h2>
        <input name="name" placeholder="Name" onChange={onChange} required />
        <input name="email" placeholder="Email" onChange={onChange} required />
        <input name="password" placeholder="Password" type="password" onChange={onChange} required />
        <button type="submit">Sign up</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
