import { createContext, useReducer, useEffect } from 'react'

/* --------------------------------------------------
 * 1. PRECIOS
 * -------------------------------------------------- */
export const PRICE_NORMAL          = 2400
export const PRICE_DISCOUNT        = 2250
export const PRICE_NORMAL_MEDIUM   = 2000
export const PRICE_DISCOUNT_MEDIUM = 1800
export const DISCOUNT_THRESHOLD   = 6   // A partir de cuántas unidades se aplica el descuento

/* --------------------------------------------------
 * 2. TIPOS DE ACCIÓN
 * -------------------------------------------------- */
export const CART_ACTIONS = {
  ADD_ITEM:        'ADD_ITEM',
  REMOVE_ITEM:     'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART:      'CLEAR_CART',
}
 
/* --------------------------------------------------
 * 3. STORAGE
 * -------------------------------------------------- */
const STORAGE_KEY = 'la-muffineria-cart'

function loadFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch {
    return { items: [] }
  }
}

/* --------------------------------------------------
 * 4. REDUCER
 * -------------------------------------------------- */
function cartReducer(state, action) {
  switch (action.type) {

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload
      const existingIndex = state.items.findIndex(item => item.id === product.id)
      if (existingIndex >= 0) {
        return {
          ...state,
          items: state.items.map((item, i) =>
            i === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }
      return { ...state, items: [...state.items, { ...product, quantity }] }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      if (quantity <= 0)
        return { ...state, items: state.items.filter(item => item.id !== id) }
      return {
        ...state,
        items: state.items.map(item => item.id === id ? { ...item, quantity } : item),
      }
    }

    case CART_ACTIONS.CLEAR_CART:
      return { items: [] }

    default:
      return state
  }
}

/* --------------------------------------------------
 * 5. CONTEXT + PROVIDER
 * -------------------------------------------------- */
export const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, loadFromStorage())

  useEffect(function persistCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      console.warn('No se pudo persistir el carrito.')
    }
  }, [state])

  function addItem(product, quantity = 1) {
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

  // ── Valores derivados ──────────────────────────────
  const itemCount = state.items.reduce((t, i) => t + i.quantity, 0)

  const sizes    = [...new Set(state.items.map(i => i.size).filter(Boolean))]
  const hasMixed = sizes.length > 1

  const applyDiscount = itemCount >= DISCOUNT_THRESHOLD

  const boxTotal = state.items.reduce((acc, item) => {
    const price = applyDiscount ? item.discountPrice : item.normalPrice
    return acc + price * item.quantity
  }, 0)

  const savings = applyDiscount
    ? state.items.reduce((acc, item) =>
        acc + (item.normalPrice - item.discountPrice) * item.quantity, 0)
    : 0

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      hasMixed,
      applyDiscount,
      boxTotal,
      savings,
      isEmpty: state.items.length === 0,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}
