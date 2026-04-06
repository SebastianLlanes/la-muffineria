import { useEffect, useRef } from 'react'
import { useCart } from '@hooks/useCart'
import CartItem from '@features/cart/CartItem/CartItem'
import CartSummary from '@features/cart/CartSummary/CartSummary'
import styles from './CartDrawer.module.css'

/*
 * CartDrawer
 *
 * Mobile:  bottom sheet — sube desde abajo con una barra de arrastre
 * Desktop: sidebar      — desliza desde la derecha
 *
 * Props:
 *   isOpen  boolean  — controla visibilidad
 *   onClose fn       — callback para cerrar
 */
export default function CartDrawer({ isOpen, onClose }) {
  const { items, isEmpty, itemCount, clearCart } = useCart()
  const drawerRef = useRef(null)
  const firstFocusableRef = useRef(null)

  // Cerrar con Escape
  useEffect(function handleEscape() {
    if (!isOpen) return
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return function cleanup() {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(function lockBodyScroll() {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Foco al primer elemento interactivo del drawer
      setTimeout(function focusDrawer() {
        firstFocusableRef.current && firstFocusableRef.current.focus()
      }, 350) // después de la animación CSS
    } else {
      document.body.style.overflow = ''
    }
    return function cleanup() {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* ── Overlay ── */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Drawer ── */}
      <aside
        ref={drawerRef}
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
      >
        {/* Handle de arrastre — solo visual en mobile */}
        <div className={styles.handle} aria-hidden="true" />

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <h2 className={styles.title}>Tu pedido</h2>
            {!isEmpty && (
              <span className={styles.itemCountBadge}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>

          <div className={styles.headerActions}>
            {/* Vaciar carrito — solo visible si hay items */}
            {!isEmpty && (
              <button
                className={styles.clearButton}
                onClick={clearCart}
                aria-label="Vaciar carrito"
              >
                Vaciar
              </button>
            )}

            {/* Botón cerrar */}
            <button
              ref={firstFocusableRef}
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Cerrar carrito"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* ── Contenido scrolleable ── */}
        <div className={styles.content}>
          {isEmpty
            ? (
              /* Estado vacío */
              <div className={styles.empty}>
                <span className={styles.emptyIcon} aria-hidden="true">🧁</span>
                <h3 className={styles.emptyTitle}>Tu carrito está vacío</h3>
                <p className={styles.emptyText}>
                  Explorá nuestros muffins y armá tu pedido.
                </p>
                <button className={styles.emptyAction} onClick={onClose}>
                  Ver productos
                </button>
              </div>
            )
            : (
              <>
                {/* Lista de items */}
                <ul className={styles.itemList} aria-label="Items en el carrito">
                  {items.map(function(item) {
                    return <CartItem key={item.id} item={item} />
                  })}
                </ul>

                {/* Separador */}
                <div className={styles.divider} />

                {/* Resumen + WhatsApp */}
                <CartSummary onClose={onClose} />
              </>
            )
          }
        </div>

      </aside>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
