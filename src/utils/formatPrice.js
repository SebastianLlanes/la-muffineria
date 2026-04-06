/*
 * utils/formatPrice.js
 *
 * Centraliza el formato de precios en pesos argentinos.
 * Si mañana cambia la moneda o el formato, cambia acá.
 */

/**
 * @param {number} amount
 * @returns {string}  ej: "$1.200"
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
