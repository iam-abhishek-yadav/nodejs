const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const TODOS_FILE = 'todos.json';

async function readTodosFromFile() {
  try {
    const data = await fs.readFile(TODOS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error('Unable to read todos data');
  }
}

async function writeTodosToFile(todos) {
  try {
    await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
  } catch (err) {
    throw new Error('Unable to write todos data');
  }
}

app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    res.json(todos);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const newTodo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      isEditing: false,
    };
    todos.push(newTodo);
    await writeTodosToFile(todos);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
      todos[index] = {
        id: todos[index].id,
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
      };
      await writeTodosToFile(todos);
      res.json(todos[index]);
    } else {
      res.status(404).send({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const updatedTodos = todos.filter(t => t.id !== parseInt(req.params.id));
    if (todos.length !== updatedTodos.length) {
      await writeTodosToFile(updatedTodos);
      res.status(204).end();
    } else {
      res.status(404).send({ error: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.delete('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const activeTodos = todos.filter(t => !t.completed);
    if (activeTodos.length < todos.length) {
      await writeTodosToFile(activeTodos);
      res.status(204).end();
    } else {
      res.status(404).send({ error: 'No completed todos found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
