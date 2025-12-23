import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { crearPedido, enviarPedidoWhatsApp } from '../services/pedidos'
import { supabase } from '../lib/supabase'

const WHATSAPP_TIENDA = '51994166419'

function Checkout() {
  const { items, clearCart } = useCart()
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [direccion, setDireccion] = useState('')
  const [loading, setLoading] = useState(false)

  // 🔒 Protección: si el carrito está vacío, no debería estar aquí
  useEffect(() => {
    if (items.length === 0) {
       // Opcional: si recargan la página y no hay items, volver al inicio
       // navigate('/')
    }
  }, [items])

  const total = items.reduce((acc, item) => {
    const precio =
      item.ofertaactiva && item.preciooferta
        ? item.preciooferta
        : item.precio

    return acc + precio * item.cantidad
  }, 0)

// --- FUNCIÓN BLINDADA CONTRA ERRORES DE EMOJIS ---
  const generarMensajeWhatsApp = () => {
    // Definimos los emojis con código seguro para que no se rompan
    const E_HOLA = '\uD83D\uDC4B'      // 👋
    const E_NOTA = '\uD83D\uDCCB'      // 📋
    const E_USER = '\uD83D\uDC64'      // 👤
    const E_CEL  = '\uD83D\uDCF1'      // 📱
    const E_CASA = '\uD83C\uDFE1'      // 🏡
    const E_CARR = '\uD83D\uDED2'      // 🛒
    const E_MON  = '\uD83D\uDCB0'      // 💰
    
    let mensaje = `${E_HOLA} Hola, deseo confirmar mi pedido:\n\n`
    
    mensaje += `${E_NOTA} *DATOS DE ENTREGA*\n`
    mensaje += `${E_USER} Cliente: ${nombre}\n`
    mensaje += `${E_CEL} Celular: ${telefono}\n`
    if (direccion) mensaje += `${E_CASA} Dirección: ${direccion}\n`
    
    mensaje += `\n${E_CARR} *MIS PRODUCTOS*\n`
    items.forEach(item => {
      const precio = item.ofertaactiva && item.preciooferta ? item.preciooferta : item.precio
      const subtotal = (precio * item.cantidad).toFixed(2)
      
      // Usamos guion simple que es el más compatible
      mensaje += `- (${item.cantidad}) ${item.nombre} : S/ ${subtotal}\n`
    })
    
    mensaje += `\n${E_MON} *TOTAL A PAGAR: S/ ${total.toFixed(2)}*`
    
    return mensaje
  }

  // --- FUNCIÓN ÚNICA: GUARDA Y ENVÍA ---
  const handleFinalizarCompra = async () => {
    // 1. Validaciones básicas
    if (!nombre || !telefono) {
      alert('Por favor completa tu nombre y teléfono para el envío.')
      return
    }
    
    setLoading(true)
    
    try {
      // 2. Obtener usuario actual (si está logueado, sino null)
      const { data } = await supabase.auth.getUser()
      
      // 3. Guardar pedido en Supabase
      const idPedido = await crearPedido(data?.user?.id || null, items, { 
        nombre, 
        telefono, 
        direccion 
      })
      
      // 4. Generar mensaje y abrir WhatsApp INMEDIATAMENTE
      const mensaje = generarMensajeWhatsApp()
      await enviarPedidoWhatsApp(idPedido, WHATSAPP_TIENDA, mensaje)

      // 5. Limpiar carrito y salir
      clearCart()
      navigate('/') 
      
    } catch (error) {
      console.error(error)
      alert('Hubo un error al procesar el pedido. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none">
      
      {/* Fondo oscuro (Overlay) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity pointer-events-auto"
        onClick={() => !loading && navigate(-1)}
      ></div>

      {/* Panel Lateral Blanco */}
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

        {/* Formulario con scroll */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <div className="space-y-4">
            <h2 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">Datos de contacto</h2>
            <div className="space-y-4">
              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Nombre Completo *</label>
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Celular *</label>
                <input
                  value={telefono}
                  onChange={e => setTelefono(e.target.value)}
                  placeholder="Ej: 987 654 321"
                  type="tel"
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="group">
                <label className="text-[11px] font-bold text-gray-400 ml-1 uppercase">Dirección de entrega</label>
                <textarea
                  value={direccion}
                  onChange={e => setDireccion(e.target.value)}
                  placeholder="Ej: Av. Las Magnolias 123, Referencia..."
                  className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-black transition-all text-gray-800 placeholder:text-gray-300 font-medium h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Resumen de compra visual */}
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

        {/* Footer con el BOTÓN VERDE ÚNICO */}
        <div className="p-8 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total a Pagar</span>
            <span className="text-3xl font-black text-gray-900">
              S/ {total.toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleFinalizarCompra}
            disabled={loading || items.length === 0}
            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-[#20bd5a] transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              'Procesando...'
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.512-.164-1.503-.665-2.531-1.583-.799-.706-1.341-1.583-1.502-1.855-.163-.272-.019-.413.116-.549.124-.125.275-.325.412-.488.136-.163.178-.275.267-.45.089-.175.046-.325-.022-.462-.069-.137-.597-1.438-.818-1.97-.213-.512-.429-.441-.592-.45-.152-.008-.326-.009-.5-.009-.175 0-.458.065-.697.325-.238.261-.913.892-.913 2.175s.934 2.519 1.064 2.694c.13.175 1.838 2.806 4.453 3.935 2.615 1.129 2.615.753 3.09.702.476-.051 1.034-.422 1.179-.83.145-.407.145-.756.102-.831-.043-.075-.161-.123-.335-.21z"/>
                </svg>
                Confirmar y enviar a WhatsApp
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout