import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setUsers(res.data);
    } catch (err) {
      alert('خطأ في جلب المستخدمين');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('خطأ في الحذف');
    }
  }

  return (
    <div className="container mt-3">
      <h3>جدول المستخدمين</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>اسم المستخدم</th>
            <th>البريد الإلكتروني</th>
            <th>الصلاحية</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
