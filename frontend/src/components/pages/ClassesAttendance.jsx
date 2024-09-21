import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Classes = () => {
  const [classes, setClasses] = useState([]);

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

  return (
    <div className="p-5 mx-auto max-w-screen-md"> {/* Added margin for the sidebar and full width */}
      <h1 className="text-2xl font-semibold mb-5 text-center">Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Responsive grid layout */}
        {classes.map((classItem) => (
          <Link
            key={classItem._id}
            to={`/attendance/${classItem._id}`} // Link to the attendance page for each class
            className="bg-white shadow-lg rounded-lg p-5 hover:bg-blue-100 transition"
          >
            <h2 className="text-xl font-semibold">{classItem.className}</h2>
            <p>Teacher: {classItem.teacherId?.name || 'N/A'}</p>
        
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Classes;
