const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs').promises;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

mongoose.connect('mongo_url');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.log(err);
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log');
});

app.use(cors());
app.use(express.json());

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false },
  isEditing: { type: Boolean, default: false },
});

const TodoModel = mongoose.model('Todo', todoSchema);

const readTodosFromDatabase = async () => {
  try {
    return await TodoModel.find({});
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

const writeTodoToDatabase = async (todoData) => {
  try {
    const todo = new TodoModel(todoData);
    await todo.save();
    return todo;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromDatabase();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/todos', async (req, res) => {
    try {
      const newTodo = req.body;
  
      const todo = new TodoModel({
        title: newTodo.title,
        description: newTodo.description,
        completed: newTodo.completed || false,
        isEditing: newTodo.isEditing || false,
      });
  
      await todo.save();
      res.json(todo);
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
    const todoId = req.params.id;

    if (!mongoose.isValidObjectId(todoId)) {
    // If the provided id is not a valid ObjectId
    res.status(400).send('Invalid ID');
    return;
    }

    const todo = await TodoModel.findById(todoId);
    if (todo) {
    res.json(todo);
    } else {
    res.status(404).send('Not Found');
    }
} catch (error) {
    res.status(500).send(error.message);
}
});

app.put('/todos/:id', async (req, res) => {
  try {
    const updatedTodo = req.body;
    const todo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      {
        title: updatedTodo.title,
        description: updatedTodo.description,
        completed: updatedTodo.completed,
      },
      { new: true }
    );

    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
  }
});
