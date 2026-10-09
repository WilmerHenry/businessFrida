export const RESERVATION_KEY = 'frida-reservation-v1'
export function cleanItems(value, validIds) {
  if (!Array.isArray(value)) return []
  return value.filter(item => item && validIds.includes(item.id) && typeof item.preference === 'string' && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99).slice(0, 100).map(item => ({ id: item.id, preference: item.preference.slice(0, 180), quantity: item.quantity }))
}
export function addItem(items, item) {
  const existing = items.findIndex(line => line.id === item.id && line.preference === item.preference)
  if (existing < 0) return [...items, item]
  return items.map((line, index) => index === existing ? { ...line, quantity: Math.min(99, line.quantity + item.quantity) } : line)
}
export function reservationMessage(items, products, details = {}) {
  const lines = items.map(item => {
    const product = products.find(p => p.id === item.id)
    return product ? `• ${product.name} — ${item.quantity} unidad(es)${item.preference ? `\n  Preferencia: ${item.preference}` : ''}` : ''
  }).filter(Boolean)
  return ['Hola, Frida. Quisiera consultar esta reserva:', '', ...lines,
    details.name?.trim() ? `\nNombre: ${details.name.trim()}` : '',
    details.delivery ? `Entrega: ${details.delivery}` : '',
    details.note?.trim() ? `Nota: ${details.note.trim()}` : '',
    '\n¿Me confirman disponibilidad, precio total y opciones de entrega? Entiendo que la reserva queda pendiente de confirmación.'
  ].filter(Boolean).join('\n')
}
export function whatsappUrl(phone, message) {
  const digits = phone.replace(/\D/g, '')
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
