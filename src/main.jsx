import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'

import { AuthProvider } from './Context/AuthContext.jsx'
import { UserProvider } from './Context/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <AuthProvider>
          <App />
      </AuthProvider>

    </BrowserRouter>

  </StrictMode>
)
