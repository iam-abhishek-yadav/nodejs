const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

mongoose.connect('mongo_url');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

app.use(cors());
app.use(express.json());

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
});

const TodoModel = mongoose.model('Todo', todoSchema);

app.get('/todos', async (req, res) => {
  try {
    const todos = await TodoModel.find({});
    res.json(todos);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title, description, completed = false, isEditing = false } = req.body;
    const todo = new TodoModel({ title, description, completed, isEditing });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.message });
    } else {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
    const todo = await TodoModel.findById(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      res.status(400).send('Invalid ID');
      return;
    }
    const deletedTodo = await TodoModel.findByIdAndDelete(id);
    if (deletedTodo) {
      res.json(deletedTodo);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/todos', async (req, res) => {
  try {
    const result = await TodoModel.deleteMany({ completed: true });
    if (result.deletedCount > 0) {
      res.json({ message: 'Todos deleted successfully' });
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});
