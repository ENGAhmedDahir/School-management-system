import { Link } from 'react-router-dom';
import { FaCalendarAlt,  FaClipboardList, FaBook,  FaUserCircle } from 'react-icons/fa';

const StudentInfo = () => {
  return (
    <div className="min-h-screen ">
      {/* <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Student Portal</h1>
        <div className="text-right">
          <p className="text-gray-500">13 Sep 2024</p>
          <p className="font-medium">Friday</p>
        </div>
        <FaCalendarAlt className="text-green-500 text-2xl" />
      </div> */}

      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Exams */}
        <Link to="/exams" className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaBook className="text-red-500 text-4xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Exams</h2>
          <p className="text-gray-500">Examination Information</p>
        </Link>

        
        {/* Attendance */}
        <Link to="/attendance" className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaClipboardList className="text-red-500 text-4xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Attendance</h2>
          <p className="text-gray-500">Attendance Information</p>
        </Link>

        {/* Schedule */}
        <Link to="/schedule" className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaCalendarAlt className="text-red-500 text-4xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Schedule</h2>
          <p className="text-gray-500">Academic Schedule</p>
        </Link>

        <Link to="/profile" className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <FaUserCircle className="text-gray-500 text-4xl mb-4" />
          <h2 className="text-lg font-semibold text-gray-700">Profile</h2>
          <p className="text-gray-500">Student Information</p>
        </Link>
      </div>
    </div>
  );
};

export default StudentInfo;
