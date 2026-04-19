import { useState } from 'react'
import { useBoxBuilder } from './useBoxBuilder'
import { buildWhatsAppURL } from '@utils/whatsapp'
import { registrarPedido } from '@/firebase/pedidosService'
import { DISCOUNT_THRESHOLD } from '@context/CartContext'
import styles from './BoxBuilder.module.css'

export function BoxBuilder({ onClose }) {
  const {
    items,
    itemCount,
    applyDiscount,
    boxTotal,
    savings,
    units,
    updateQuantity,
    clearCart,
  } = useBoxBuilder()

  const [success, setSuccess] = useState(false)
  const [nombreCliente, setNombreCliente] = useState('')

  const bagClosed    = itemCount >= DISCOUNT_THRESHOLD
  const visibleUnits = units.slice(0, 9)
  const extraCount   = units.length - visibleUnits.length
  const remaining    = DISCOUNT_THRESHOLD - itemCount

async function handleWhatsApp() {
  const url = buildWhatsAppURL(items, applyDiscount)

  // window.open ANTES del await — debe ejecutarse en el contexto
  // directo del click o el browser lo bloquea como popup
  window.open(url, '_blank')

  try {
    await registrarPedido({
      cliente: nombreCliente.trim() || 'Sin nombre',
      items: items.map(item => ({
        id:       item.id,
        name:     item.name,
        quantity: item.quantity,
        size:     item.size,
        precio:   applyDiscount ? item.discountPrice : item.normalPrice,
      })),
      total:         boxTotal,
      applyDiscount,
      savings:       applyDiscount ? savings : 0,
    })
  } catch (error) {
  console.error('Error al registrar pedido:', error)
  alert('Error: ' + error.message)
}

  clearCart()
  setSuccess(true)
}

  /* ── Pantalla de éxito ── */
  if (success) {
    return (
      <div className={styles.successWrapper}>
        <span className={styles.successEmoji}>🧁</span>
        <h3 className={styles.successTitle}>¡Pedido enviado!</h3>
        <p className={styles.successText}>
          Te estamos esperando en WhatsApp para confirmar tu pedido y coordinar la entrega.
        </p>
        <p className={styles.successSub}>De otra semilla. Del mismo amor. 🌿</p>
        <button className={styles.successBtn} onClick={() => setSuccess(false)}>
          ¡Perfecto!
        </button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.title}>Tu pedido</span>
        <button className={styles.resetBtn} onClick={clearCart}>
          Vaciar
        </button>
      </div>

      {/* ── Bolsa kraft ── */}
      <div className={`${styles.bag} ${bagClosed ? styles.bagClosed : ""}`}>
        {/* Doblez superior */}
        <div
          className={`${styles.bagFold} ${bagClosed ? styles.bagFoldClosed : ""}`}
        >
          {bagClosed && (
            <span className={styles.bagFoldLabel}>¡Lista para enviar! 🎉</span>
          )}
        </div>

        {/* Interior con thumbnails */}
        <div className={styles.bagInterior}>
          {visibleUnits.map((item, i) => (
            <div
              key={i}
              className={styles.bagThumb}
              style={{ "--i": i }}
              title={item.name}
            >
              <img src={item.image} alt={item.name} />
            </div>
          ))}
          {extraCount > 0 && (
            <div className={`${styles.bagThumb} ${styles.bagThumbExtra}`}>
              +{extraCount}
            </div>
          )}
        </div>
      </div>

      {/* ── Badge de descuento ── */}
      {applyDiscount ? (
        <div className={styles.discountBadge}>
          🎁 Precio especial activo — ahorrás ${savings.toLocaleString("es-AR")}
        </div>
      ) : (
        <p className={styles.discountHint}>
          {remaining === 1
            ? "¡Falta 1 muffin para el precio especial! 🛍️"
            : `Agregá ${remaining} más para activar el precio especial 🛍️`}
        </p>
      )}

      {/* ── Lista de ítems ── */}
      <ul className={styles.itemList}>
        {items.map((item) => {
          const unitPrice = applyDiscount
            ? item.discountPrice
            : item.normalPrice;
          return (
            <li key={item.id} className={styles.itemRow}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImg}
              />
              <div className={styles.itemInfo}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemMeta}>
                  {item.size === "mediano" ? "90g" : "160g"}
                  {" · "}${unitPrice.toLocaleString("es-AR")} c/u
                </span>
              </div>
              <div className={styles.stepper}>
                <button
                  className={styles.stepBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label="Restar uno"
                >
                  {item.quantity === 1 ? <TrashIcon /> : "−"}
                </button>
                <span className={styles.stepCount}>{item.quantity}</span>
                <button
                  className={styles.stepBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label="Sumar uno"
                >
                  +
                </button>
              </div>
              <span className={styles.itemSubtotal}>
                ${(unitPrice * item.quantity).toLocaleString("es-AR")}
              </span>
            </li>
          );
        })}
      </ul>

      {/* ── Pricing ── */}
      <div className={styles.pricing}>
        {applyDiscount && (
          <div className={styles.pricingRow}>
            <span>Descuento bolsa</span>
            <span className={styles.savingsValue}>
              -${savings.toLocaleString("es-AR")}
            </span>
          </div>
        )}
        <div className={`${styles.pricingRow} ${styles.total}`}>
          <span>Total</span>
          <span>${boxTotal.toLocaleString("es-AR")}</span>
        </div>
      </div>

      <input
        className={`${styles.nombreInput} ${!nombreCliente.trim() ? styles.nombreInputRequerido : ""}`}
        type="text"
        placeholder="* Tu nombre (para el pedido)"
        value={nombreCliente}
        onChange={(e) => setNombreCliente(e.target.value)}
      />
      {/* ── WhatsApp ── */}
      <button
        className={`${styles.whatsappBtn} ${styles.whatsappActive}`}
        onClick={handleWhatsApp}
        disabled={!nombreCliente.trim()}
      >
        <WhatsAppIcon /> Pedir por WhatsApp
      </button>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .611.611l5.57-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 0 1-5.034-1.378l-.36-.214-3.742.991.998-3.648-.235-.374A9.861 9.861 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118c5.466 0 9.882 4.415 9.882 9.882 0 5.466-4.416 9.882-9.882 9.882z"/>
    </svg>
  )
}