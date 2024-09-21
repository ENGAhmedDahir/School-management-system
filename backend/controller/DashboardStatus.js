
import Student from '../models/Student.js';  // Assuming you have a Student model
import Teacher from '../models/Teacher.js';  // Assuming you have a Teacher model
import Class from '../models/Class.js';
     // Assuming you have a Class model
// import Attendance from './models/Attendance.js'; // Assuming you have an Attendance model


// Route to fetch dashboard stats
export const getInfo = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Teacher.countDocuments();
    const totalClasses = await Class.countDocuments();
    // const attendanceToday = await Attendance.countDocuments({ date: new Date().toDateString() }); // Assuming attendance has a `date` field

    res.status(200).json({
      totalStudents,
      totalTeachers,
      totalClasses,
    //   attendanceToday,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Error fetching dashboard stats" });
  }
};

