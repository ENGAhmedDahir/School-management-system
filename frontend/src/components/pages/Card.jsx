import React from "react";

const Card = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 shadow rounded-lg flex items-center space-x-4">
      {/* Icon Section */}
      {Icon && <Icon className="text-4xl text-white" />} {/* Adjust icon styles as needed */}

      {/* Text Section */}
      <div>
        <h2 className="text-xl text-white font-medmiu mb-2">{title}</h2>
        <p className="text-3xlt text-white font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card;
