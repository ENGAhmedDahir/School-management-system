import axios from 'axios';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const RegisterClass = () => {
  const [formData, setFormData] = useState({
    classId: '',
    className: '',
    teacherId: '',
    students: [], // This will be an array of student IDs
    subjects: [{ name: '', teacherId: '' }] // Array to handle multiple subjects
  });
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]); // State to store the teacher list
  const [students, setStudents] = useState([]); // State to store the student list

  // Fetch teachers and students from the database when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherResponse = await axios.get('/api/teacher/get-teacher'); // Fetch teachers
        setTeachers(teacherResponse.data);

        // const studentResponse = await axios.get('/api/student/get-students'); // Fetch students
        // setStudents(studentResponse.data);

      } catch (error) {
        toast.error('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const newSubjects = formData.subjects.map((subject, i) =>
      i === index ? { ...subject, [name]: value } : subject
    );
    setFormData({ ...formData, subjects: newSubjects });
  };

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', teacherId: '' }]
    });
  };

  const removeSubject = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/class/register-class', formData);
      toast.success('Class registered successfully');
      setLoading(false);
      setFormData({
        classId: '',
        className: '',
        teacherId: '',
        students: [],
        subjects: [{ name: '', teacherId: '' }]
      });
      console.log('Class registered:', data);
    } catch (error) {
      setLoading(false);
      toast.error('Registration failed. Please try again.');
      console.error('Error registering class:', error);
    }
  };

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-2xl font-semibold mb-5">Class Registration Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Class ID</label>
          <input
            type="text"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            placeholder="Enter class ID"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Class Name</label>
          <input
            type="text"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Enter class name"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Teacher</label>
          <select
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map(teacher => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.Name}
              </option>
            ))}
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium mb-1">Students</label>
          <select
            multiple
            name="students"
            value={formData.students}
            onChange={(e) => setFormData({
              ...formData,3
              students: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="w-full p-2 border rounded"
          >
            {students.map(student => (
              <option key={student._id} value={student._id}>
                {student.Name}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label className="block text-sm font-medium mb-1">Subjects</label>
          {formData.subjects.map((subject, index) => (
            <div key={index} className="border p-2 mb-2 rounded">
              <div>
                <label className="block text-sm font-medium mb-1">Subject Name</label>
                <input
                  type="text"
                  name="name"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, e)}
                  placeholder="Enter subject name"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject Teacher</label>
                <select
                  name="teacherId"
                  value={subject.teacherId}
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Teacher</option>
                  {teachers.map(teacher => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.Name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeSubject(index)}
                className="mt-2 p-1 bg-red-500 text-white rounded"
              >
                Remove Subject
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubject}
            className="p-2 bg-green-500 text-white rounded"
          >
            Add Subject
          </button>
        </div>

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterClass;
