import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
  classId: { type: String, required: true, unique: true },
  className: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], 
  subject: [
    {
      name: { type: String, required: true },
      teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true }
    }
  ]
});

const Class =mongoose.model('Class', classSchema);
export default Class;