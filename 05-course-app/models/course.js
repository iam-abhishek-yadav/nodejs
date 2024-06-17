const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minLength: [5, 'Title must be at least 5 characters'],
    maxLength: [255, 'Title cannot exceed 255 characters'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, 'Category is required'],
  },
  creator: {
    type: String,
    required: [true, 'Creator is required'],
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
