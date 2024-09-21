import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,  // Fixed typo from 'lowerCase' to 'lowercase'
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email'
    }
  },
  username: {
    type: String,
    lowercase: true,  // Fixed typo from 'lowerCase' to 'lowercase'
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false, // Do not include password in query results by default
    validate: {
      validator: (value) => validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }),
      message: 'Password must meet the strength criteria.'
    }
  },
  // role: {
  //   type: String,
  //   enum: ['admin','student', 'teacher'], // Define allowed roles
  //   required: true
  // }
}, {
  timestamps: true
});

// Pre-save hook to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
