import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTeacher, setEditTeacher] = useState(null); // For editing
  const navigate = useNavigate();

  // Fetch teachers data from the API
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get('/api/teacher/get-teacher'); // Ensure correct endpoint
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle delete teacher
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/teacher/delete-teacher/${id}`); // Ensure correct endpoint
      setTeachers(teachers.filter((teacher) => teacher.teacherId !== id));
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  // Handle edit teacher
  const handleEdit = (id) => {
    const teacherToEdit = teachers.find((teacher) => teacher.teacherId === id);
    setEditTeacher(teacherToEdit); // Load teacher data into form
  };

  // Handle add teacher
  const handleAdd = () => {
    navigate('/registerTeacher'); // Navigate to the teacher registration page
  };

  // Handle update teacher (submit the edit form)
  const handleUpdateTeacher = async (e) => {
    e.preventDefault();

    try {
      const { teacherId, ...updatedData } = editTeacher; // Extract ID and other data
      await axios.put(`/api/teacher/edit-teacher/${teacherId}`, updatedData); // Ensure correct endpoint

      // Update the state with the new teacher data
      setTeachers(teachers.map((teacher) => (teacher.teacherId === teacherId ? editTeacher : teacher)));

      // Clear the edit form after submission
      setEditTeacher(null);
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  // Filter teachers based on the search term
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-5 border-b-2 border-gray-300 mr-[600px]  pb-2">Teachers List</h1>

      {/* Search Input */}
      <div className="mb-4 w-[400px] mr-[300px]  md:w-1/2 sm:m-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Add Teacher Button */}
      <div className="mb-4">
        <button
          onClick={handleAdd}
          className="bg-green-500 mr-[600px]  text-white p-2 border border-transparent rounded mb-2 hover:bg-green-700"
        >
          Add Teacher
        </button>
      </div>

      {/* Responsive Table */}
      <div className="w-full md:hidden">
        {/* Show as list on smaller screens */}
        {filteredTeachers.map((teacher) => (
          <div key={teacher.teacherId} className="mb-4 border border-gray-300 p-4 rounded shadow-sm">
            <div className="font-bold border-b-2 border-gray-300 pb-2">{teacher.Name}</div>
            <div className="border-b border-gray-200 py-1">Teacher ID: {teacher.teacherId}</div>
            <div className="border-b border-gray-200 py-1">Email: {teacher.email}</div>
            <div className="border-b border-gray-200 py-1">Contact Number: {teacher.contactNumber}</div>
            <div className="border-b border-gray-200 py-1">Subject Specialization: {teacher.subjectSpecialization}</div>
            <div className="border-b border-gray-200 py-1">Hire Date: {new Date(teacher.hireDate).toLocaleDateString()}</div>
            <div className="border-b border-gray-200 py-1">Salary: {teacher.salary}</div>
            <div className="border-b border-gray-200 py-1">Status: {teacher.status}</div>
            <div className="mt-2">
              <button
                onClick={() => handleEdit(teacher.teacherId)}
                className="bg-blue-500 text-white p-2 border border-transparent rounded mr-2 hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(teacher.teacherId)}
                className="bg-red-500 text-white p-2 border border-transparent rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block w-[900px]  ml-[150px]">
        <table className="w-full border-collapse border min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="border p-2">Teacher ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Contact Number</th>
              <th className="border p-2">Subject Specialization</th>
              <th className="border p-2">Hire Date</th>
              <th className="border p-2">Salary</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.teacherId} className="border-b border-gray-200">
                <td className="border p-2">{teacher.teacherId}</td>
                <td className="border p-2">{teacher.Name}</td>
                <td className="border p-2">{teacher.email}</td>
                <td className="border p-2">{teacher.contactNumber}</td>
                <td className="border p-2">{teacher.subjectSpecialization}</td>
                <td className="border p-2">{new Date(teacher.hireDate).toLocaleDateString()}</td>
                <td className="border p-2">{teacher.salary}</td>
                <td className="border p-2">{teacher.status}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(teacher.teacherId)}
                    className="bg-blue-500 text-white p-2 border border-transparent rounded mr-2 hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher.teacherId)}
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
      {editTeacher && (
        <div className="mt-5 w-full md:w-2/3 lg:w-1/2 border border-gray-300 p-4 rounded shadow-sm">
          <h2 className="text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2">Edit Teacher: {editTeacher.Name}</h2>
          <form onSubmit={handleUpdateTeacher} className="grid grid-cols-1 gap-4">
            {/* Name */}
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                value={editTeacher.Name}
                onChange={(e) => setEditTeacher({ ...editTeacher, Name: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={editTeacher.email}
                onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block mb-2">Contact Number:</label>
              <input
                type="text"
                value={editTeacher.contactNumber}
                onChange={(e) => setEditTeacher({ ...editTeacher, contactNumber: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Subject Specialization */}
            <div className="mb-4">
              <label className="block mb-2">Subject Specialization:</label>
              <input
                type="text"
                value={editTeacher.subjectSpecialization}
                onChange={(e) => setEditTeacher({ ...editTeacher, subjectSpecialization: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Hire Date */}
            <div className="mb-4">
              <label className="block mb-2">Hire Date:</label>
              <input
                type="date"
                value={editTeacher.hireDate.split('T')[0]}
                onChange={(e) => setEditTeacher({ ...editTeacher, hireDate: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Salary */}
            <div className="mb-4">
              <label className="block mb-2">Salary:</label>
              <input
                type="number"
                value={editTeacher.salary}
                onChange={(e) => setEditTeacher({ ...editTeacher, salary: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block mb-2">Status:</label>
              <select
                value={editTeacher.status}
                onChange={(e) => setEditTeacher({ ...editTeacher, status: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 border border-transparent rounded hover:bg-blue-700"
              >
                Update Teacher
              </button>
              <button
                type="button"
                onClick={() => setEditTeacher(null)}
                className="ml-2 bg-gray-500 text-white p-2 border border-transparent rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Teachers;
