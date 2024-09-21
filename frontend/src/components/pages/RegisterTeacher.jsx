import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RegisterTeacher = () => {
  const [formData, setFormData] = useState({
    teacherId: '',
    Name: '',
    password: '',
    subjectSpecialization: '',
    email: '',
    contactNumber: '',
    address: '',
    salary: '',
    hireDate: ''  // Added hireDate to the state
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/teacher/teacher-register', formData);
      toast.success('Teacher registered successfully!');
      setFormData({
        teacherId: '',
        Name: '',
        password: '',
        subjectSpecialization: '',
        email: '',
        contactNumber: '',
        address: '',
        salary: '',
        hireDate: ''  // Reset hireDate after successful submission
      });
    } catch (error) {
      console.error('Error registering teacher', error);
      toast.error('Failed to register teacher');
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-2xl font-bold mb-4">Register New Teacher</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing fields */}
        <div>
          <label className="block mb-2 font-medium">Teacher ID</label>
          <input
            type="text"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            placeholder="Teacher ID"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Full Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Subject Specialization</label>
          <input
            type="text"
            name="subjectSpecialization"
            value={formData.subjectSpecialization}
            onChange={handleChange}
            placeholder="Subject Specialization"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Salary"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* New hireDate field */}
        <div>
          <label className="block mb-2 font-medium">Hire Date</label>
          <input
            type="date"
            name="hireDate"
            value={formData.hireDate}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Register Teacher
        </button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
