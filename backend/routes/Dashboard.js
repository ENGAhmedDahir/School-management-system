import express from 'express';
import { getInfo } from '../controller/DashboardStatus.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard/stats' , getInfo);

export default dashboardRouter;