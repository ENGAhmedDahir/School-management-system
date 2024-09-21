import mongoose from "mongoose";

import { dbURL } from "./config.js";
const connectDB = async () =>{
    try{
        await mongoose.connect(dbURL, );
        console.log("Connected to MongoDB");
    } 
    catch(e){
        console.error("Error connecting to MongoDB:", e.message);
        process.exit(1);
    }
}
export default connectDB