import express from 'express';
import {  getClass, registerClass } from '../controller/Class.js';

const claasRouter = express.Router();

claasRouter.post('/register-class', registerClass);
 claasRouter.get('/get-class', getClass);

export default claasRouter;