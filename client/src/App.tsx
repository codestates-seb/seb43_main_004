import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import DiaryCheck from './components/diary/DiaryCheck'
import Header from './components/Common/Header'

function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/diaries" element={<DiaryCheck />} />
        </Routes>
      </div>
    </>
  )
}

export default App
