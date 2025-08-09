import { Routes, Route, Navigate } from "react-router-dom";
import InstructorLayout from "./layouts/InstructorLayout";
import Dashboard from "./pages/instructor/Dashboard";
import AssignmentsList from "./pages/instructor/AssignmentsList";
import CoursesList from "./pages/instructor/CoursesList";
import StudentProgress from "./pages/instructor/StudentProgress";
import Submissions from "./pages/instructor/Submissions";
import UploadContent from "./pages/instructor/UploadContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/instructor/dashboard" replace />} />
      <Route path="/instructor" element={<InstructorLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assignments" element={<AssignmentsList />} />
        <Route path="courses" element={<CoursesList />} />
        <Route path="student-progress" element={<StudentProgress />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="upload-content" element={<UploadContent />} />
      </Route>
    </Routes>
  );
}

export default App;
