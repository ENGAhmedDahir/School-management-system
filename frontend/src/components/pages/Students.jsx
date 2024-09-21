import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editStudent, setEditStudent] = useState(null); // For editing
  const [classes, setClasses] = useState([]); // State to store the class list
  const navigate = useNavigate();

  // Fetch students data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await axios.get('/api/student/get-students');
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Fetch classes data from the API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get('/api/class/get-class');
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/student/delete/${id}`);
      setStudents(students.filter((student) => student.Id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Handle edit student
  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.Id === id);
    setEditStudent(studentToEdit); // Load student data into form
  };

  // Handle add student
  const handleAdd = () => {
    navigate('/registerStudent');
  };

  // Handle update student
  const handleUpdateStudent = async (e) => {
    e.preventDefault();

    try {
      const { Id, ...updatedData } = editStudent; // Extract ID and other data
      await axios.put(`/api/student/edit/${Id}`, updatedData);

      // Update the state with the new student data
      setStudents(students.map((student) => (student.Id === Id ? editStudent : student)));

      // Clear the edit form after submission
      setEditStudent(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  // Filter students based on the search term
  const filteredStudents = students.filter((student) =>
    student.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get class name by ID
  const getClassNameById = (classId) => {
    if (!classId) return 'No Class Assigned'; // Check if classId is undefined or null
  
    const classItem = classes.find((cls) => cls._id === classId);
    return classItem ? classItem.className : 'Unknown';
  };

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-2xl font-semibold mb-5 border-b-2 border-gray-300 pb-2">Students List</h1>

      {/* Search Input */}
      <div className="mb-4 w-full md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add Student Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white p-2 border border-transparent rounded mb-2 hover:bg-green-700"
        >
          Add Student
        </button>
      </div>

      {/* Responsive Table */}
      <div className="w-full md:hidden">
        {/* Show as list on smaller screens */}
        {filteredStudents.map((student) => (
          <div key={student.Id} className="mb-4 border border-gray-300 p-4 rounded shadow-sm">
            <div className="font-bold border-b-2 border-gray-300 pb-2">{student.Name}</div>
            <div className="border-b border-gray-200 py-1">ID: {student.Id}</div>
            <div className="border-b border-gray-200 py-1">Date of Birth: {new Date(student.dateOfBirth).toLocaleDateString()}</div>
            <div className="border-b border-gray-200 py-1">Place of Birth: {student.placeOfBirth}</div>
            <div className="border-b border-gray-200 py-1">Gender: {student.gender}</div>
            <div className="border-b border-gray-200 py-1">Mother's Name: {student.motherName}</div>
            <div className="border-b border-gray-200 py-1">Class: {getClassNameById(student.classId)}</div>
            <div className="border-b border-gray-200 py-1">Phone Number: {student.phoneNumber}</div>
            <div className="border-b border-gray-200 py-1">Emergency Phone: {student.emergencyPhone}</div>
            <div className="border-b border-gray-200 py-1">Address: {student.address}</div>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(student.Id)}
                className="bg-blue-500 text-white p-2 border border-transparent rounded mr-2 hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student.Id)}
                className="bg-red-500 text-white p-2 border border-transparent rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block w-full  ">
        <table className="w-full border-collapse border ">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Date of Birth</th>
              <th className="border p-2">Place of Birth</th>
              <th className="border p-2">Gender</th>
              <th className="border p-2">Mother's Name</th>
              <th className="border p-2">Class</th>
              <th className="border p-2">Phone Number</th>
              <th className="border p-2">Emergency Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.Id} className="border-b border-gray-200">
                <td className="border p-2">{student.Id}</td>
                <td className="border p-2">{student.Name}</td>
                <td className="border p-2">{new Date(student.dateOfBirth).toLocaleDateString()}</td>
                <td className="border p-2">{student.placeOfBirth}</td>
                <td className="border p-2">{student.gender}</td>
                <td className="border p-2">{student.motherName}</td>
                <td className="border p-2">{getClassNameById(student.classId)}</td>
                <td className="border p-2">{student.phoneNumber}</td>
                <td className="border p-2">{student.emergencyPhone}</td>
                <td className="border p-2">{student.address}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(student.Id)}
                    className="bg-blue-500 text-white p-2 border border-transparent rounded mr-2 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.Id)}
                    className="bg-red-500 text-white p-2 border border-transparent rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form */}
      {editStudent && (
        <div className="mt-5 w-full md:w-2/3 lg:w-1/2 border border-gray-300 p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2">Edit Student: {editStudent.Name}</h2>
          <form onSubmit={handleUpdateStudent} className="grid grid-cols-1 gap-4">
            {/* Add form fields */}
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={editStudent.Name}
                onChange={(e) => setEditStudent({ ...editStudent, Name: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Date of Birth:</label>
              <input
                type="date"
                value={editStudent.dateOfBirth}
                onChange={(e) => setEditStudent({ ...editStudent, dateOfBirth: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Place of Birth:</label>
              <input
                type="text"
                value={editStudent.placeOfBirth}
                onChange={(e) => setEditStudent({ ...editStudent, placeOfBirth: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Gender:</label>
              <select
                value={editStudent.gender}
                onChange={(e) => setEditStudent({ ...editStudent, gender: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Mother's Name:</label>
              <input
                type="text"
                value={editStudent.motherName}
                onChange={(e) => setEditStudent({ ...editStudent, motherName: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Class:</label>
              <select
                value={editStudent.classId}
                onChange={(e) => setEditStudent({ ...editStudent, classId: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.className}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Phone Number:</label>
              <input
                type="tel"
                value={editStudent.phoneNumber}
                onChange={(e) => setEditStudent({ ...editStudent, phoneNumber: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Emergency Phone:</label>
              <input
                type="tel"
                value={editStudent.emergencyPhone}
                onChange={(e) => setEditStudent({ ...editStudent, emergencyPhone: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Address:</label>
              <input
                type="text"
                value={editStudent.address}
                onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="col-span-2 bg-blue-500 text-white p-2 border border-transparent rounded mt-4 hover:bg-blue-700"
            >
              Update Student
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Students;
