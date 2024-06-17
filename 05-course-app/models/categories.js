const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    minLength: [3, 'Category name must be at least 3 characters'],
    maxLength: [30, 'Category name must be at most 30 characters'],
    trim: true
  },
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
