import mongoose from 'mongoose';

const examResultSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      points: { type: Number, required: true }
    }
  ],
  totalMarks: { type: Number, required: true },
  grade: { type: String },
  remarks: { type: String }
});

const ExamResult = mongoose.model('ExamResult', examResultSchema);

export default ExamResult;
