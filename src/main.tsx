import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from './hooks/theme'

import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
