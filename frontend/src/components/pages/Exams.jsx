import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Exams = () => {
  const [formData, setFormData] = useState({
    examId: '',
    examName: '',
    classId: '',
    examDate: '',
    duration: '',
    totalMarks: '',
    subjects: ['']
  });
  
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    // Fetch classes from backend
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

  const handleSubjectChange = (e, index) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = e.target.value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubjectField = () => {
    setFormData({ ...formData, subjects: [...formData.subjects, ''] });
  };

  const removeSubjectField = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/exam/create-exam', formData);
      toast.success('Exam inserted successfully!');
      setLoading(false);
      // Reset form
      setFormData({
        examId: '',
        examName: '',
        classId: '',
        examDate: '',
        duration: '',
        totalMarks: '',
        subjects: ['']
      });
      console.log('Exam inserted:', data);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to insert exam. Please try again.');
      console.error('Error inserting exam:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Insert Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[ 
          { label: 'Exam ID', type: 'text', name: 'examId', placeholder: 'Enter exam ID' },
          { label: 'Exam Name', type: 'text', name: 'examName', placeholder: 'Enter exam name' },
          { label: 'Exam Date', type: 'date', name: 'examDate', placeholder: '' },
          { label: 'Duration (in minutes)', type: 'number', name: 'duration', placeholder: 'Enter exam duration' },
          { label: 'Total Marks', type: 'number', name: 'totalMarks', placeholder: 'Enter total marks' }
        ].map(({ label, type, name, placeholder }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="mt-1 block w-full p-2 border rounded-md"
              required
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Select Class</label>
          <select
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.className}
              </option>
            ))}
          </select>
        </div>

        {/* Subjects Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Subjects</label>
          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={subject}
                onChange={(e) => handleSubjectChange(e, index)}
                className="mt-1 block w-full p-2 border rounded-md"
                placeholder="Enter subject"
                required
              />
              <button
                type="button"
                onClick={() => removeSubjectField(index)}
                className="ml-2 text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubjectField}
            className="mt-2 text-blue-500"
          >
            Add Subject
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? 'Inserting...' : 'Insert Exam'}
        </button>
      </form>
    </div>
  );
};

export default Exams;
