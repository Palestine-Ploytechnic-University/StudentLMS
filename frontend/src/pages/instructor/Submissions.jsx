import React, { useState, useEffect } from "react";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    grade: "",
    submissionDate: "",
    teacherNotes: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("submissions");
    if (stored) setSubmissions(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { studentName, grade, submissionDate } = formData;
    if (!studentName || !grade || !submissionDate) {
      alert("Please fill in all required fields");
      return;
    }

    if (editIndex !== null) {
      const updated = [...submissions];
      updated[editIndex] = formData;
      setSubmissions(updated);
    } else {
      setSubmissions([...submissions, formData]);
    }

    setFormData({
      studentName: "",
      grade: "",
      submissionDate: "",
      teacherNotes: "",
    });
    setEditIndex(null);
    setShowModal(false);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      const updated = submissions.filter((_, i) => i !== index);
      setSubmissions(updated);
    }
  };

  const handleEdit = (index) => {
    setFormData(submissions[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="container-fluid vh-100 p-4 bg-light">
      <h2 className="mb-4 text-center">Student Submissions</h2>

      <div className="mb-3 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Submission
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editIndex !== null ? "Edit Submission" : "Add New Submission"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      setShowModal(false);
                      setEditIndex(null);
                      setFormData({
                        studentName: "",
                        grade: "",
                        submissionDate: "",
                        teacherNotes: "",
                      });
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Student Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      placeholder="Enter student name"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Grade</label>
                    <input
                      type="text"
                      className="form-control"
                      name="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      placeholder="Enter grade"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Submission Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="submissionDate"
                      value={formData.submissionDate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Teacher Notes</label>
                    <textarea
                      className="form-control"
                      name="teacherNotes"
                      value={formData.teacherNotes}
                      onChange={handleChange}
                      placeholder="Add notes here"
                      rows={3}
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    {editIndex !== null ? "Save Changes" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditIndex(null);
                      setFormData({
                        studentName: "",
                        grade: "",
                        submissionDate: "",
                        teacherNotes: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Grade</th>
              <th>Submission Date</th>
              <th>Teacher Notes</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan="5">No submissions available</td>
              </tr>
            ) : (
              submissions.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.studentName}</td>
                  <td>{sub.grade}</td>
                  <td>{sub.submissionDate}</td>
                  <td>{sub.teacherNotes}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
