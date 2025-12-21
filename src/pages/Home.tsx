import { useEffect, useState } from 'react'
import type { Producto } from '../types/Producto'
import ProductCard from '../components/ProductCard'
import { obtenerProductos } from '../services/productos.service'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Home() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [ofertas1Slide, setOfertas1Slide] = useState(0)
  const [ofertas2Slide, setOfertas2Slide] = useState(0)

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerProductos()
      setProductos(data)
    }
    cargar()
  }, [])

  // Carousel automático para banner principal
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 1 ? 0 : 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const bannerImages = [
    'https://via.placeholder.com/1200x400/ef4444/ffffff?text=OFERTAS+NAVIDEÑAS',
    'https://via.placeholder.com/1200x400/dc2626/ffffff?text=MEGA+DESCUENTOS'
  ]

  const ofertas1 = [
    'https://via.placeholder.com/300x300/fca5a5/000000?text=YAPA+1',
    'https://via.placeholder.com/300x300/fca5a5/000000?text=YAPA+2',
    'https://via.placeholder.com/300x300/fca5a5/000000?text=CARRETILLAZO+1',
    'https://via.placeholder.com/300x300/fca5a5/000000?text=CARRETILLAZO+2'
  ]

  const ofertas2 = [
    'https://via.placeholder.com/300x300/fef3c7/000000?text=INFALTABLE+1',
    'https://via.placeholder.com/300x300/fef3c7/000000?text=INFALTABLE+2',
    'https://via.placeholder.com/300x300/fef3c7/000000?text=INFALTABLE+3',
    'https://via.placeholder.com/300x300/fef3c7/000000?text=INFALTABLE+4'
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Banner principal con carousel */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Banner ${idx + 1}`}
                  className="w-full flex-shrink-0 object-cover h-64 md:h-96"
                />
              ))}
            </div>

            {/* Controles del carousel */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
            >
              ◀
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 1 ? 0 : 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg"
            >
              ▶
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {bannerImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-red-600 w-8' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección de ofertas increíbles 1 */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-red-600 mb-8">
            ¡Ofertas increíbles!
          </h2>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(-${ofertas1Slide * 25}%)`
                }}
              >
                {ofertas1.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-2">
                    <img
                      src={img}
                      alt={`Oferta ${idx + 1}`}
                      className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOfertas1Slide(Math.max(0, ofertas1Slide - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg z-10"
              disabled={ofertas1Slide === 0}
            >
              ◀
            </button>
            <button
              onClick={() => setOfertas1Slide(Math.min(ofertas1.length - 1, ofertas1Slide + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg z-10"
              disabled={ofertas1Slide >= ofertas1.length - 1}
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Sección de ofertas increíbles 2 */}
      <section className="bg-gradient-to-r from-yellow-50 to-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{
                  transform: `translateX(-${ofertas2Slide * 25}%)`
                }}
              >
                {ofertas2.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-2">
                    <img
                      src={img}
                      alt={`Oferta ${idx + 1}`}
                      className="w-full rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOfertas2Slide(Math.max(0, ofertas2Slide - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg z-10"
              disabled={ofertas2Slide === 0}
            >
              ◀
            </button>
            <button
              onClick={() => setOfertas2Slide(Math.min(ofertas2.length - 1, ofertas2Slide + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg z-10"
              disabled={ofertas2Slide >= ofertas2.length - 1}
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Ofertas Maxiahorro */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Ofertas PECAMZA
            </h2>
            <div className="flex gap-4">
              <a
                href="/ofertas"
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
              >
                Ver más ofertas →
              </a>
              <a
                href="/catalogos"
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
              >
                Ir al catálogo →
              </a>
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.slice(0, 8).map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>

          {productos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Cargando productos...</p>
            </div>
          )}
        </div>
      </section>

      {/* Banner de WhatsApp */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white">
            <div className="text-6xl">💬</div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Únete a nuestro canal de WhatsApp
              </h3>
              <p className="text-green-100">
                Recibe ofertas exclusivas y promociones especiales
              </p>
            </div>
            <a
              href="https://whatsapp.com/channel/00"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors shadow-lg"
            >
              Unirse ahora
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
