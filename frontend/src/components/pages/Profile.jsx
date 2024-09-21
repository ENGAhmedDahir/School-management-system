import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({classItem}) => {
  
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); // Assuming studentId is stored in localStorage

  useEffect(() => {
    if (!studentId) {
      navigate('/loginStudent');
      return;
    }

    const fetchStudentData = async () => {
      try {
        const { data } = await axios.get(`/api/student/specefic/${studentId}`);  // Fixed URL
        setStudentData(data);
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId, navigate]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {studentData && (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          {/* Student Name and Basic Info */}
          <div className="text-center mb-6">
            <div className="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold">{studentData.Name}</h2>
            <div className="flex justify-center space-x-8 mt-4">
              <div>
                <p className="font-semibold">{studentData.Id}</p>
                <p className="text-gray-500">Student ID</p>
              </div>
        
            </div>
          </div>

          {/* Add a line (hr) under the name and basic info */}
          <hr className="border-gray-300 my-4" />

          {/* Academic Information */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Academic Information</h3>
            <div className="space-y-2">
              <p><strong>Class:</strong> {studentData.classId || 'N/A'}</p>
            </div>
          </div>

          {/* Add a line (hr) under academic information */}
          <hr className="border-gray-300 my-4" />

          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Personal Information</h3>
            <div className="space-y-2">
              <p><strong>Gender:</strong> {studentData.gender}</p>
              <p><strong>Place of Birth:</strong> {studentData.placeOfBirth}</p>
              <p><strong>Address:</strong> {studentData.address}</p>
              <p><strong>Mother's Name:</strong> {studentData.motherName}</p>
            </div>
          </div>

          {/* Add a line (hr) under personal information */}
          <hr className="border-gray-300 my-4" />

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><strong>Phone Number:</strong> {studentData.phoneNumber}</p>
              <p><strong>Email:</strong> {studentData.email || 'N/A'}</p>
              <p><strong>Emergency Phone:</strong> {studentData.emergencyPhone}</p>
            </div>
          </div>

          
        </div>
      )}
    </div>
  );
};

export default Profile;
