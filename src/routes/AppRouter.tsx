import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

/**
 * NOTA PARA DESARROLLO EN VS CODE:
 * El entorno de previsualización lanza errores al no encontrar los archivos en '../pages/'.
 * En tu entorno local, estas importaciones funcionarán correctamente.
 */

import Home from '../pages/Home'
import Carrito from '../pages/Carrito'
import Checkout from '../pages/Checkout'

/**
 * AppContent: Esta es la pieza clave.
 * Usamos una estructura donde la ruta base "/" siempre renderiza Home.
 * El Carrito y el Checkout se muestran como capas (Overlays) sobre el contenido actual.
 */
function AppContent() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-transparent">
      {/* CAPA DE FONDO: 
          Mantenemos la Home siempre visible en la ruta raíz.
          Al usar una estructura de coincidencia parcial o dejarla fuera 
          del switch principal de rutas complejas, evitamos el fondo blanco.
      */}
      <main className="relative z-0">
        <Routes>
          {/* Usamos path="/*" para que Home se mantenga montado incluso 
            cuando la URL cambie a /carrito o /checkout, 
            permitiendo que los overlays se dibujen encima.
          */}
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Home />} />
          <Route path="/checkout" element={<Home />} />
          
          {/* Otras páginas que sí requieran pantalla completa */}
          <Route path="/perfil" element={<div className="bg-white h-screen">Página de Perfil</div>} />
        </Routes>
      </main>

      {/* CAPA SUPERIOR (MODALES/OVERLAYS):
          Renderizado condicional basado en la URL actual.
          Importante: Tus componentes Carrito y Checkout deben tener 
          la clase CSS "fixed inset-0" y un z-index alto (ej. z-50).
      */}
      {location.pathname === '/carrito' && (
        <aside className="fixed inset-0 z-[9999]">
          <Carrito />
        </aside>
      )}
      
      {location.pathname === '/checkout' && (
        <aside className="fixed inset-0 z-[9999]">
          <Checkout />
        </aside>
      )}
    </div>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default AppRouter