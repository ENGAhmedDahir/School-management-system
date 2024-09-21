import express from 'express';
import { send } from '../controller/ContactController.js';

const emailRouter = express.Router();

emailRouter.post('/send', send );

export default emailRouter;