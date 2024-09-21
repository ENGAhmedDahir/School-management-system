import ExamResult from '../models/ExamResult.js';
import Student from '../models/Student.js';
import Exam from '../models/Exams.js';


export const createExamResult = async (req, res) => {
  try {
    const { examId, studentId, subjects, totalMarks, grade, remarks } = req.body;

    const exam = await Exam.findById(examId);
    const student = await Student.findById(studentId);

    if (!exam || !student) {
      return res.status(404).json({ message: 'The Exam Result doesnot exist' });
    }

    const newExamResult = new ExamResult({
      examId,
      studentId,
      subjects,
      totalMarks,
      grade,
      remarks
    });

    await newExamResult.save();
    res.status(201).json(newExamResult);
  } catch (error) {
    res.status(500).json({ message: 'some thing error happened' });
  }
};
export const getAllStudentsResults = async (req, res) => {
  try {
  
    const results = await ExamResult.find()
      .populate('studentId', 'Name Id') 
      .populate('examId', 'examName');  
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'some thing error happened' });
  }
}


export const getStudentResults = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    
    
    const results = await ExamResult.find({ studentId })
      .populate('examId', 'examName') 
      .populate('studentId', 'Name Id'); 
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'some thing error happened' });
  }
};
