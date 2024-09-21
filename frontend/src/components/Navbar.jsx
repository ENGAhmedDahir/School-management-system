import React from 'react';
import { FaUser } from 'react-icons/fa'; // Importing the user icon

const Navbar = ({ user, handleLogout }) => {
  console.log(user)
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex flex-col lg:flex-row justify-around items-center">
  
        <h2 className="text-lg lg:text-xl ml-4 xl:text-2xl text-center font-semibold mb-2 lg:mb-0">
          Admin Dashboard
        </h2>

        {user && (
          <div className="flex flex-col  sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
            <span className="flex items-center text-sm lg:text-base xl:text-lg">
              <FaUser className="mr-1 text-gray-600" /> 
              Welcome, {user[0].username}
            </span>
            <button
              onClick={handleLogout}
              className="text-xl lg:text-base xl:text-lg text-white p-2 rounded bg-blue-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
