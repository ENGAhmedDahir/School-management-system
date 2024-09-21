import Schedule from '../models/Schedule.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

// Add a new schedule for a student
export const addSchedule = async (req, res) => {
  const { studentId, timetable, teacherId } = req.body;

  try {
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if teacher exists
    const teacher = await Teacher.find(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if schedule for the student already exists
    const existingSchedule = await Schedule.findOne({ studentId });
    if (existingSchedule) {
      return res.status(400).json({ message: 'Schedule already exists for this student' });
    }

    // Create a new schedule
    const newSchedule = new Schedule({
      studentId: student._id,
      timetable,
      teacherId: teacher._id
    });

    await newSchedule.save();
    res.status(201).json({ message: 'Schedule added successfully', schedule: newSchedule });
  } catch (error) {
    console.error('Error adding schedule:', error);
    res.status(500).json({ message: 'Failed to add schedule', error: error.message });
  }
};

// Get a student's schedule
export const getSchedule = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Find the schedule for the given student and populate student and teacher info
    const schedule = await Schedule.findOne({ studentId })
      .populate('studentId', 'Name Id')
      .populate('teacherId', 'name'); // Populate teacher name

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Failed to fetch schedule', error: error.message });
  }
};

// Update a student's schedule
export const updateSchedule = async (req, res) => {
  const { studentId } = req.params;
  const { timetable, teacherId } = req.body;

  try {
    // Check if the schedule exists
    const existingSchedule = await Schedule.findOne({ studentId });
    if (!existingSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Check if teacher exists if provided
    if (teacherId) {
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
    }

    // Update the schedule
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { studentId },
      { timetable, teacherId },
      { new: true, useFindAndModify: false }
    ).populate('teacherId', 'name'); // Populate updated teacher details

    res.status(200).json({ message: 'Schedule updated successfully', schedule: updatedSchedule });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: 'Failed to update schedule', error: error.message });
  }
};
