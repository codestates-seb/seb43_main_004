import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index'
import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import { CookiesProvider } from 'react-cookie'
import Theme from './styles/Theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={Theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
)
