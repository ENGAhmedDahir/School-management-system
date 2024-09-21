import express from 'express';
import { deleteTeacher, editTeacher, getTeachers, loginTeacher, registerTeacher } from '../controller/TeacherController.js';

const TeacherRouter = express.Router();

TeacherRouter.post('/teacher-register', registerTeacher)
TeacherRouter.post('/login-teacher', loginTeacher)
TeacherRouter.get('/get-teacher', getTeachers)
TeacherRouter.put('/edit-teacher/:teacherId', editTeacher)
TeacherRouter.delete('/delete-teacher/:teacherId', deleteTeacher)



export default TeacherRouter;