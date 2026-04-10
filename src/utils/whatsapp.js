const WHATSAPP_NUMBER = '5493482608105'

function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildOrderText(items, unitPrice, note) {
  const safeNote  = String(note == null ? '' : note).trim()
  const separator = '—————————————————'
  const header    = '🧁 *PEDIDO — La Muffinería*'

  const lines = items.map(item => {
    const subtotal = formatPrice(unitPrice * item.quantity)
    return `• ${item.quantity}x *${item.name}* — ${subtotal}`
  })

  const total = items.reduce(
    (acc, item) => acc + unitPrice * item.quantity, 0
  )

  const parts = [
    header,
    separator,
    ...lines,
    separator,
    `*Total: ${formatPrice(total)}*`,
  ]

  if (safeNote) {
    parts.push(`\n📝 *Nota:* ${safeNote}`)
  }

  parts.push('\n_De otra semilla. Del mismo amor._ 🌿')

  return parts.join('\n')
}

export function buildWhatsAppURL(items, unitPrice, note) {
  if (!items || items.length === 0) return null
  const text = buildOrderText(items, unitPrice, note)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function sendWhatsAppOrder(items, unitPrice, note) {
  const url = buildWhatsAppURL(items, unitPrice, note)
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
