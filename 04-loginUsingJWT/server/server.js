const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/jwt')

app.post('/api/register', async (req, res) => {
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ success: true })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
});

app.listen(3000, () => console.log("connected to server"));
