const express = require('express');
const fs = require('fs').promises;
const { z } = require('zod');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const todoSchema = z.object({
  title: z.string(),
  description: z.string(),
  completed: z.boolean().optional(),
});

const TODOS_FILE = 'todos.json';

const readTodosFromFile = async () => {
  try {
    const data = await fs.readFile(TODOS_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(TODOS_FILE, '[]', 'utf8');
      return [];
    }
    throw new Error('Internal Server Error');
  }
};

const writeTodosToFile = async (todos) => {
  try {
    await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};

app.get('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    res.json(todos);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const newTodo = todoSchema.parse(req.body);
    const todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed || false,
      isEditing: false,
    };
    todos.push(todo);
    await writeTodosToFile(todos);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const updatedTodo = todoSchema.parse(req.body);
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
      todos[index] = {
        id: todos[index].id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        completed: updatedTodo.completed !== undefined ? updatedTodo.completed : todos[index].completed,
      };
      await writeTodosToFile(todos);
      res.json(todos[index]);
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(400).send('Bad Request');
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const todosCopy = todos.filter(t => t.id !== parseInt(req.params.id));
    if (todos.length !== todosCopy.length) {
      await writeTodosToFile(todosCopy);
      res.status(204).end();
    } else {
      res.status(404).send('Todo not found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/todos', async (req, res) => {
  try {
    const todos = await readTodosFromFile();
    const todosCopy = todos.filter(t => !t.completed);
    if (todos.length !== todosCopy.length) {
      await writeTodosToFile(todosCopy);
      res.status(204).end();
    } else {
      res.status(404).send('No completed todos found');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
