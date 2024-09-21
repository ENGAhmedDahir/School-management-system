import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ExamResultForm = () => {
    const [exams, setExams] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        examId: '',
        studentId: '',
        subjects: [{ subjectName: '', points: '' }],
        totalMarks: '',
        grade: '',
        remarks: ''
    });

    useEffect(() => {
        const fetchExamsAndStudents = async () => {
            const examResponse = await axios.get('/api/exam/get-exam');
            const studentResponse = await axios.get('/api/student/get-students');
            setExams(examResponse.data);
            setStudents(studentResponse.data);
        };

        fetchExamsAndStudents();
    }, []);

    const handleSubjectChange = (index, e) => {
        const newSubjects = formData.subjects.slice();
        newSubjects[index][e.target.name] = e.target.value;
        setFormData({ ...formData, subjects: newSubjects });
    };

    const addSubjectField = () => {
        setFormData({
            ...formData,
            subjects: [...formData.subjects, { subjectName: '', points: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/exam-result/add-result', formData);
            toast.success('Results have been submitted successfully!'); 
        } catch (error) {
          toast.error('An error occurred while submitting the results.'); 
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-screen-md p-5">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Submit Exam Results</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Exam</label>
                        <select
                            name="examId"
                            value={formData.examId}
                            onChange={(e) => setFormData({ ...formData, examId: e.target.value })}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Exam</option>
                            {exams.map((exam) => (
                                <option key={exam._id} value={exam._id}>
                                    {exam.examName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Student</label>
                        <select
                            name="studentId"
                            value={formData.studentId}
                            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Student</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.Name} : {student.Id}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Subjects and Points */}
                    {formData.subjects.map((subject, index) => (
                        <div key={index} className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={subject.subjectName}
                                    onChange={(e) => handleSubjectChange(index, e)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Points</label>
                                <input
                                    type="number"
                                    name="points"
                                    value={subject.points}
                                    onChange={(e) => handleSubjectChange(index, e)}
                                    required
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSubjectField}
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add Subject
                    </button>

                    {/* Total Marks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Total Marks</label>
                        <input
                            type="number"
                            name="totalMarks"
                            value={formData.totalMarks}
                            onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Grade */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Grade</label>
                        <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <input
                            type="text"
                            name="remarks"
                            value={formData.remarks}
                            onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Submit Results
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExamResultForm;
