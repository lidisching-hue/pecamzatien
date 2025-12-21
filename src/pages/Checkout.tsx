import { useState, useEffect } from 'react'

/**
 * NOTA: Para la previsualización en el Canvas he comentado los imports reales.
 * Descoméntalas en tu proyecto local.
 */

import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { crearPedido, enviarPedidoWhatsApp } from '../services/pedidos'
import { supabase } from '../lib/supabase'



const WHATSAPP_TIENDA = '51930419337'

function App() {
  const { items, clearCart } = useCart()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [pedidoId, setPedidoId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔒 Protección: si items está vacío, cerramos el panel
  useEffect(() => {
    if (items.length === 0) {
      // En lugar de navegar, podrías simplemente cerrar el componente
      // navigate('/carrito')
    }
  }, [items])

  const total = items.reduce((acc, item) => {
    const precio =
      item.ofertaactiva && item.preciooferta
        ? item.preciooferta
        : item.precio

    return acc + precio * item.cantidad
  }, 0)

  const generarMensajeWhatsApp = () => {
    let mensaje = `🛒 *Nuevo pedido*\n\n`
    mensaje += `👤 Cliente: ${nombre}\n`
    mensaje += `📞 Teléfono: ${telefono}\n`
    if (direccion) mensaje += `📍 Dirección: ${direccion}\n`
    mensaje += `\n📦 *Productos:*\n`
    items.forEach(item => {
      const precio = item.ofertaactiva && item.preciooferta ? item.preciooferta : item.precio
      mensaje += `- ${item.nombre} x${item.cantidad} → S/ ${(precio * item.cantidad).toFixed(2)}\n`
    })
    mensaje += `\n💰 *Total: S/ ${total.toFixed(2)}*`
    return mensaje
  }

  const handleCrearPedido = async () => {
    if (!nombre || !telefono) {
      alert('Completa tus datos')
      return
    }
    setLoading(true)
    try {
      const { data } = await supabase.auth.getUser()
      const id = await crearPedido(data?.user?.id || null, items, { nombre, telefono, direccion })
      setPedidoId(id)
      alert('Pedido creado correctamente')
    } catch (error) {
      console.error(error)
      alert('Error al crear pedido')
    } finally {
      setLoading(false)
    }
  }

  const handleEnviarWhatsApp = async () => {
    if (!pedidoId) return
    try {
      await enviarPedidoWhatsApp(pedidoId, WHATSAPP_TIENDA, generarMensajeWhatsApp())
      clearCart()
      alert('Pedido enviado por WhatsApp')
      navigate('/') 
    } catch (error) {
      console.error(error)
      alert('Error al enviar WhatsApp')
    }
  }

  return (
    /* IMPORTANTE: Para que no se vea blanco, este componente debe estar 
       dentro de tu Layout principal o invocado encima de tus rutas.
    */
    <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none">
      
      {/* Overlay: Solo oscurece el fondo. pointer-events-auto permite hacer click para cerrar */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity pointer-events-auto"
        onClick={() => !loading && navigate(-1)}
      ></div>

      {/* Panel Lateral: pointer-events-auto para que los inputs funcionen */}
      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300 pointer-events-auto">
        
        {/* Cabecera */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">Finalizar pedido</h1>
            <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Información de entrega</p>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-black transition-all bg-gray-50 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Datos de contacto</h2>
            <div className="space-y-4">
              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Nombre Completo</label>
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Juan Pérez"
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Celular</label>
                <input
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="987 654 321"
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Dirección de entrega</label>
                <textarea
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
                  placeholder="Av. Las Magnolias 123..."
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Resumen de compra */}
          <div className="bg-gray-50/50 p-5 rounded-3xl border border-gray-100">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Tu pedido</h3>
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded text-[10px] font-bold">{item.cantidad}</span>
                    <span className="text-gray-600 font-medium truncate max-w-[150px]">{item.nombre}</span>
                  </div>
                  <span className="font-bold text-gray-900">S/ {( (item.ofertaactiva && item.preciooferta ? item.preciooferta : item.precio) * item.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total</span>
            <span className="text-3xl font-black text-gray-900">
              S/ {total.toFixed(2)}
            </span>
          </div>

          <div className="space-y-3">
            {!pedidoId ? (
              <button
                onClick={handleCrearPedido}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm shadow-2xl hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Procesando...' : 'Confirmar Pedido'}
              </button>
            ) : (
              <button
                onClick={handleEnviarWhatsApp}
                className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                📲 Enviar WhatsApp
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App