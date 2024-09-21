import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import SidebarStudent from './components/SidebarStudent';
import Navbar from './components/Navbar';
import Dashboard from './components/pages/Dashboard';
import Students from './components/pages/Students';
import RegisterStudent from './components/pages/RegisterStudent';
import RegisterTeacher from './components/pages/RegisterTeacher';
import Teachers from './components/pages/Teachers';
import RegisterClass from './components/pages/RegisterClass';
import ClassesAttendance from './components/pages/ClassesAttendance';
import ClassStudents from './components/pages/ClassStudents';
import Attendance from './components/pages/Attendance';
import Classes from './components/pages/Classes';
import Home from './components/pages/Home';
import LoginTeacher from './components/pages/LoginTeacher';
import NavbarTeacher from './components/NavbarTeacher';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import LoginStudent from './components/pages/LoginStudent';
import StudentInfo from './components/pages/StudentInfo';
import Profile from './components/pages/Profile';
import Schedule from './components/pages/Schedule';
import NavbarStudent from './components/pages/NavbarStudent';
import ExamResult from './components/pages/ExamResult';
import Exams from './components/pages/Exams';
import StudentExamResults from './components/pages/StudentExamResults';

function App() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/get-user');
        console.log(response.data);
        setUser(response.data);
      
      } catch (e) {
        console.error('Error fetching user:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Logout handler
  const handleLogout = () => {
  
    setUser(null);
  
    navigate('/');
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<LoginForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/loginStudent' element={<LoginStudent />} />
        <Route path='/loginTeachers' element={<LoginTeacher />} />
      </Routes>



        {/* <div className="flex">
          <SidebarStudent />
          <div className="flex-1">
            <NavbarStudent  />
            <div className="p-4">
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/studentInfo' element={<StudentInfo />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/schedule' element={<Schedule />} />
              </Routes>
            </div>
          </div>
        </div> */}


      { (
        // Admin pages
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="p-4">
              <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/attendance/:classId' element={<Attendance />} />
                <Route path='/students' element={<Students />} />
                <Route path='/classesAttendance' element={<ClassesAttendance />} />
                <Route path='/classes' element={<Classes />} />
                <Route path='/class/:classId' element={<ClassStudents />} />
                <Route path='/teachers' element={<Teachers />} />
                <Route path='/registerClasses' element={<RegisterClass />} />
                <Route path='/registerStudent' element={<RegisterStudent />} />
                <Route path='/registerTeacher' element={<RegisterTeacher />} />
                <Route path='/exam' element={<Exams/>} />
                <Route path='/examResult' element={<ExamResult />} />
                <Route path='/studentsResult' element={<StudentExamResults />} />
              </Routes>
            </div>
          </div>
        </div>
      )}

      
    </>
  );
}

export default App;
