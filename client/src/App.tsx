import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/Theme'
import Header from './components/Common/Header'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <div className="App">
          <Header />
          <Routes></Routes>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
