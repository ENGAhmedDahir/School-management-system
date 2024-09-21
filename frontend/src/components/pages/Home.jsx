import React from 'react';
import { FaCalculator, FaFlask, FaHistory, FaBookOpen, FaLaptopCode, FaDumbbell } from 'react-icons/fa'; // Import icons
// import showCase from '../images/showCase.jpg';
import showCase from '../../images/showCase.jpg'; // If 'images' is directly under 'src'


const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Our School</h1>
      <p className="text-lg mb-6 text-center">
      Our school is the best school with quality education.
      </p>
      <img 
        src={showCase}
        alt="School Management" 
        className="w-[600px]  h-[400px] rounded-lg shadow-md mb-10"
      />

      {/* Cards Section for Subjects */}
      <h2 className="text-3xl font-bold mb-6">Some of Our Subjects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-10">
        {/* Math Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaCalculator className="text-6xl text-blue-500 mx-auto mb-4" /> {/* Icon for Mathematics */}
          <h3 className="text-2xl font-bold mb-2">Mathematics</h3>
          <p>Develop critical thinking and problem-solving skills.</p>
        </div>

        {/* Science Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaFlask className="text-6xl text-green-500 mx-auto mb-4" /> {/* Icon for Science */}
          <h3 className="text-2xl font-bold mb-2">Science</h3>
          <p>Explore the world of biology, physics, and chemistry.</p>
        </div>

        {/* History Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaHistory className="text-6xl text-yellow-500 mx-auto mb-4" /> {/* Icon for History */}
          <h3 className="text-2xl font-bold mb-2">History</h3>
          <p>Learn about world events, cultures, and civilizations.</p>
        </div>

        {/* English Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaBookOpen className="text-6xl text-red-500 mx-auto mb-4" /> {/* Icon for English */}
          <h3 className="text-2xl font-bold mb-2">English</h3>
          <p>Improve your communication and writing skills.</p>
        </div>

        {/* Computer Science Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaLaptopCode className="text-6xl text-purple-500 mx-auto mb-4" /> {/* Icon for Computer Science */}
          <h3 className="text-2xl font-bold mb-2">Technology</h3>
          <p>Learn programming and the basics of computers.</p>
        </div>

        {/* Physical Education Subject Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaDumbbell className="text-6xl text-orange-500 mx-auto mb-4" /> {/* Icon for Physical Education */}
          <h3 className="text-2xl font-bold mb-2">Physical Education</h3>
          <p>Stay active and develop a healthy lifestyle.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;