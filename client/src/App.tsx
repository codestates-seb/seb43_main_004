import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/Theme'
import Header from './components/Common/Header'
import DiaryWrite from './pages/DiaryWrite'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Header />
          <div className="wrapper">
            <Routes>
              <Route path="/diary-add" element={<DiaryWrite />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
