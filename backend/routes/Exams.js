import express from 'express';
import { createExam, getExams } from '../controller/ExamController.js';

const ExamRouter = express.Router();

ExamRouter.post('/create-exam' , createExam);
ExamRouter.get('/get-exam' , getExams);


export default ExamRouter;