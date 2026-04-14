import { useContext, useMemo } from 'react'
import { CartContext } from '@context/CartContext'

export function useBoxBuilder() {
  const {
    items,
    itemCount,
    hasMixed,
    applyDiscount,
    boxTotal,
    savings,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  } = useContext(CartContext)

  function removeUnit(itemId) {
    const item = items.find(i => i.id === itemId)
    if (!item) return
    updateQuantity(itemId, item.quantity - 1)
  }

  // Lista plana de unidades para la bolsa visual (max 9 thumbnails)
  const units = useMemo(() => {
    const flat = []
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) flat.push(item)
    }
    return flat
  }, [items])

  return {
    items,
    itemCount,
    isEmpty,
    hasMixed,
    applyDiscount,
    boxTotal,
    savings,
    units,
    addItem,
    removeItem,
    removeUnit,
    updateQuantity,
    clearCart,
  }
}