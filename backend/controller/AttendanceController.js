import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js'; // Assuming you have a Student model
import Class from '../models/Class.js';     // Assuming you have a Class model


// Mark attendance for a class
export const markAttendance = async (req, res) => {
  const { students } = req.body;
  const { classId } = req.params; // Expecting 'classId' to be a string (e.g., "12A")

  console.log('Request received:', classId, students);

  try {
    if (!students || students.length === 0) {
      return res.status(400).json({ error: 'No students provided' });
    }

    // Check if the class exists by classId string
    const classExists = await Class.findOne({ classId });
    if (!classExists) {
      return res.status(404).json({ error: 'Class not found' });
    }

    // Check if all students exist in the database
    const studentIds = students.map(student => student.studentId);
    const foundStudents = await Student.find({ _id: { $in: studentIds } });
    
    if (foundStudents.length !== students.length) {
      return res.status(400).json({ error: 'One or more students not found' });
    }

    // Map students into attendance records
    const attendanceRecords = students.map((student) => ({
      studentId: student.studentId,
      classId: classExists._id,  // Ensure the correct class _id is saved
      isPresent: student.isPresent,
    }));

    // Insert attendance records into the database
    await Attendance.insertMany(attendanceRecords);
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ error: 'Error marking attendance' });
  }
};


// Get attendance by class
export const getAttendanceByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    // Check if the class exists
    const classExists = await Class.findById(classId);
    if (!classExists) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Fetch attendance records for the specified class and populate student names
    const attendanceRecords = await Attendance.find({ classId }).populate('studentId', 'name'); // Assuming 'name' exists in the Student model

    if (attendanceRecords.length === 0) {
      return res.status(404).json({ message: 'No attendance records found for this class' });
    }

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error retrieving attendance:', error);
    res.status(500).json({ error: 'Error retrieving attendance' });
  }
};
