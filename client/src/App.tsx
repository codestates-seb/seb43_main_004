import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import DiaryCheck from './components/diary/DiaryCheck'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import UserSignIn from './pages/UserSignIn'
import UserSignUp from './pages/UserSignUp'
import UserFindPwd from './pages/UserFindPwd'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Wrapper">
        <Routes>
          <Route path="/diaries" element={<DiaryCheck />} />
          <Route path="/sign-in" element={<UserSignIn />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/find-pwd" element={<UserFindPwd />} />
          <Route path="/*" element={<NotFound error="404" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
