import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClassStudents = () => {
  const { classId } = useParams(); // Get the class ID from the URL
  const [students, setStudents] = useState([]);

  // Fetch students for the specific class
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get(`/api/student/get-students?classId=${classId}`);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [classId]);

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-2xl font-semibold mb-5">Students in Class</h1>
      {students.length === 0 ? (
        <p>No students found in this class.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Date of Birth</th>
              <th className="border p-2">Place of Birth</th>
              <th className="border p-2">Phone Number</th>
              {/* Add other fields as necessary */}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.Id}>
                <td className="border p-2">{student.Id}</td>
                <td className="border p-2">{student.Name}</td>
                <td className="border p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td className="border p-2">{student.placeOfBirth}</td>
                <td className="border p-2">{student.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassStudents;
