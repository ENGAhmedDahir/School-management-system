import express from 'express';
import { addSchedule, getSchedule } from '../controller/ScheduleController.js';


const schuleRouter = express.Router();

schuleRouter.post('/addSchedule', addSchedule);
schuleRouter.post ('/getSchedule', getSchedule);
export default schuleRouter;