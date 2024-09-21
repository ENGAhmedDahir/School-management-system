import express from 'express';
import { getUser, loginUser, registerUser } from '../controller/UserController.js';
const userRouter = express.Router();
userRouter.post('/register-user', registerUser);
userRouter.post('/login-user', loginUser);
userRouter.get('/get-user', getUser);


export default userRouter;
