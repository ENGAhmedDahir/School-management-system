import dotenv from 'dotenv';
dotenv.config();
export const port =process.env.PORT;
export const dbURL = process.env.MONGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;