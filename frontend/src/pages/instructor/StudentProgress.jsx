import React, { useState } from "react";

const StudentProgress = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("studentProgress");
    return saved ? JSON.parse(saved) : [];
  });

  const [newStudent, setNewStudent] = useState({ name: "", scores: "" });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddOrEditStudent = () => {
    const scores = newStudent.scores
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((s) => !isNaN(s));

    if (!newStudent.name || scores.length === 0) return;

    const averageScore = Math.round(
      scores.reduce((a, b) => a + b, 0) / scores.length
    );
    const watchPercentage = `${Math.min(averageScore, 100)}%`;

    const newEntry = {
      name: newStudent.name,
      scores,
      averageScore: `${averageScore}/100`,
      watchPercentage,
    };

    let updated;
    if (editIndex !== null) {
      updated = [...students];
      updated[editIndex] = newEntry;
    } else {
      updated = [...students, newEntry];
    }

    setStudents(updated);
    localStorage.setItem("studentProgress", JSON.stringify(updated));
    setNewStudent({ name: "", scores: "" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
    localStorage.setItem("studentProgress", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    const student = students[index];
    setNewStudent({
      name: student.name,
      scores: student.scores.join(", "),
    });
    setEditIndex(index);
  };

  return (
    <div className="container-fluid vh-100 p-4 bg-light">
      <h2 className="mb-4 text-center">Student Progress</h2>

      <div className="mb-4 row g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Assessment scores (comma separated)"
            name="scores"
            value={newStudent.scores}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleAddOrEditStudent}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Watch Percentage</th>
              <th>Assessment Scores</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.name}</td>
                <td>{s.watchPercentage}</td>
                <td>{s.averageScore}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={4}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentProgress;
