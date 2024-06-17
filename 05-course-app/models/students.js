const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minLength: [3, 'Name must be at least 3 characters'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
  },
  isEnrolled: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    minLength: [10, 'Phone number must be at least 10 characters'],
    maxLength: [25, 'Phone number cannot exceed 25 characters'],
  },
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
