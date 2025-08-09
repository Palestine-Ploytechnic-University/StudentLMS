import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', email: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  // هنا ضع الدالة الجديدة:
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = { ...form, role: "admin" };
      await axios.post('http://localhost:8080/api/auth/register', data);
      alert('تم التسجيل بنجاح!');
      setForm({ username: '', password: '', email: '' });
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert('حدث خطأ في التسجيل');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2>تسجيل حساب</h2>
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
          name="email"
          type="email"
          placeholder="البريد الإلكتروني"
          className="form-control mb-2"
          value={form.email}
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
        <button className="btn btn-primary w-100">تسجيل</button>
      </form>
    </div>
  );
}

export default Register;
