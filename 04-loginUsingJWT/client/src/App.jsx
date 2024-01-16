import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" exact element = {<Login />} />
          <Route path="/register" exact element = {<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
