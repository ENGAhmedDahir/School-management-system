import { Link } from 'react-router-dom';

const SidebarStudenrt=()=> {
  return (
    <div className="w-64 bg-blue-500 min-h-screen  p-5">
      <h1 className="text-white text-2xl font-bold mb-10">Logo</h1>
      <nav className="space-y-4">
        <Link to="/studenthome" className="text-white hover:text-white block"></Link>
        <Link to="/home" className="text-white hover:text-white block">Home</Link>
      
        <Link to="/about" className="text-gray-300 hover:text-white block">About</Link>
        <Link to="/loginTeachers" className="text-gray-300 hover:text-white block">Teachers</Link>
        <Link to="/loginStudent" className="text-gray-300 hover:text-white block">Student</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white block">contact</Link>
    
      </nav>
    </div>
  );
}

export default SidebarStudenrt;