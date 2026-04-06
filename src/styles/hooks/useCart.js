import { useContext } from 'react'
import { CartContext } from '@context/CartContext'

/*
 * useCart — hook para consumir el CartContext.
 *
 * Por qué un hook y no importar el context directo:
 * 1. Un solo punto de entrada — si mañana cambia el context,
 *    solo cambia este archivo, no cada componente.
 * 2. El guard de error te avisa en desarrollo si usás el hook
 *    fuera del CartProvider (error claro en lugar de silencioso).
 *
 * Uso:
 *   const { items, addItem, itemCount } = useCart()
 */
export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart debe usarse dentro de un <CartProvider>. ' +
      'Verificá que App.jsx esté envuelto con <CartProvider>.'
    )
  }

  return context
}
