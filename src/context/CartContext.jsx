import { createContext, useReducer, useEffect } from 'react'

/* --------------------------------------------------
 * 1. TIPOS DE ACCIÓN
 * Constantes para evitar strings sueltos en el reducer.
 * -------------------------------------------------- */
export const CART_ACTIONS = {
  ADD_ITEM:        'ADD_ITEM',
  REMOVE_ITEM:     'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART:      'CLEAR_CART',
}


/* --------------------------------------------------
 * 2. ESTADO INICIAL
 * Se hidrata desde localStorage si existe.
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

const initialState = loadFromStorage()


/* --------------------------------------------------
 * 3. REDUCER
 * Lógica pura de estado — fácil de testear.
 * -------------------------------------------------- */
function cartReducer(state, action) {
  switch (action.type) {

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload
      const existingIndex = state.items.findIndex(
        item => item.id === product.id
      )

      if (existingIndex >= 0) {
        // El producto ya está en el carrito: sumar cantidad
        const updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        return { ...state, items: updatedItems }
      }

      // Producto nuevo: agregar al carrito
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
        // Si la cantidad llega a 0, eliminar el item
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
      return { ...state, items: [] }
    }

    default:
      return state
  }
}


/* --------------------------------------------------
 * 4. CONTEXT
 * -------------------------------------------------- */
export const CartContext = createContext(null)


/* --------------------------------------------------
 * 5. PROVIDER
 * -------------------------------------------------- */
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Persistir en localStorage cada vez que el carrito cambia
  useEffect(function persistCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage puede estar bloqueado (modo privado estricto, etc.)
      console.warn('No se pudo persistir el carrito en localStorage.')
    }
  }, [state])

  // --- Acciones tipadas para exponer al contexto ---

  function addItem(product, quantity = 1) {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity },
    })
  }

  function removeItem(id) {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id },
    })
  }

  function updateQuantity(id, quantity) {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    })
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  // --- Valores derivados ---

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const contextValue = {
    // Estado
    items: state.items,
    itemCount,
    subtotal,
    isEmpty: state.items.length === 0,

    // Acciones
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}
