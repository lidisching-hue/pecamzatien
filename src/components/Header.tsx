import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../hooks/useCart'

function Header() {
  const { items } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0)

  return (
    <>
      {/* Barra superior con ubicación y redes sociales */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-lg">📍</span>
            <div>
              <span className="font-semibold text-gray-700">Ubicación</span>
              <div className="text-gray-600">Lima y Periferias | Piura</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-600 hidden sm:inline">Síguenos:</span>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-xl"
            >
              📘
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-700 text-xl"
            >
              📷
            </a>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-2xl text-gray-700 hover:text-red-600"
              aria-label="Menú"
            >
              ☰
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-bold px-3 py-2 rounded text-xl">
                🛒 P
              </div>
              <span className="text-2xl font-bold text-red-600 hidden sm:inline">
                PECAMZA
              </span>
            </Link>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/quienes-somos"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Quienes somos
              </Link>
              <Link
                to="/catalogos"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Catálogos de ofertas
              </Link>
              <Link
                to="/productos"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Productos Merkat
              </Link>
              <Link
                to="/tiendas"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Nuestras Tiendas
              </Link>
              <Link
                to="/contacto"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                Contáctanos
              </Link>
            </nav>

            {/* Iconos de búsqueda y carrito */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-red-600 text-xl transition-colors"
                aria-label="Buscar"
              >
                🔍
              </button>

              <Link to="/carrito" className="relative">
                <span className="text-gray-700 hover:text-red-600 text-2xl transition-colors">
                  🛒
                </span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Barra de búsqueda (se muestra al hacer clic) */}
          {isSearchOpen && (
            <div className="mt-3 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-600"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600">
                  🔍
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="bg-white w-80 h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xl font-bold text-red-600">Menú</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-gray-700 hover:text-red-600"
                aria-label="Cerrar menú"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col p-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/quienes-somos"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Quienes somos
              </Link>
              <Link
                to="/catalogos"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Catálogos de ofertas
              </Link>
              <Link
                to="/productos"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Productos Merkat
              </Link>
              <Link
                to="/tiendas"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Nuestras Tiendas
              </Link>
              <Link
                to="/contacto"
                onClick={() => setIsMenuOpen(false)}
                className="py-3 px-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
              >
                Contáctanos
              </Link>
            </nav>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <span className="text-red-600 text-lg">📍</span>
                <div>
                  <div className="font-semibold">Ubicación:</div>
                  <div>Lima y Periferias</div>
                  <div>Piura</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header