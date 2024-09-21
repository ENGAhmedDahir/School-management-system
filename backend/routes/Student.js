import express from 'express';
import { deleteStudent, editStudent, getStudents, getStudentSpecific, loginStudent, registerStudent } from '../controller/StudentController.js';

const studentRouter = express.Router();
studentRouter.post('/register-student', registerStudent);
studentRouter.get('/get-students', getStudents);
studentRouter.get('/specefic/:id', getStudentSpecific);
studentRouter.put('/edit/:id', editStudent);
studentRouter.delete('/delete/:id', deleteStudent);
studentRouter.post('/login-student', loginStudent);

export default studentRouter;