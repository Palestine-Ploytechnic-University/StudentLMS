import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssessmentsDashboard() {
  const [assessments, setAssessments] = useState([]);
  const [courses, setCourses] = useState([]);

  // بيانات النموذج (إضافة أو تعديل)
  const [form, setForm] = useState({
    id: null,
    name: '',
    date: '',
    courseId: '',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAssessments();
    fetchCourses();
  }, []);

  async function fetchAssessments() {
    try {
      const res = await axios.get('http://localhost:8080/api/assessments');
      setAssessments(res.data);
    } catch {
      alert('خطأ في جلب التقييمات');
    }
  }

  async function fetchCourses() {
    try {
      const res = await axios.get('http://localhost:8080/api/courses');
      setCourses(res.data);
    } catch {
      alert('خطأ في جلب الدورات');
    }
  }

  function openAddModal() {
    setForm({ id: null, name: '', date: '', courseId: '' });
    setIsEditing(false);
    setModalOpen(true);
  }

  function openEditModal(assessment) {
    setForm({
      id: assessment.id,
      name: assessment.name,
      date: assessment.date,
      courseId: assessment.course?.id || '',
    });
    setIsEditing(true);
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.date || !form.courseId) {
      alert('يرجى تعبئة كل الحقول');
      return;
    }

    try {
      if (isEditing) {
        // تعديل تقييم
        await axios.put(`http://localhost:8080/api/assessments/${form.id}`, {
          name: form.name,
          date: form.date,
          course: { id: form.courseId },
        });
      } else {
        // إضافة جديد
        await axios.post('http://localhost:8080/api/assessments', {
          name: form.name,
          date: form.date,
          course: { id: form.courseId },
        });
      }

      setModalOpen(false);
      fetchAssessments();
    } catch {
      alert('خطأ في حفظ التقييم');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`http://localhost:8080/api/assessments/${id}`);
      fetchAssessments();
    } catch {
      alert('خطأ في الحذف');
    }
  }

  return (
    <div className="container mt-3">
      <h3>لوحة التقييمات</h3>
      <button className="btn btn-success mb-3" onClick={openAddModal}>
        إضافة تقييم جديد
      </button>

      {/* جدول التقييمات */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>اسم التقييم</th>
            <th>التاريخ</th>
            <th>الدورة</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map(a => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.date}</td>
              <td>{a.course?.name}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(a)}>
                  تعديل
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* مودال الإضافة والتعديل */}
      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">
              <h5 className="modal-title mb-3">{isEditing ? 'تعديل التقييم' : 'إضافة تقييم جديد'}</h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="اسم التقييم"
                  className="form-control mb-2"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  className="form-control mb-2"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
                <select
                  className="form-control mb-2"
                  name="courseId"
                  value={form.courseId}
                  onChange={handleChange}
                  required
                >
                  <option value="">اختر الدورة</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'حفظ التعديل' : 'إضافة'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssessmentsDashboard;
