import React from 'react';
import { Link } from 'react-router-dom';

const NavbarStudent = ({}) => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="flex justify-between items-center">
        {/* Admin Panel title with responsiveness */}
        <h2 className="text-8xl lg:text-2xl xl:text-3xl text-blue-600 font-semibold">
        LOGO
        </h2>

        {/* User Information */}
             <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 sm:space-y-0 space-y-2">
            <span className="text-sm lg:text-base xl:text-lg">
            
            </span>
        <Link to ='/loginStudent'><button
              
              className="text-sm lg:text-base xl:text-lg p-2 rounded text-white bg-blue-600 hover:cursor-pointer"
            >
            Login
            </button></Link>
          </div>
     
      </div>
    </nav>
  );
};

export default NavbarStudent;