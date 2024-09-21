import React from "react";
import { FaUserGraduate, FaBook, FaSchool, FaUsers } from 'react-icons/fa'; // Icons from react-icons

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <p className="text-center text-lg mb-10">
        Welcome to our School .<br /> We are proud to offer comprehensive education management services <br /> for students, teachers, and administrators. Here are some of our key statistics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-10 mb-12">
        {/* Students Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUsers className="text-6xl text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">500 Students</h2>
          <p>Currently enrolled in our system.</p>
        </div>

        {/* Graduates Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUserGraduate className="text-6xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">200 Graduates</h2>
          <p>Successfully completed their studies.</p>
        </div>

        {/* Subjects Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaBook className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">30 Subjects</h2>
          <p>Offered in our school curriculum.</p>
        </div>

        {/* Branches Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <FaSchool className="text-6xl text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">5 Branches</h2>
          <p>Located in different cities.</p>
        </div>
      </div>

      {/* Mission, Vision, and Goals */}
      <div className="w-full px-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission, Vision, and Goals</h2>

        <div className="space-y-8">
          {/* Mission */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              Our mission is to provide a high-quality education that empowers students to reach their full potential. We are committed to fostering an inclusive and supportive environment where every student can thrive.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              Our vision is to be a leading educational institution known for innovation and excellence in teaching and learning. We aim to inspire lifelong learning and cultivate global citizens who are equipped to tackle future challenges.
            </p>
          </div>

          {/* Goals */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4">Our Goals</h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>To enhance student achievement through a rigorous and relevant curriculum.</li>
              <li>To foster a positive and collaborative learning environment for all stakeholders.</li>
              <li>To integrate technology and innovation in teaching and administrative processes.</li>
              <li>To support the professional growth and development of our staff.</li>
              <li>To build strong partnerships with the community and stakeholders.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
