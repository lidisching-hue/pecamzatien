import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Producto } from '../types/Producto'
import ProductCard from '../components/ProductCard'
import { obtenerProductos } from '../services/productos.service'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Productos() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

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

  // --- IMÁGENES BANNERS PRINCIPALES ---
  const bannerImages = [
    'https://scontent.ftru5-1.fna.fbcdn.net/v/t39.30808-6/596745914_122104858509149898_5543645734679460645_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFSyPuYU_EsQrc6P8QUrIweyCEayZcXpLvIIRrJlxekuxUn3OZN58D6Niz-XnprEZDHh8JOcyMhqNlhylcFAIAb&_nc_ohc=7ZlR3IT5OxwQ7kNvwE04CQL&_nc_oc=AdmtlJVlTnDt1cyYKGxeH4RMHr6xMYVnxuII5gJ850Lvm1xKVIzcu9BXXGYI6oObMfs&_nc_zt=23&_nc_ht=scontent.ftru5-1.fna&_nc_gid=egASXkgyARyqpRxg9rGegw&oh=00_Afm74cR3r5aEu2HeBTddvN7OKg0968nIMTT3z616MJw8XQ&oe=694F91D4',
    'https://maxiahorro.com.pe/wp-content/uploads/2025/12/CONTRA_BannerWeb_Maxi.jpg'
  ]

  // Iconos SVG reutilizables para el Banner
  const IconoIzquierda = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  );

  const IconoDerecha = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* --- BANNER PRINCIPAL --- */}
      <section className="relative w-full">
        <div className="relative overflow-hidden w-full group">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {bannerImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-full flex-shrink-0 object-cover h-auto min-h-[200px] md:min-h-[400px]"
              />
            ))}
          </div>

          {/* Botones del Banner */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 0 ? 1 : 0))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <IconoIzquierda />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev === 1 ? 0 : 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all z-20 opacity-0 group-hover:opacity-100"
          >
            <IconoDerecha />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {bannerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all shadow-sm ${
                  currentSlide === idx ? 'bg-red-600 w-8' : 'bg-white w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PRODUCTOS MERKAT / PECAMZA --- */}
      <section className="bg-white py-12 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header de la sección (Limpio, solo botón Catálogo) */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-gray-100 pb-6">
            <div>
                <h2 className="text-3xl font-bold text-gray-800">
                Nuestros Productos
                </h2>
                <p className="text-gray-500 mt-2">Encuentra todo lo que necesitas al mejor precio</p>
            </div>
            
            <div className="flex gap-3">
               {/* Solo dejamos el botón del Catálogo como pediste */}
              <Link
                to="/catalogos"
                className="px-6 py-2.5 border-2 border-red-600 text-red-600 rounded-full font-semibold text-sm hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <span>Ver Catálogo Digital</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Grid de Productos (SIN .slice, muestra todos) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>

          {/* Mensaje de carga / vacío */}
          {productos.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl mt-4">
              <div className="text-4xl mb-3">🛒</div>
              <p className="text-gray-500 text-lg">Cargando productos...</p>
            </div>
          )}
        </div>
      </section>





{/* Banner de WhatsApp con QR, Texto y Botón a la derecha */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-white">
            
            {/* 1. LADO IZQUIERDO: Imagen QR */}
            <div className="bg-white p-2 rounded-xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 flex-shrink-0">
              <img 
                src="https://i.postimg.cc/SRdCH8jk/PCamza.png" 
                alt="QR Canal WhatsApp" 
                className="w-32 h-32 md:w-36 md:h-36 object-contain"
              />
            </div>

            {/* 2. CENTRO: Texto Informativo (ocupa el espacio disponible) */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-3xl font-bold mb-2">
                ¡Únete a nuestro Canal!
              </h3>
              <p className="text-green-100 text-lg leading-relaxed">
                Escanea el código QR con tu celular o usa el botón para unirte a nuestro canal. <br className="hidden md:block"/>
                Recibe ofertas exclusivas al instante.
              </p>
            </div>

            {/* 3. LADO DERECHO: Botón de acción */}
            <div className="flex-shrink-0">
              <a
                href="https://whatsapp.com/channel/0029Vb9q1tJJZg46Segt7c04"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                <span className="text-lg">Chatear ahora</span>
                {/* Flecha animada al hacer hover */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 transition-transform group-hover:translate-x-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>

          </div>
        </div>
      </section>






      <Footer />
    </div>
  )
}

export default Productos