import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ContentReview() 
{
  
  const [contents, setContents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [form, setForm] = useState({
    id: null,
    title: '',
    instructorName: '',
    courseId: '',
    file: null, 
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchContents();
    fetchCourses();
  }, []);

  async function fetchContents() {
    try {
      const res = await axios.get('http://localhost:8080/api/contents');
      setContents(res.data);
    } catch {
      alert('خطأ في جلب المحتوى');
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
    setForm({ id: null, title: '', instructorName: '', courseId: '', file: null });
    setIsEditing(false);
    setModalOpen(true);
  }

  function openEditModal(content) {
    setForm({
      id: content.id,
      title: content.title,
      instructorName: content.instructorName || content.teacherName,
      courseId: content.course?.id || '',
      file: null,
    });
    setIsEditing(true);
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setForm(prev => ({ ...prev, file: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', form.title);
      data.append('instructorName', form.instructorName);
      data.append('courseId', form.courseId);
      if (form.file) data.append('file', form.file);

      if (isEditing) {
        // تعديل المحتوى
        await axios.put(`http://localhost:8080/api/contents/${form.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // إضافة جديد
        await axios.post('http://localhost:8080/api/contents', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      setModalOpen(false);
      fetchContents();
    } catch (err) {
      alert('حدث خطأ أثناء الحفظ');
      console.error(err);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`http://localhost:8080/api/contents/${id}`);
      fetchContents();
    } catch {
      alert('خطأ في الحذف');
    }
  }

  return (
    <div className="container mt-3">
      <h3>مراجعة المحتوى</h3>
      <button className="btn btn-success mb-3" onClick={openAddModal}>إضافة محتوى جديد</button>

      {/* جدول المحتويات */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>العنوان</th>
            <th>اسم المدرس</th>
            <th>الدورة</th>
            <th>الرابط / الملف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(c => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.instructorName || c.teacherName}</td>
              <td>{c.course?.name}</td>
              <td>
                {c.pdfUrl || c.fileUrl ? (
                  <a href={c.pdfUrl || c.fileUrl} target="_blank" rel="noreferrer">فتح الملف</a>
                ) : (
                  'لا يوجد ملف'
                )}
              </td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(c)}>تعديل</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>حذف</button>
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
              <h5 className="modal-title mb-3">{isEditing ? 'تعديل المحتوى' : 'إضافة محتوى جديد'}</h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="عنوان المحتوى"
                  className="form-control mb-2"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="instructorName"
                  placeholder="اسم المدرس"
                  className="form-control mb-2"
                  value={form.instructorName}
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
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="file"
                  name="file"
                  className="form-control mb-2"
                  accept=".pdf,video/*"
                  onChange={handleChange}
                />
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'حفظ التعديل' : 'إضافة'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setModalOpen(false)}
                  >
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

export default ContentReview;
