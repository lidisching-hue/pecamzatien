import { supabase } from '../lib/supabase'

// Función para crear el pedido en Supabase
export const crearPedido = async (userId: string | null, items: any[], datosCliente: any) => {

  // 1. Calculamos el total
  const montoTotal = items.reduce((acc, item) => {
    const precio = item.ofertaactiva && item.preciooferta 
      ? item.preciooferta 
      : item.precio
    return acc + (precio * item.cantidad)
  }, 0)

  // 2. Insertamos usando los nombres EXACTOS de tu base de datos (todo minúsculas)
  const { data, error } = await supabase
    .from('pedidos')
    .insert([
      {
        user_id: userId,                      
        nombre_cliente: datosCliente.nombre,  // CORREGIDO: coincide con tu columna 'nombre_cliente'
        telefono: datosCliente.telefono,      // CORREGIDO: coincide con tu columna 'telefono'
        direccion: datosCliente.direccion,    // CORREGIDO: Aquí estaba el error, antes decía 'cliente_direccion'
        productos: items,                     
        total: montoTotal,                    
        estado: 'pendiente'                   
      }
    ])
    .select()
    .single()

  if (error) {
    console.error("Error detallado Supabase:", error.message)
    throw error
  }

  return data.id
}


    export const enviarPedidoWhatsApp = async (id: string, telefonoTienda: string, mensaje: string) => {
    // Usamos api.whatsapp.com que procesa mejor los símbolos que wa.me
    const url = `https://api.whatsapp.com/send?phone=${telefonoTienda}&text=${encodeURIComponent(mensaje)}`
    
    // Abrir en nueva pestaña
    window.open(url, '_blank')
    
    // Marcar como enviado en base de datos
    await supabase.from('pedidos').update({ enviado_whatsapp: true }).eq('id', id)
}

