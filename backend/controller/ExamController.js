import Exam from '../models/Exams.js';

// Create an Exam
export const createExam = async (req, res) => {
  try {
    const { examId, examName, subjects, classId, examDate, duration, totalMarks } = req.body;

    const exam = new Exam({
      examId,
      examName,
      subjects,
      classId,
      examDate,
      duration,
      totalMarks
    });

    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ error: 'Error creating exam' });
  }
};

// Fetch all Exams
export const getExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('classId');
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching exams' });
  }
};
