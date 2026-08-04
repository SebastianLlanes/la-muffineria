const WHATSAPP_NUMBER = '5493482608105'

function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildOrderText(items, applyDiscount, note, nombreCliente) {
  const safeNote   = String(note == null ? '' : note).trim()
  const safeNombre = String(nombreCliente == null ? '' : nombreCliente).trim()
  const separator  = '—————————————————'
  const header     = '🧁 *PEDIDO — La Muffinería*'

  const lines = items.map(item => {
    const unitPrice     = applyDiscount ? item.discountPrice : item.normalPrice
    const subtotal      = formatPrice(unitPrice * item.quantity)
    const sizeLabel     = item.size === 'mediano' ? ' _(90g)_' : ' _(160g)_'
    const diabeticLabel = item.sinAzucar ? ' 🚫🍬 *Apto diabético*' : ''
    return `• ${item.quantity}x *${item.name}*${sizeLabel}${diabeticLabel} — ${subtotal}`
  })

  const total = items.reduce((acc, item) => {
    const unitPrice = applyDiscount ? item.discountPrice : item.normalPrice
    return acc + unitPrice * item.quantity
  }, 0)

  const parts = [header]
  if (safeNombre) parts.push(`👤 *Cliente:* ${safeNombre}`)
  parts.push(separator, ...lines, separator, `*Total: ${formatPrice(total)}*`)

  if (safeNote) parts.push(`\n📝 *Nota:* ${safeNote}`)
  parts.push('\n_De otra semilla. Del mismo amor._ 🌿')

  return parts.join('\n')
}


export function buildWhatsAppURL(items, applyDiscount, note, nombreCliente) {
  if (!items || items.length === 0) return null
  const text = buildOrderText(items, applyDiscount, note, nombreCliente)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function sendWhatsAppOrder(items, applyDiscount, note, nombreCliente) {
  const url = buildWhatsAppURL(items, applyDiscount, note, nombreCliente)
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
