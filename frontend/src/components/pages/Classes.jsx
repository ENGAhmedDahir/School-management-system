
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClassCard from './ClassCard';


const Classes = () => {
  const [classes, setClasses] = useState([]);

  // Fetch classes from the API
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
    <div className=" mx-auto max-w-screen-md p-5">
      <h1 className="text-2xl font-semibold mb-5">Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <ClassCard key={classItem._id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
};

export default Classes;
