import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 1. Importamos HelmetProvider
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from './context/CartContext'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Envolvemos todo aquí para activar el SEO en toda la app */}
    <HelmetProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HelmetProvider>
  </StrictMode>
)