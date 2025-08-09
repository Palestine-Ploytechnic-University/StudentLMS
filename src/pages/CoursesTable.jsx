// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function CoursesTable() {
//   const [courses, setCourses] = useState([]);

//   // بيانات النموذج للإضافة أو التعديل
//   const [form, setForm] = useState({ id: null, name: '', description: '' });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   async function fetchCourses() {
//     try {
//       const res = await axios.get('http://localhost:8080/api/courses');
//       setCourses(res.data);
//     } catch {
//       alert('خطأ في جلب الدورات');
//     }
//   }

//   function openAddModal() {
//     setForm({ id: null, name: '', description: '' });
//     setIsEditing(false);
//     setModalOpen(true);
//   }

//   function openEditModal(course) {
//     setForm({ id: course.id, name: course.name, description: course.description });
//     setIsEditing(true);
//     setModalOpen(true);
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       if (isEditing) {
//         // تعديل
//         await axios.put(`http://localhost:8080/api/courses/${form.id}`, {
//           name: form.name,
//           description: form.description,
//         });
//       } else {
//         // إضافة
//         await axios.post('http://localhost:8080/api/courses', {
//           name: form.name,
//           description: form.description,
//         });
//       }
//       setModalOpen(false);
//       fetchCourses();
//     } catch {
//       alert('حدث خطأ أثناء الحفظ');
//     }
//   }

//   async function handleDelete(id) {
//     if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
//     try {
//       await axios.delete(`http://localhost:8080/api/courses/${id}`);
//       fetchCourses();
//     } catch {
//       alert('خطأ في الحذف');
//     }
//   }

//   return (
//     <div className="container mt-3">
//       <h3>جدول الدورات</h3>
//       <button className="btn btn-success mb-3" onClick={openAddModal}>
//         إضافة دورة جديدة
//       </button>

//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>اسم الدورة</th>
//             <th>الوصف</th>
//             <th>إجراءات</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map(c => (
//             <tr key={c.id}>
//               <td>{c.name}</td>
//               <td>{c.description}</td>
//               <td>
//                 <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(c)}>
//                   تعديل
//                 </button>
//                 <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>
//                   حذف
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* مودال الإضافة والتعديل */}
//       {modalOpen && (
//         <div
//           className="modal d-block"
//           tabIndex="-1"
//           role="dialog"
//           style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//         >
//           <div className="modal-dialog" role="document">
//             <div className="modal-content p-3">
//               <h5 className="modal-title mb-3">
//                 {isEditing ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
//               </h5>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="name"
//                   placeholder="اسم الدورة"
//                   className="form-control mb-2"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <textarea
//                   name="description"
//                   placeholder="وصف الدورة"
//                   className="form-control mb-2"
//                   value={form.description}
//                   onChange={handleChange}
//                   required
//                 />
//                 <div className="d-flex justify-content-between">
//                   <button type="submit" className="btn btn-primary">
//                     {isEditing ? 'حفظ التعديل' : 'إضافة'}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setModalOpen(false)}
//                   >
//                     إلغاء
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CoursesTable;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // استيراد useNavigate
import axios from 'axios';

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', description: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // التحقق من صلاحيات الدخول
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("ليس لديك صلاحية الدخول");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await axios.get('http://localhost:8080/api/courses');
      setCourses(res.data);
    } catch {
      alert('خطأ في جلب الدورات');
    }
  }

  function openAddModal() {
    setForm({ id: null, name: '', description: '' });
    setIsEditing(false);
    setModalOpen(true);
  }

  function openEditModal(course) {
    setForm({ id: course.id, name: course.name, description: course.description });
    setIsEditing(true);
    setModalOpen(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:8080/api/courses/${form.id}`, {
          name: form.name,
          description: form.description,
        });
      } else {
        await axios.post('http://localhost:8080/api/courses', {
          name: form.name,
          description: form.description,
        });
      }
      setModalOpen(false);
      fetchCourses();
    } catch {
      alert('حدث خطأ أثناء الحفظ');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      fetchCourses();
    } catch {
      alert('خطأ في الحذف');
    }
  }

  return (
    <div className="container mt-3">
      <h3>جدول الدورات</h3>
      <button className="btn btn-success mb-3" onClick={openAddModal}>
        إضافة دورة جديدة
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>اسم الدورة</th>
            <th>الوصف</th>
            <th>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.description}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(c)}>
                  تعديل
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">
              <h5 className="modal-title mb-3">
                {isEditing ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
              </h5>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="اسم الدورة"
                  className="form-control mb-2"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  placeholder="وصف الدورة"
                  className="form-control mb-2"
                  value={form.description}
                  onChange={handleChange}
                  required
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

export default CoursesTable;
