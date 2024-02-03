const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
  isEnrolled: { type: Boolean, default: false },
  Phone: { type: String, required: true, minLength: 10, maxLength: 25 },
});

const Student = mongoose.model("Student", studentsSchema);

module.exports = Student;
