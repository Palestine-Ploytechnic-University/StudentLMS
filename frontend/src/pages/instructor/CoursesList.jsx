import React, { useState, useEffect } from "react";

const CoursesList = () => {
  // نقرأ الداتا من localStorage أول مرة
  const [courses, setCourses] = useState(() => {
    const storedCourses = localStorage.getItem("courses");
    return storedCourses ? JSON.parse(storedCourses) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", description: "" });

  // كل ما تغيرت الكورسات نخزنها في localStorage
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleAdd = () => {
    setFormData({ id: null, name: "", description: "" });
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setFormData(course);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id === null) {
      // إضافة كورس جديد
      const newCourse = {
        ...formData,
        id: Date.now(),
      };
      setCourses((prev) => [...prev, newCourse]);
    } else {
      // تعديل كورس موجود
      setCourses((prev) =>
        prev.map((c) => (c.id === formData.id ? formData : c))
      );
    }
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid vh-100 p-4 bg-light">
      <h2 className="mb-4 text-center">Courses List</h2>

      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleAdd}>
          + Add Course
        </button>
      </div>

      {courses.length === 0 ? (
        <p className="text-center">No courses found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Course Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.description}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {formData.id ? "Edit Course" : "Add Course"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowForm(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Course Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">
                    {formData.id ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesList;
