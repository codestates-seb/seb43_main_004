import React from 'react'
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
          <h1> hello world </h1>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
