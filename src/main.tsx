import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './slick/SlickApp'
import './slick/slick.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
