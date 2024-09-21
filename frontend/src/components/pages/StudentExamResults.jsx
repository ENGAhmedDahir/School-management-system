import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/exam-result/get-all-students-results');
        setResults(response.data);
      } catch (err) {
        setError('Error fetching results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto max-w-screen-md p-5">
      <h1 className="text-3xl font-bold mb-6 text-center">All Students' Exam Results</h1>
      <div className="overflow-x-auto  ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Student Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Student ID</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Exam</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Total Marks</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 hidden md:table-cell">Grade</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 hidden lg:table-cell">Remarks</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Subjects & Points</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">No results available.</td>
              </tr>
            ) : (
              results.map((result) => (
                <tr key={result._id} className="border-b">
                  <td className="py-3 px-6 text-sm text-gray-900">{result.studentId.Name}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">{result.studentId.Id}</td>
                  <td className="py-3 px-6 text-sm text-gray-900 hidden md:table-cell">{result.examId.examName}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">{result.totalMarks}</td>
                  <td className="py-3 px-6 text-sm text-gray-900 hidden md:table-cell">{result.grade}</td>
                  <td className="py-3 px-6 text-sm text-gray-900 hidden lg:table-cell">{result.remarks}</td>
                  <td className="py-3 px-6 text-sm text-gray-900">
                    <ul className="list-disc list-inside">
                      {result.subjects.map((subject, index) => (
                        <li key={index}>
                          {subject.subjectName}: {subject.points} points
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExamResults;
