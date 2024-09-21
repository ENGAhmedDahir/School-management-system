import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
const teacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  Name: { type: String, required: true },
  password: {
    type: String,
    required: true,
    select: false,
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
  subjectSpecialization: { type: String, required: true },
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
  contactNumber: { type: String, required: true },
  address: {
    type: String, required: true 
    
  },
  salary: { type: String, required: true},
  hireDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

teacherSchema.pre("save", async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
teacherSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const Teacher = mongoose.model('Teacher',teacherSchema)
export default  Teacher;