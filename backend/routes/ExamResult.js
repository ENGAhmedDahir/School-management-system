import express from 'express';
import { createExamResult,    getAllStudentsResults,    getStudentResults } from '../controller/ExamResultController.js';

const ExamResultRouter = express.Router();

ExamResultRouter.post('/add-result', createExamResult);
ExamResultRouter.get('/get-all-students-results', getAllStudentsResults);
ExamResultRouter.get('/student/:studentId', getStudentResults); 


export default ExamResultRouter;