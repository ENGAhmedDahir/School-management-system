import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  examId: { type: String, required: true, unique: true }, 
  examName: { type: String, required: true }, 
  subjects: [{ type: String, required: true }], 
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
  examDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  totalMarks: { type: Number, required: true }
});

const Exam = mongoose.model('Exam', examSchema);
export default Exam;
