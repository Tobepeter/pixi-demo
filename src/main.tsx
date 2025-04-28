import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const strictMode = false

const scriptApp = (
  <StrictMode>
    <App />
  </StrictMode>
)

const content = strictMode ? scriptApp : <App />

createRoot(document.getElementById('root')!).render(content)
