const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const todos = JSON.parse(data);
      const todo = todos.find(t => t.id === parseInt(req.params.id));
      if (todo !== undefined) {
        res.json(todo);
      } else {
        res.status(404).send('Not Found');
      }
    }
  });
});

app.post('/todos', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const todos = JSON.parse(data);
      const todo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
        isEditing: false,
      };
      todos.push(todo);
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.json(todo);
        }
      });
    }
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const todos = JSON.parse(data);
      const index = todos.findIndex(t => t.id === parseInt(req.params.id));
      if (index !== -1) {
        todos[index] = {
          id: todos[index].id,
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        };
        fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
          if (err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.json(todos[index]);
          }
        });
      } else {
        res.status(404).send('Not Found');
      }
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const todos = JSON.parse(data);
      const todosCopy = todos.filter(t => t.id !== parseInt(req.params.id));
      if (todos.length > todosCopy.length) {
        fs.writeFile('todos.json', JSON.stringify(todosCopy), (err) => {
          if (err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.json(todosCopy);
          }
        });
      } else {
        res.status(404).send('Not Found');
      }
    }
  });
});

app.delete('/todos', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const todos = JSON.parse(data);
      const todosCopy = todos.filter(t => t.completed !== true);
      if (todos.length > todosCopy.length) {
        fs.writeFile('todos.json', JSON.stringify(todosCopy), (err) => {
          if (err) {
            res.status(500).send('Internal Server Error');
          } else {
            res.json(todosCopy);
          }
        });
      } else {
        res.status(404).send('Not Found');
      }
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
