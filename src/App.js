import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import UsersTable from './pages/UsersTable';
import CoursesTable from './pages/CoursesTable';
import EnrollmentsView from './pages/EnrollmentsView';
import ContentReview from './pages/ContentReview';
import AssessmentsDashboard from './pages/AssessmentsDashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) setUser(loggedUser);
  }, []);

  return (
    <Router>
      {user && <Navbar user={user} onLogout={() => setUser(null)} />}
      <Routes>
        <Route path="/" element={user ? <Navigate to="/admin/users" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />

        {user && (
          <>
            <Route path="/admin/users" element={<UsersTable />} />
            <Route path="/admin/courses" element={<CoursesTable />} />
            <Route path="/admin/enrollments" element={<EnrollmentsView />} />
            <Route path="/admin/contents" element={<ContentReview />} />
            <Route path="/admin/assessments" element={<AssessmentsDashboard />} />
          </>
        )}

        <Route path="*" element={<h1 className="text-center mt-5">صفحة غير موجودة</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
