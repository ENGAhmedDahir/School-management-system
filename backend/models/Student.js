import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator';

const studentSchema = new mongoose.Schema({
  Name: { 
    type: String, 
    required: true 
  },
  Id: {
    type: String,
    required: true,
    unique: true
  },
 
  password: {
    type: String,
    required: true,
    select: false ,
    unique: true // Ensure password is not included in queries by default
  },
  dateOfBirth: {
    type: Date, 
    required: true
  },
  placeOfBirth: { 
    type: String, 
    required: true
  },
  gender: { 
    type: String, 
    required: true
  },
  motherName: { 
    type: String, 
    required: true
  }, 
  classId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Class' 
  },
  phoneNumber: { 
    type: String,
    required: true,
    unique: true
  },
  emergencyPhone: { 
    type: String, 
    required: true,
    unique: true
  },
  address: { 
    type: String, 
    required: true
  }
});

// Pre-save hook to hash the password
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
studentSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const Student = mongoose.model('Student', studentSchema);
export default Student;
