// Import necessary models
import Class from '../models/Class.js';
import Teacher from '../models/Teacher.js';
import Student from '../models/Student.js';

// Register a new class
export const registerClass = async (req, res) => {
  try {
    const { classId, className, teacherId, students = [], subjects = [] } = req.body;

    // Log the input for debugging
    console.log("Class ID:", classId);
    console.log("Class Name:", className);
    console.log("Teacher ID:", teacherId);
    console.log("Students:", students);
    console.log("Subjects:", subjects);

    // Check if the class with the same ID already exists
    const isClassExist = await Class.findOne({ classId });
    if (isClassExist) {
      return res.status(400).json({ msg: "Class with this ID already exists" });
    }

    // Check if the teacher exists
    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(400).send({ msg: "Teacher not found" });
    }

    // Validate that all student IDs are valid
    const validStudents = await Student.find({ _id: { $in: students } });
    if (validStudents.length !== students.length) {
      return res.status(400).send({ msg: "One or more student IDs are invalid" });
    }

    // Create new class document
  const newClass = new Class({
      classId,
      className,
      teacherId,
      students, // Array of student IDs
      subject: subjects.map(subject => ({
        name: subject.name,
        teacherId: subject.teacherId
      }))
    });

    // Save the class info to the database
    const savedClass = await newClass.save();

    // Optionally, update students to reference this class
    await Student.updateMany({ _id: { $in: students } }, { $push: { classes: savedClass._id } });

    return res.status(201).json(savedClass);
  } catch (err) {
    console.error("Error registering class:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// Example of a route to get class data and populate the teacher
export const getClass = async (req, res) => {
  try {
    const classes = await Class.find().populate('teacherId', 'name'); // Populate with teacher name
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes' });
  }
};


// Edit class information
export const editClass = async (req, res) => {
  try {
    const { className, teacherId, year, subjects } = req.body;
    const { id } = req.params;

    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(400).json({ msg: "Teacher not found" });
    }

    const updatedClass = await Class.findOneAndUpdate(
      { classId: id },
      {
        className,
        teacherId,
        year,
        subject: subjects.map(subject => ({
          name: subject.name,
          teacherId: subject.teacherId
        }))
      },
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      return res.status(404).send({ msg: "Class not found" });
    }

    res.status(200).json(updatedClass);
  } catch (err) {
    console.error("Error editing class:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// Delete a class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await Class.findOneAndDelete({ classId: id });

    if (!deletedClass) {
      return res.status(404).send({ msg: "Class not found" });
    }

    res.status(200).send({ msg: "Class deleted successfully" });
  } catch (err) {
    console.error("Error deleting class:", err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};
