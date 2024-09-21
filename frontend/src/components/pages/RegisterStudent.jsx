import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Id: '',
   
    password: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    motherName: '',
    classId: '',
    phoneNumber: '',
    emergencyPhone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await axios.get('/api/class/get-class');
        setClasses(data);
      } catch (error) {
        toast.error('Error fetching classes');
        console.error('Error fetching classes:', error);
      }
    };
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/student/register-student', formData);
      toast.success('Successfully registered');
      setLoading(false);
      setFormData({
        Name: '',
        Id: '',
    
        password: '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: '',
        classId: '',
        phoneNumber: '',
        emergencyPhone: '',
        address: ''
      });
      console.log('Student registered:', data);
    } catch (error) {
      setLoading(false);
      toast.error('Registration failed. Please try again.');
      console.error('Error registering student:', error);
    }
  };

  return (
    <div className="p-5 mx-auto max-w-screen-md">
      <h1 className="text-2xl font-semibold mb-5 text-center">Student Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Name', type: 'text', name: 'Name', placeholder: 'Enter student name' },
          { label: 'ID', type: 'text', name: 'Id', placeholder: 'Enter student ID' },
         
          { label: 'Password', type: 'password', name: 'password', placeholder: 'Enter password' },
          { label: 'Date of Birth', type: 'date', name: 'dateOfBirth', placeholder: '' },
          { label: 'Place of Birth', type: 'text', name: 'placeOfBirth', placeholder: 'Enter place of birth' },
          { label: 'Mother\'s Name', type: 'text', name: 'motherName', placeholder: 'Enter mother\'s name' },
          { label: 'Phone Number', type: 'text', name: 'phoneNumber', placeholder: 'Enter phone number' },
          { label: 'Emergency Phone', type: 'text', name: 'emergencyPhone', placeholder: 'Enter emergency phone number' },
          { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter address' }
        ].map(({ label, type, name, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Class</label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.className}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
