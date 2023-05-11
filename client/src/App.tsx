import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import DiaryCheck from './components/diary/DiaryCheck'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Wrapper">
        <Routes>
          <Route path="/diaries" element={<DiaryCheck />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
