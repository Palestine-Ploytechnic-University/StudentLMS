import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnrollmentsView() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  async function fetchEnrollments() {
    try {
      const res = await axios.get('http://localhost:8080/api/enrollments');
      setEnrollments(res.data);
    } catch {
      alert('خطأ في جلب التسجيلات');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`http://localhost:8080/api/enrollments/${id}`);
      fetchEnrollments();
    } catch {
      alert('خطأ في الحذف');
    }
  }

  return (
    <div className="container mt-3">
      <h3>عرض التسجيلات</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>المستخدم</th>
            <th>الدورة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(e => (
            <tr key={e.id}>
              <td>{e.user?.username}</td>
              <td>{e.course?.name}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(e.id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EnrollmentsView;
