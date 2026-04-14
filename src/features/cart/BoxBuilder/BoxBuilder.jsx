import { useState, useEffect } from 'react'
import { useBoxBuilder } from './useBoxBuilder'
import { BoxSizeSelector } from './BoxSizeSelector'
import { BoxSlot } from './BoxSlot'
import { buildWhatsAppURL } from '@utils/whatsapp'
import styles from './BoxBuilder.module.css'

export function BoxBuilder({ onClose }) {
  const {
    items,
    boxSize,
    slots,
    filledCount,
    emptyCount,
    isBoxComplete,
    showUpsell,
    isIndividual,
    isBox,
    hasMixed,
    boxTotal,
    savings,
    itemCount,
    removeUnit,
    clearCart,
    setBoxSize,
    pendingItem,
    confirmUpgrade,
    cancelPending,
    replaceSlot,
  } = useBoxBuilder();

 
const [lidClosed, setLidClosed] = useState(false)
const [editMode, setEditMode]   = useState(false)
const [replaceMode, setReplaceMode] = useState(false)
const [success, setSuccess] = useState(false)

useEffect(() => {
  if (isBoxComplete && isBox && !editMode) {
    const delay = boxSize === 6 ? 1600 : 1000
    const timer = setTimeout(() => setLidClosed(true), delay)
    return () => clearTimeout(timer)
  } else {
    setLidClosed(false)
  }
}, [isBoxComplete, isBox, editMode, boxSize])

useEffect(() => {
  if (!isBoxComplete) setEditMode(false)
}, [isBoxComplete])

useEffect(() => {
  if (!pendingItem) setReplaceMode(false)
}, [pendingItem])

// Recién acá el early return
if (!boxSize) return <BoxSizeSelector />

if (success) {
  return (
    <div className={styles.successWrapper}>
      <span className={styles.successEmoji}>🧁</span>
      <h3 className={styles.successTitle}>¡Pedido enviado!</h3>
      <p className={styles.successText}>
        Te estamos esperando en WhatsApp para confirmar tu pedido y coordinar la entrega.
      </p>
      <p className={styles.successSub}>De otra semilla. Del mismo amor. 🌿</p>
      <button
        className={styles.successBtn}
        onClick={() => setSuccess(false)}
      >
        ¡Perfecto!
      </button>
    </div>
  )
}


function handleWhatsApp() {
  const applyDiscount = isBox && !hasMixed
  const url = buildWhatsAppURL(items, applyDiscount)
  window.open(url, '_blank')
  clearCart()
  setSuccess(true)
}
  /* ── Modo individual ── */
  if (isIndividual) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>Tu pedido</span>
          <button className={styles.resetBtn} onClick={clearCart}>
            Empezar de nuevo
          </button>
        </div>

        <ul className={styles.individualList}>
          {items.map((item) => (
            <li key={item.id} className={styles.individualItem}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.individualImg}
              />
              <div className={styles.individualInfo}>
                <span className={styles.individualName}>{item.name}</span>
                <span className={styles.individualQty}>{item.quantity} u.</span>
              </div>
              <span className={styles.individualPrice}>
                ${(item.quantity * item.normalPrice).toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>

        {itemCount >= 1 && (
          <div className={styles.upsellIndividual}>
            <span>🧁 ¿Armamos una caja con descuento?</span>
            <div className={styles.upsellActions}>
              <button
                onClick={() => setBoxSize(4)}
                className={styles.upsellBtn}
              >
                Caja x4
              </button>
              <button
                onClick={() => setBoxSize(6)}
                className={styles.upsellBtn}
              >
                Caja x6
              </button>
            </div>
          </div>
        )}

        <div className={styles.pricing}>
          <div className={styles.pricingRow}>
            <span>
              {itemCount} muffin{itemCount !== 1 ? "s" : ""}
            </span>
            <span>Precio normal</span>
          </div>
          <div className={`${styles.pricingRow} ${styles.total}`}>
            <span>Total</span>
            <span>${boxTotal.toLocaleString("es-AR")}</span>
          </div>
        </div>

        <button
          className={`${styles.whatsappBtn} ${styles.whatsappActive}`}
          onClick={handleWhatsApp}
        >
          <WhatsAppIcon />
          Pedir por WhatsApp
        </button>
      </div>
    );
  }

  /* ── Modo caja (x4 o x6) ── */
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Tu caja x{boxSize}</span>
        <button className={styles.resetBtn} onClick={clearCart}>
          Empezar de nuevo
        </button>
      </div>

      <div className={`${styles.box} ${lidClosed ? styles.complete : ""}`}>
        <div className={`${styles.lid} ${lidClosed ? styles.lidClosed : ""}`}>
          <span className={styles.lidEmoji}>📦</span>
          <span className={styles.lidText}>¡Lista para enviar!</span>
        </div>

        <div
          className={`${styles.grid} ${boxSize === 6 ? styles.grid6 : styles.grid4}`}
        >
          {slots.map((item, index) => (
            <BoxSlot
              key={index}
              item={item}
              index={index}
              onRemove={removeUnit}
              onAdd={onClose}
            />
          ))}

          {/* ── Overlay de item pendiente ── */}
          {pendingItem && (
            <div className={styles.pendingOverlay}>
              {!replaceMode ? (
                /* Vista de upsell */
                <>
                  <span className={styles.pendingEmoji}>🎁</span>
                  <p className={styles.pendingTitle}>
                    ¡Estás eligiendo más de 4!
                  </p>
                  <p className={styles.pendingText}>
                    Pasate a la caja x6 y llevate{" "}
                    <strong>{pendingItem.product.name}</strong> sin resignar
                    nada. Mismo precio unitario, más variedad.
                  </p>
                  <button
                    className={styles.pendingUpgradeSoft}
                    onClick={confirmUpgrade}
                  >
                    ¿Y si me llevo 6? Mismo precio x 🧁 😏
                  </button>

                  <button
                    className={styles.pendingReplaceBtn}
                    onClick={() => setReplaceMode(true)}
                  >
                    No, quiero reemplazar un muffin
                  </button>

                  <button
                    className={styles.pendingCancelBtn}
                    onClick={cancelPending}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                /* Vista de reemplazo */
                <>
                  <p className={styles.pendingTitle}>
                    ¿Cuál querés cambiar por{" "}
                    <strong>{pendingItem.product.name}</strong>?
                  </p>
                  <div className={styles.replaceList}>
                    {items.map((item) => (
                      <button
                        key={item.id}
                        className={styles.replaceItem}
                        onClick={() => replaceSlot(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className={styles.replaceImg}
                        />
                        <span className={styles.replaceName}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    className={styles.pendingCancelBtn}
                    onClick={() => setReplaceMode(false)}
                  >
                    ← Volver
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {showUpsell && (
        <div className={styles.upsellBox}>
          <p className={styles.upsellText}>
            🎁 ¿Vas por una caja x6? Podés agregar 2 más al mismo precio.
          </p>
          <div className={styles.upsellActions}>
            <button className={styles.upsellBtn} onClick={() => setBoxSize(6)}>
              Sí, quiero x6
            </button>
            <button className={styles.upsellSecondary} onClick={() => {}}>
              No, me quedo con x4
            </button>
          </div>
        </div>
      )}

      {!isBoxComplete && (
        <p className={styles.status}>
          {emptyCount === boxSize
            ? "Tocá un slot para elegir un muffin 👆"
            : `Faltan ${emptyCount} muffin${emptyCount !== 1 ? "s" : ""} para completar la caja`}
        </p>
      )}

      <div className={styles.pricing}>
        <div className={styles.pricingRow}>
          <span>
            {filledCount} muffin{filledCount !== 1 ? "s" : ""}
          </span>
          {!hasMixed && items.length > 0 && (
            <span>${items[0].discountPrice.toLocaleString("es-AR")} c/u</span>
          )}
          {hasMixed && <span>Precio normal (mixto)</span>}
        </div>
        {savings > 0 && (
          <div className={`${styles.pricingRow} ${styles.savings}`}>
            <span>Ahorro de caja</span>
            <span>-${savings.toLocaleString("es-AR")}</span>
          </div>
        )}
        <div className={`${styles.pricingRow} ${styles.total}`}>
          <span>Total</span>
          <span>${boxTotal.toLocaleString("es-AR")}</span>
        </div>
      </div>

      <button
        className={`${styles.whatsappBtn} ${lidClosed ? styles.whatsappActive : ""}`}
        onClick={handleWhatsApp}
        disabled={!lidClosed}
      >
        {lidClosed ? (
          <>
            <WhatsAppIcon /> Pedir por WhatsApp
          </>
        ) : (
          `Completá la caja (faltan ${emptyCount})`
        )}
      </button>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.859L.057 23.428a.5.5 0 0 0 .611.611l5.57-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.88 9.88 0 0 1-5.034-1.378l-.36-.214-3.742.991.998-3.648-.235-.374A9.861 9.861 0 0 1 2.118 12C2.118 6.533 6.533 2.118 12 2.118c5.466 0 9.882 4.415 9.882 9.882 0 5.466-4.416 9.882-9.882 9.882z"/>
    </svg>
  )
}