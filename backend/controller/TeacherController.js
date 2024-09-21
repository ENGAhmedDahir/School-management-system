import Teacher from '../models/Teacher.js';

// Register a new teacher
export const registerTeacher = async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { Name, teacherId, password, subjectSpecialization, email, contactNumber, hireDate, salary , address } = req.body;

    // Log the input for debugging
    console.log("Name: " + Name);
    console.log("Id: " + teacherId);
    console.log("Password: " + password);
    console.log("Subject Specialization: " + subjectSpecialization);
    console.log("Email: " + email);
    console.log("Contact Number: " + contactNumber);
    console.log("salary: " + salary);
    console.log("Hire Date: " + hireDate);
    console.log("Address: " + address);

    // Check if a teacher with the same ID already exists
    const isTeacherExist = await Teacher.findOne({teacherId});

    if (isTeacherExist) {
      return res.status(400).json({ msg: "Teacher with this ID already exists" });
    }

    // Create new teacher document
    const teacherInfo = new Teacher({
      teacherId,
      Name ,// Handle case where there's no last name
      password,
      subjectSpecialization,
      email,
      contactNumber,
      salary,
      hireDate,
      address
    });

    // Save the teacher info to the database
    await teacherInfo.save();
    return res.status(200).json(teacherInfo);
  } catch (err) {
    console.error("Error registering teacher:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// Get all teachers
export const getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    console.error("Error getting teachers:", err.message);
    res.status(500).send("Server Error");
  }
};

// // Edit teacher information
// Edit teacher information
// Edit teacher information
export const editTeacher = async (req, res) => {
  try {
    const { Name, subjectSpecialization, email, contactNumber, hireDate, address, salary, status } = req.body;
    const { teacherId } = req.params;

    // Find and update teacher by teacherId
    const teacher = await Teacher.findOneAndUpdate(
      { teacherId }, // Match the teacherId from the params
      { 
        Name,
        subjectSpecialization,
        email,
        contactNumber,
        hireDate,
        address,
        salary,
        status: status || "Active" // Set status to the value provided or default to "Active"
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // If teacher is not found
    if (!teacher) {
      return res.status(404).send({ msg: "Teacher not found" });
    }

    // Return updated teacher
    res.status(200).json(teacher);
  } catch (err) {
    console.error("Error editing teacher:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// // Delete a teacher
// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params; // Use teacherId instead of id
    const teacher = await Teacher.findOneAndDelete({ teacherId });

    if (!teacher) {
      return res.status(404).send({ msg: "Teacher not found" });
    }

    res.status(200).send({ msg: "Teacher deleted successfully" });
  } catch (err) {
    console.error("Error deleting teacher:", err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

// controllers/teacherController.js
export const loginTeacher = async (req, res) => {
  try {
    const { teacherId, password } = req.body;
    const teacher = await Teacher.findOne({ teacherId }).select("+password");

    if (!teacher) {
      return res.status(400).json({ msg: "Invalid Teacher ID" });
    }

    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    // Send teacher info with role back
    res.status(200).json({
      msg: "Login successful",
      teacher: {
        teacherId: teacher.teacherId,
        name: teacher.Name,
        role: "teacher" // Set the teacher's role
      }
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

