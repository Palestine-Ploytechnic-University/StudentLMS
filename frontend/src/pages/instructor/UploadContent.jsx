import React from "react";

const UploadContent = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-light p-4">
      <div className="col-md-6 w-100">
        <h2 className="mb-4 text-center">Upload Content for the Course</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Content Title</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Upload file</label>
            <input type="file" className="form-control" />
          </div>
          <button type="submit" className="btn btn-success w-100"> Upload</button>
        </form>
        <hr />
        <h4> Uploaded Contents</h4>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">Lecture 1 - Introduction
            <button className="btn btn-sm btn-outline-danger">Delete</button></li>
        </ul>
      </div>
    </div>
  );
};

export default UploadContent;
