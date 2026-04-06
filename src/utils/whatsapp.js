/*
 * utils/whatsapp.js
 *
 * Función pura que construye el mensaje de WhatsApp
 * a partir del carrito. Completamente desacoplada de React.
 *
 * Por qué función pura:
 * - Fácil de testear (input → output, sin efectos)
 * - Fácil de cambiar el formato sin tocar componentes
 * - Se puede reutilizar en cualquier parte
 */

// ⚠️ Reemplazar con el número real de La Muffinería
// Formato: código de país sin '+' ni espacios
const WHATSAPP_NUMBER = '5493482608105'

/**
 * Formatea un precio en pesos argentinos.
 * @param {number} amount
 * @returns {string}  ej: "$1.200"
 */
function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Construye el texto del pedido.
 * @param {Array}  items       — items del carrito
 * @param {string} note        — nota opcional del cliente
 * @returns {string}           — texto formateado
 */
function buildOrderText(items, note = '') {
  const separator = '—————————————————'
  const header    = '🧁 *PEDIDO — La Muffinería*'

  const lines = items.map(item => {
    const subtotal = formatPrice(item.price * item.quantity)
    return `• ${item.quantity}x *${item.name}* — ${subtotal}`
  })

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  )

  const parts = [
    header,
    separator,
    ...lines,
    separator,
    `*Total: ${formatPrice(total)}*`,
  ]

  if (note.trim()) {
    parts.push(`\n📝 *Nota:* ${note.trim()}`)
  }

  parts.push('\n_De otra semilla. Del mismo amor._ 🌿')

  return parts.join('\n')
}

/**
 * Genera el link de WhatsApp listo para abrir.
 * @param {Array}  items  — items del carrito
 * @param {string} note   — nota opcional
 * @returns {string}      — URL de WhatsApp
 */
export function buildWhatsAppURL(items, note = '') {
  if (!items || items.length === 0) return null

  const text = buildOrderText(items, note)
  const encoded = encodeURIComponent(text)

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

/**
 * Abre WhatsApp directamente con el pedido.
 * @param {Array}  items
 * @param {string} note
 */
export function sendWhatsAppOrder(items, note = '') {
  const url = buildWhatsAppURL(items, note)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}
