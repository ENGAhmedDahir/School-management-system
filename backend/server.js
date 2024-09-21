import express from 'express';
import connectDB from './config/db.js';
import { registerUser } from './controller/UserController.js';
import userRouter from './routes/User.js';
import studentRouter from './routes/Student.js';
import TeacherRouter from './routes/Teacher.js';
import classRouter  from './routes/Class.js';
import AttendanceRouter from './routes/Attendance.js';
import dashboardRouter from './routes/Dashboard.js';
import schuleRouter from './routes/Schedule.js';
import emailRouter from './routes/Contact.js';
import ExamRouter from './routes/Exams.js';
import ExamResultRouter from './routes/ExamResult.js';

const app = express();
const PORT = 900;

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/student', studentRouter);
app.use('/api/teacher', TeacherRouter);
app.use('/api/class', classRouter);
app.use('api/attendance', AttendanceRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/schedule', schuleRouter);
app.use('/api/email', emailRouter);
app.use('/api/exam',ExamRouter)
app.use('/api/exam-result', ExamResultRouter); 

connectDB()
app.listen(PORT,()=>{
console.log(`listening on ${PORT}`);
});