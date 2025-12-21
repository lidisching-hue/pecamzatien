import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Banner superior del footer - Club del Ahorro */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <span className="text-4xl">🐷</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              ¡Únete a nuestro Club de Ahorro!
            </h3>
            <p className="text-gray-800 max-w-xl">
              Disfruta de ofertas exclusivas y beneficios especiales
            </p>
            <a
              href="https://clubahorro.e/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Conocer más
            </a>
          </div>
        </div>
      </div>

      {/* Contenido principal del footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo y slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-bold px-3 py-2 rounded text-xl">
                🛒 P
              </div>
              <span className="text-2xl font-bold text-white">PECAMZA</span>
            </div>
            <p className="text-gray-400 text-sm italic">
              "Donde comprar, es ahorrar"
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                📘
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">Nosotros</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/quienes-somos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link
                  to="/tiendas"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Tiendas
                </Link>
              </li>
            </ul>
          </div>

          {/* Atención al cliente */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">
              Atención al cliente
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/legales"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Legales
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Revisa tu boleta/factura
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Canal de denuncias
                </a>
              </li>
              <li>
                <Link
                  to="/comunicados"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Comunicados
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="#"
                  className="inline-block hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://via.placeholder.com/120x40/ef4444/ffffff?text=Libro+Reclamos"
                    alt="Libro de Reclamaciones"
                    className="h-10 rounded"
                  />
                </a>
              </li>
            </ul>
          </div>

          {/* Canal Institucional */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-white">
              Canal Institucional
            </h4>
            <p className="text-gray-400 text-sm mb-3">
              (SOLO VENTAS INSTITUCIONALES)
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=+51972157530"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-colors"
                >
                  <span className="text-xl">📱</span>
                  <span>+51 972 157 530</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ventas@pecamza.pe"
                  className="text-gray-400 hover:text-white transition-colors break-all"
                >
                  ventas@pecamza.pe
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior - Copyright */}
      <div className="bg-gray-950 py-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏢</span>
              <span>Oficina central</span>
            </div>
            <div className="text-center md:text-right">
              <p>
                Copyright {new Date().getFullYear()} - PECAMZA. Todos los
                derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=+51972157530&text=Hola,%20necesito%20información"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp"
      >
        <span className="text-3xl">💬</span>
      </a>
    </footer>
  )
}

export default Footer