import { useContext, useMemo } from 'react'
import { CartContext, PRICE_NORMAL } from '@context/CartContext'

/* --------------------------------------------------
 * useBoxBuilder
 * -------------------------------------------------- */
export function useBoxBuilder() {
  const {
    items,
    boxSize,
    itemCount,
    hasMixed,  
    boxTotal,
    savings,
    isBoxComplete,
    canAddMore,
    isIndividual,
    isBox,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setBoxSize,
    pendingItem,
    confirmUpgrade,
    cancelPending,
    replaceSlot,
  } = useContext(CartContext);

  /* --------------------------------------------------
   * SLOTS — solo en modo caja (4 o 6)
   * En modo individual no hay slots.
   * -------------------------------------------------- */
  const slots = useMemo(() => {
    if (!isBox || !boxSize) return []

    const units = []
    for (const item of items) {
      for (let i = 0; i < item.quantity; i++) {
        units.push(item)
      }
    }

    return Array.from({ length: boxSize }, (_, i) => units[i] ?? null)
  }, [items, boxSize, isBox])

  const filledCount = slots.filter(Boolean).length
  const emptyCount  = slots.filter(s => s === null).length
  const progress    = boxSize && isBox ? filledCount / boxSize : 0

  /* --------------------------------------------------
   * UPSELL — sugerir caja x6 cuando x4 está completa
   * -------------------------------------------------- */
  const showUpsell = isBox && boxSize === 4 && isBoxComplete

  /* --------------------------------------------------
   * HELPER: quitar una unidad de un item
   * -------------------------------------------------- */
  function removeUnit(itemId) {
    const item = items.find(i => i.id === itemId)
    if (!item) return
    updateQuantity(itemId, item.quantity - 1)
  }

  return {
    // Estado del carrito
    items,
    itemCount,
    isEmpty,

    // Modo
    boxSize,
    isIndividual,
    isBox,
    setBoxSize,

    // Slots (solo modo caja)
    slots,
    filledCount,
    emptyCount,
    progress,
    canAddMore,
    isBoxComplete,

    // Upsell
    showUpsell,

    // Precios
    hasMixed,
    boxTotal,
    savings,
    PRICE_NORMAL,

    // Acciones
    addItem,
    removeItem,
    removeUnit,
    clearCart,
    pendingItem,
    confirmUpgrade,
    cancelPending,
    replaceSlot,
  };
}