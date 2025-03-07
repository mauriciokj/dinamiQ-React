import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Remova o React.StrictMode para evitar dupla renderização em DEV
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  //  </React.StrictMode>
)
