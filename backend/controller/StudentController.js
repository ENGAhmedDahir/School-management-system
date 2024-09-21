import Student from '../models/Student.js';
import Class from '../models/Class.js';

// Register Student
export const registerStudent = async (req, res) => {
  try {
    const { Name, Id,  password, dateOfBirth, placeOfBirth, gender, motherName, classId, phoneNumber, emergencyPhone, address } = req.body;

    // Check if a student with the same ID, email, or phone numbers already exists
    const isStudentExist = await Student.findOne({ $or: [{ Id },  { phoneNumber }, { emergencyPhone }] });
    if (isStudentExist) {
      return res.status(400).send({ msg: "Student with this ID, email, or phone number already exists" });
    }

    // Check if the class exists
    const classExist = await Class.findById(classId);
    if (!classExist) {
      return res.status(404).json({ msg: "Class not found" });
    }

    // Create new student document
    const studentInfo = new Student({
      Name,
      Id,
      password, // Password will be hashed in the model
      dateOfBirth: new Date(dateOfBirth),
      placeOfBirth,
      gender,
      motherName,
      classId,
      phoneNumber,
      emergencyPhone,
      address
    });

    // Save the student info to the database
    const savedStudent = await studentInfo.save();

    // Add the new student's ID to the class's students array
    await Class.findByIdAndUpdate(classId, { $push: { students: savedStudent._id } });

    return res.status(201).json(savedStudent);
  } catch (err) {
    console.error("Error registering student:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// Get students with optional classId filtering
export const getStudents = async (req, res) => {
  const { classId } = req.query;  // Get classId from query parameters if provided

  try {
    const query = classId ? { classId } : {};  // Filter by classId if available
    const students = await Student.find(query)
      .select("Name Id dateOfBirth placeOfBirth gender motherName classId phoneNumber emergencyPhone address"); // Correct selection format
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};


// Edit student
export const editStudent = async (req, res) => {
  try {
    const { Name,  password, dateOfBirth, placeOfBirth, gender, motherName, classId, phoneNumber, emergencyPhone, address } = req.body;
    const { id } = req.params;
    const student = await Student.findOneAndUpdate(
      { Id: id },
      { Name, email, password, dateOfBirth, placeOfBirth, gender, motherName, classId, phoneNumber, emergencyPhone, address },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).send({ msg: "Student not found" });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error editing student:", err.message);
    res.status(400).send({ msg: "Something went wrong: " + err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOneAndDelete({ Id: id });

    if (!student) {
      return res.status(404).send({ msg: "Student not found" });
    }

    res.status(200).send({ msg: "Student deleted successfully" });
  } catch (err) {
    console.error("Error deleting student:", err.message);
    res.status(500).send({ msg: "Server Error" });
  }
};

// Student login
export const loginStudent = async (req, res) => {
  try {
    const { Id, password } = req.body;

    // Find the student by email and include the password in the query
    const student = await Student.findOne({ Id}).select("+password");

    // Check if the student exists
    if (!student) {
      return res.status(400).send("Invalid ID");
    }

    // Compare the input password with the stored hashed password
    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // If login is successful, send a success response with student details (except the password)
    res.status(200).json({
      message: "Login successful",
      student: {
        Id: student.Id,
        Name: student.Name,
        email: student.email,
        classId: student.classId,
        // Add any other fields you want to return
      }
    });
  } catch (e) {
    console.error("Error at login:", e.message);
    res.status(500).send("Server error");
  }
};
export const getStudentSpecific = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findOne({ Id: id }); // Match based on 'Id' field
    console.log(student)
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    console.error("Error fetching student:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
