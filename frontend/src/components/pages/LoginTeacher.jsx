import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginTeacher = () => {
  const [formData, setFormData] = useState({
    teacherId: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teacherId) {
      newErrors.teacherId = 'Please enter your Teacher ID';
    }
    if (!formData.password) {
      newErrors.password = 'Please enter a valid password';
    }
    return newErrors;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('/api/teacher/login-teacher', formData);
      toast.success('Login successful');

      // Store the teacher's role and ID in localStorage or sessionStorage
      localStorage.setItem('role', data.teacher.role);
      localStorage.setItem('teacherId', data.teacher.teacherId);

      console.log('Login successful:', data);
      
      // Conditional navigation based on role
      if (data.teacher.role === 'teacher') {
        navigate('/sidebar');
      } else {
        navigate('/sidebarStudent');
      }

    } catch (e) {
      setLoading(false);
      const errorMessage = e.response?.data?.msg || 'Login failed';
      toast.error(errorMessage);
      console.error('Login failed:', errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-left text-gray-700" htmlFor="teacherId">Teacher ID</label>
            <input
              type="text"
              name="teacherId"
              id="teacherId"
              value={formData.teacherId}
              placeholder='Enter your ID'
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.teacherId && <p className="text-red-500 text-sm">{errors.teacherId}</p>}
          </div>
          <div>
            <label className="block mb-1 text-left text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          
          <button 
            type="submit" 
            className={`w-full py-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginTeacher;
