import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', form);

    
      localStorage.setItem('user', JSON.stringify(res.data));

     
      if (res.data.role) {
        localStorage.setItem('role', res.data.role);
      }

     
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      onLogin(res.data);
      alert(`مرحباً ${res.data.username}`);

    
      navigate('/dashboard');

    } catch (err) {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="اسم المستخدم"
          className="form-control mb-2"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="كلمة المرور"
          className="form-control mb-2"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100">دخول</button>
      </form>
    </div>
  );
}

export default Login;
