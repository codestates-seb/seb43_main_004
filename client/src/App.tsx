import React from 'react'
import './App.css'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/Theme'
import Footer from './components/Common/Footer'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <div className="App">
          <h1> hello world </h1>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
