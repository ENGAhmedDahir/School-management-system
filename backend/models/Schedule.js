import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
    required: true
  },
  timetable: [
    {
      day: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      },
      subject: {
        type: String,
        required: true
      },
      teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
      }
    }
  ]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;