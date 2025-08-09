import { Outlet, Link } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div className="vh-100 d-flex flex-column">
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/instructor/dashboard">
            LMS Instructor
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/instructor/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/instructor/assignments">
              Assignments List
            </Link>
            <Link className="nav-link" to="/instructor/courses">
              Courses List
            </Link>
            <Link className="nav-link" to="/instructor/student-progress">
              Student Progress
            </Link>
            <Link className="nav-link" to="/instructor/submissions">
              Submissions
            </Link>
            <Link className="nav-link" to="/instructor/upload-content">
              Upload Content
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow-1 overflow-auto p-4 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default InstructorLayout;
