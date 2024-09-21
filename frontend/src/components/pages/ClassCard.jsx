import React from 'react';
import { Link } from 'react-router-dom';

const ClassCard = ({ classItem }) => {
  console.log(classItem.teacherId.Name);
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{classItem.className}</h2>
      <p>Teacher: {classItem.teacherId?.Name || 'Unknown'}</p>
      <Link to={`/class/${classItem._id}`} className="text-blue-500 py-2 underline">
        See Students
      </Link>
    </div>
  );
};

export default ClassCard;
