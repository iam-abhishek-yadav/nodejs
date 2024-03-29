import React from 'react'
import { useState } from 'react'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const registerUser = async (event) => {
		event.preventDefault();

		try {
			const resp = await fetch('http://localhost:3000/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password
				})
			});

			const data = await resp.json();

			if (data.success) {
				alert('Register successful');
			} else {
				alert('Please check your username and password');
			}
		} catch (error) {
			console.error('Error during registration:', error.message);
			alert('Registration failed. Please try again.');
		}
	};
	
  return (
    <div>
      <h1>Register</h1>
			<form onSubmit={registerUser}>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<br />
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Register" />
			</form>
    </div>
  )
}

export default Register
