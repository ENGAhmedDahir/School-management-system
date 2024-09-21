import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Attendance = () => {
  const { classId } = useParams(); // Get classId from URL params
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch students for the selected class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`/api/student/get-students?classId=${classId}`);
        setStudents(data);

        // Initialize attendance object with all students marked as absent (false)
        const initialAttendance = data.reduce((acc, student) => {
          acc[student._id] = false; // All students are absent by default
          return acc;
        }, {});
        setAttendance(initialAttendance);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [classId]);

  // Handle checkbox change for marking present/absent
  const handleCheckboxChange = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId], // Toggle present/absent status
    }));
  };

  // Handle form submission for saving attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    const attendanceData = {
      classId,
      students: Object.keys(attendance).map((studentId) => ({
        studentId,
        present: attendance[studentId],
      })),
    };

    try {
      await axios.post('/api/attendance/send-attendence', attendanceData);
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
    }
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="p-5 container mx-auto max-w-screen-md ">
      <h1 className="text-2xl font-semibold mb-5">Attendance for Class</h1>
      <form onSubmit={handleSubmit}>
        {students.map((student) => (
          <div key={student._id} className="mb-2">
            <label className="mr-3">{student.Name}</label>
            <input
              type="checkbox"
              checked={attendance[student._id] || false}
              onChange={() => handleCheckboxChange(student._id)}
            />
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-3">
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default Attendance;
