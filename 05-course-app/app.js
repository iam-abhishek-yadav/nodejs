const express = require('express');
const mongoose = require('mongoose');
const categories = require('./Routes/categories');
const students = require('./Routes/students');
const courses = require('./Routes/courses');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connection to MongoDB was successful');
  } catch (error) {
    console.error("Couldn't connect to MongoDB", error);
    process.exit(1);
  }
};

connectDB();

app.use(express.json());

app.use('/api/categories', categories);
app.use('/api/students', students);
app.use('/api/courses', courses);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
