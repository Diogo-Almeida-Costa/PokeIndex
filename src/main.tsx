import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './style/artigos.css'
import { PaginaArtigos } from './pages/PaginaArtigos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PaginaArtigos/>
  </StrictMode>,
)
