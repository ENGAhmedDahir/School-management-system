import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    index: true  // Helps with querying attendance by student
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
    index: true  // Helps with querying attendance by class
  },
  isPresent: {
    type: Boolean,
    required: true
  }
}, { timestamps: true });

// Ensure that a student cannot have more than one attendance record for the same class on the same day
attendanceSchema.index({ studentId: 1, classId: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
