const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 30 },
});

const Category = mongoose.model("Category", categoriesSchema);

module.exports = Category;
