import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserFindPwd from './pages/UserFindPwd'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import NotFound from './pages/NotFound'

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/sign-in" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/find-pwd" element={<UserFindPwd />} />
          <Route path="/*" element={<NotFound error="404" />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
