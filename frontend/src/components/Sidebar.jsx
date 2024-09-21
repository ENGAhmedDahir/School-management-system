import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiUsers, FiClipboard, FiBook, FiEdit } from 'react-icons/fi'; // Import icons
import { FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa'; // More icons from other libraries

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to open/close sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close sidebar when a link is clicked
  const closeSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      {/* Button to toggle sidebar for small screens */}
      <button
        className="text-white bg-blue-500 p-2 rounded-md md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <FiX size={24} /> // Close Icon (X)
        ) : (
          <FiMenu size={24} /> // Menu Icon (Burger)
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed bg-blue-500 h-full p-5 transition-transform transform z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64 md:w-72 lg:w-60`}
      >
        <h1 className="text-white text-2xl font-bold mb-10">Admin Dashboard</h1>
        <nav className="space-y-4">
          <Link to="/dashboard" className="flex items-center text-white hover:text-white" onClick={closeSidebar}>
            <FiHome className="mr-2" /> Dashboard
          </Link>
          <Link to="/students" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiUsers className="mr-2" /> Students
          </Link>
          <Link to="/teachers" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FaChalkboardTeacher className="mr-2" /> Teachers
          </Link>
          <Link to="/classes" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiClipboard className="mr-2" /> Classes
          </Link>
          <Link to="/registerClasses" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiEdit className="mr-2" /> Register Classes
          </Link>
          <Link to="/classesAttendance" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FaClipboardList className="mr-2" /> Attendance Classes
          </Link>
          <Link to="/exam" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiBook className="mr-2" /> Exam
          </Link>
          <Link to="/examResult" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiClipboard className="mr-2" /> Exam Result
          </Link>
          <Link to="/studentsResult" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiClipboard className="mr-2" /> Results
          </Link>
          <Link to="/registerStudent" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiEdit className="mr-2" /> Register Student
          </Link>
          <Link to="/registerTeacher" className="flex items-center text-gray-300 hover:text-white" onClick={closeSidebar}>
            <FiEdit className="mr-2" /> Register Teacher
          </Link>
        </nav>
      </div>

      {/* Overlay to close sidebar when clicking outside on small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
