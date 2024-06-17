const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'secret123';
const SALT_ROUNDS = 10;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/jwt', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ status: 'error', error: 'Duplicate email' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ name: user.name, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ status: 'ok', user: token });
    } else {
      res.status(401).json({ status: 'error', error: 'Invalid login' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
});
