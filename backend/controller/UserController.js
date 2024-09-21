// controllers/userController.js
import { JWT_SECRET } from "../config/config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";  // Import jwt for token generation

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const isUserExist = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: email.toLowerCase() }
            ]
        });

        if (isUserExist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user document
        const userInfo = new User({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
      
        });

        // Save the user to the database
        await userInfo.save();

        res.status(201).json(userInfo);
    } catch (err) {
        console.error("Error at register:", err.message);
        res.status(500).json({ msg: "Something went wrong: " + err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

        if (!user) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Generate JWT token with expiration (7 days)
        const expiresIn = '7d'; // 7 days in a readable format
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn });

        // Set token as an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,  // Helps prevent XSS attacks
            secure: false,   // Set this to true in production when using HTTPS
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
        });

        // Hide the password before sending the user data
        user.password = undefined;

        // Send user details along with the expiration time
        res.status(200).send({ ...user.toJSON(), expiresIn });
    } catch (err) {
        console.error("Error at login:", err.message);
        res.status(500).json({ msg: "Server error: " + err.message });
    }
};


export const getUser = async (req, res) => {
    try {
        const users = await User.find();
    res.json(users);}
    catch (err) {
        console.error("Error at get user", err.message);
        res.status(500).send("Server Error");
    }

}