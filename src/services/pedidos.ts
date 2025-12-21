import { supabase } from '../lib/supabase'
import type { CartItem } from '../types/CartItem'

export interface DatosCliente {
  nombre: string
  telefono: string
  direccion?: string
}

/* 🧾 Crear pedido */
export async function crearPedido(
  userId: string | null,
  items: CartItem[],
  datosCliente: DatosCliente
): Promise<string> {

  const total = items.reduce((acc, item) => {
    const precio =
      item.ofertaactiva && item.preciooferta
        ? item.preciooferta
        : item.precio

    return acc + precio * item.cantidad
  }, 0)

  const { data, error } = await supabase
    .from('pedidos')
    .insert({
      user_id: userId,
      cliente_nombre: datosCliente.nombre,
      cliente_telefono: datosCliente.telefono,
      cliente_direccion: datosCliente.direccion || null,
      total,
      estado: 'Pendiente',
      enviado_whatsapp: false,
    })
    .select()
    .single()

  if (error || !data) {
    console.error(error)
    throw new Error('Error al crear pedido')
  }

  // 📦 Detalle del pedido
  const detalles = items.map(item => ({
    pedido_id: data.id,
    producto_id: item.id,
    nombre: item.nombre,
    precio:
      item.ofertaactiva && item.preciooferta
        ? item.preciooferta
        : item.precio,
    cantidad: item.cantidad,
  }))

  const { error: detalleError } = await supabase
    .from('pedido_detalles')
    .insert(detalles)

  if (detalleError) {
    console.error(detalleError)
    throw new Error('Error al guardar detalle del pedido')
  }

  return data.id
}

/* 📲 Enviar pedido por WhatsApp */
export async function enviarPedidoWhatsApp(
  pedidoId: string,
  telefonoTienda: string,
  mensaje: string
) {
  const { data, error } = await supabase
    .from('pedidos')
    .select('enviado_whatsapp')
    .eq('id', pedidoId)
    .single()

  if (error || !data) {
    throw new Error('Pedido no encontrado')
  }

  if (data.enviado_whatsapp) {
    return
  }

  await supabase
    .from('pedidos')
    .update({
      enviado_whatsapp: true,
      estado: 'Mensaje enviado',
    })
    .eq('id', pedidoId)

  const url = `https://wa.me/${telefonoTienda}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
}
