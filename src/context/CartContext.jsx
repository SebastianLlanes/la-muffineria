import { createContext, useReducer, useEffect, useState } from 'react'

/* --------------------------------------------------
 * 1. PRECIOS
 * -------------------------------------------------- */
export const PRICE_NORMAL   = 2400   // individual o menos de 4
export const PRICE_DISCOUNT = 2250   // caja de 4 o 6

/* --------------------------------------------------
 * 2. TIPOS DE ACCIÓN
 * -------------------------------------------------- */
export const CART_ACTIONS = {
  ADD_ITEM:        'ADD_ITEM',
  REMOVE_ITEM:     'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART:      'CLEAR_CART',
  SET_BOX_SIZE:    'SET_BOX_SIZE',
}

/* --------------------------------------------------
 * 3. ESTADO INICIAL
 * boxSize: null | 'individual' | 4 | 6
 * -------------------------------------------------- */
const STORAGE_KEY = 'la-muffineria-cart'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [], boxSize: null }
  } catch {
    return { items: [], boxSize: null }
  }
}

const initialState = loadFromStorage()

/* --------------------------------------------------
 * 4. REDUCER
 * -------------------------------------------------- */
function cartReducer(state, action) {
  switch (action.type) {

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload
      const existingIndex = state.items.findIndex(
        item => item.id === product.id
      )
      if (existingIndex >= 0) {
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        return { ...state, items: updatedItems }
      }
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id),
        }
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return { items: [], boxSize: null }
    }

    case CART_ACTIONS.SET_BOX_SIZE: {
      return { ...state, boxSize: action.payload.size }
    }

    default:
      return state
  }
}

/* --------------------------------------------------
 * 5. CONTEXT
 * -------------------------------------------------- */
export const CartContext = createContext(null)

/* --------------------------------------------------
 * 6. PROVIDER
 * -------------------------------------------------- */
export function CartProvider({ children, onCartOpen }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [pendingItem, setPendingItem] = useState(null)

  useEffect(function persistCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      console.warn('No se pudo persistir el carrito en localStorage.')
    }
  }, [state])

  // --- Acciones ---

  function addItem(product, quantity = 1) {
  // Si el box x4 está lleno, interceptar y guardar como pendiente
  const currentCount = state.items.reduce((t, i) => t + i.quantity, 0)
  if (state.boxSize === 4 && currentCount >= 4) {
  setPendingItem({ product, quantity })
  onCartOpen?.()
  return
}
  dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } })
}

  function removeItem(id) {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } })
  }

  function updateQuantity(id, quantity) {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } })
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  // Confirma upgrade a x6 y agrega el item pendiente
function confirmUpgrade() {
  if (!pendingItem) return
  dispatch({ type: CART_ACTIONS.SET_BOX_SIZE, payload: { size: 6 } })
  dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: pendingItem })
  setPendingItem(null)
}

// Cancela el item pendiente
function cancelPending() {
  setPendingItem(null)
}

// Reemplaza un slot: quita una unidad del item viejo, agrega el pendiente
function replaceSlot(replaceItemId) {
  if (!pendingItem) return
  const existing = state.items.find(i => i.id === replaceItemId)
  if (!existing) return
  dispatch({
    type: CART_ACTIONS.UPDATE_QUANTITY,
    payload: { id: replaceItemId, quantity: existing.quantity - 1 },
  })
  dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: pendingItem })
  setPendingItem(null)
}

  function setBoxSize(size) {
    dispatch({ type: CART_ACTIONS.SET_BOX_SIZE, payload: { size } })
  }

  // --- Valores derivados ---

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const isIndividual = state.boxSize === 'individual'
  const isBox        = state.boxSize === 4 || state.boxSize === 6

  // Descuento solo aplica en modo caja con 4 o más unidades
  const unitPrice = isBox ? PRICE_DISCOUNT : PRICE_NORMAL

  const boxTotal = itemCount * unitPrice

  // Ahorro vs precio normal
  const savings = isBox ? (PRICE_NORMAL - PRICE_DISCOUNT) * itemCount : 0

  // Completo: individual siempre listo si hay items, caja cuando alcanza el tamaño
  const isBoxComplete = isIndividual
    ? itemCount > 0
    : isBox && itemCount >= state.boxSize

  // ¿Se puede seguir agregando?
  const canAddMore = isIndividual
    ? true
    : isBox && itemCount < state.boxSize

  const contextValue = {
    // Estado
    items: state.items,
    boxSize: state.boxSize,
    itemCount,
    unitPrice,
    boxTotal,
    savings,
    isBoxComplete,
    canAddMore,
    isIndividual,
    isBox,
    isEmpty: state.items.length === 0,
    pendingItem,
    confirmUpgrade,
    cancelPending,
    replaceSlot,

    // Acciones
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setBoxSize,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
