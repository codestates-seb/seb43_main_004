import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
        </Routes>
      </div>
    </>
  )
}

export default App
