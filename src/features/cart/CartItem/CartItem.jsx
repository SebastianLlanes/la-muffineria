import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatPrice'
import styles from './CartItem.module.css'

/*
 * CartItem
 *
 * Props:
 *   item  object  — item del carrito (product + quantity)
 */
export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart()

  function handleDecrease() {
    updateQuantity(item.id, item.quantity - 1)
    // Si quantity llega a 0, el reducer elimina el item automáticamente
  }

  function handleIncrease() {
    updateQuantity(item.id, item.quantity + 1)
  }

  function handleRemove() {
    removeItem(item.id)
  }

  const subtotal = item.price * item.quantity

  return (
    <li className={styles.item}>

      {/* ── Info del producto ── */}
      <div className={styles.info}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.unitPrice}>{formatPrice(item.price)} c/u</p>
      </div>

      {/* ── Controles y subtotal ── */}
      <div className={styles.controls}>

        {/* Stepper de cantidad */}
        <div className={styles.stepper} role="group" aria-label={`Cantidad de ${item.name}`}>
          <button
            className={styles.stepBtn}
            onClick={handleDecrease}
            aria-label="Restar uno"
          >
            {item.quantity === 1 ? <TrashIcon /> : <MinusIcon />}
          </button>

          <span className={styles.quantity} aria-live="polite">
            {item.quantity}
          </span>

          <button
            className={styles.stepBtn}
            onClick={handleIncrease}
            aria-label="Sumar uno"
          >
            <PlusIcon />
          </button>
        </div>

        {/* Subtotal del item */}
        <p className={styles.subtotal}>{formatPrice(subtotal)}</p>

      </div>

    </li>
  )
}

function MinusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}
