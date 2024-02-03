const express = require('express')
const categories = require('./Routes/categories')
const students = require('./Routes/students')
const courses = require('./Routes/courses')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('Connection is successful'))
  .catch(err => console.error("Couldn't connect to mongodb", err));


app.use(express.json())
app.use('/api/categories', categories)
app.use('/api/students', students)
app.use('/api/courses', courses)

app.listen(3000, () => console.log(`Server is listening on port 3000`))