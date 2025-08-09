import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand" to="/admin">LMS Admin</Link>
      <div className="collapse navbar-collapse">
        {user && (
          <>
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/admin/users">المستخدمون</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/courses">الدورات</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/enrollments">التسجيلات</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/contents">المحتوى</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/assessments">التقييمات</Link></li>
            </ul>
            <button className="btn btn-outline-danger" onClick={handleLogout}>تسجيل خروج</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
