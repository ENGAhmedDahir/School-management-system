const  NavbarTeacher= ({loginTeacher , hanleLogout})=> {
  

    return (
      <nav className="bg-white shadow-md p-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          { loginTeacher&& <span className="text-sm">Welcome, {loginTeacher[0].Name}</span>}
          <button onclick = {hanleLogout} className="text-sm text-blue-600">Logout</button>
        </div>
      </nav>
    );
  }
  

  export default NavbarTeacher;