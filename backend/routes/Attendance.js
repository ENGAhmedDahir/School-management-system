import express from 'express';
import { getAttendanceByClass, markAttendance } from '../controller/AttendanceController.js';

const AttendanceRouter = express.Router();

// Route to mark attendance
AttendanceRouter.post('/class/:classId', markAttendance);

// Route to get attendance by class
AttendanceRouter.get('/class/:classId', getAttendanceByClass);

export default AttendanceRouter;
