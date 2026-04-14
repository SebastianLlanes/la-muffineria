import { useBoxBuilder } from './useBoxBuilder'
import {
  PRICE_NORMAL,
  PRICE_DISCOUNT,
  PRICE_NORMAL_MEDIUM,
  PRICE_DISCOUNT_MEDIUM,
} from '@context/CartContext'
import styles from './BoxSizeSelector.module.css'

export function BoxSizeSelector({ compact = false }) {
  const { setBoxSize, savings, itemCount, items, hasMixed } = useBoxBuilder()

  // Detectar qué tamaño hay en el carrito
  const hasMedium = items.some(i => i.size === 'mediano')
  const hasGrande = items.some(i => i.size === 'grande')

  // Precios a mostrar según contexto del carrito
  const normalPrice    = hasMedium && !hasGrande ? PRICE_NORMAL_MEDIUM   : PRICE_NORMAL
  const discountPrice  = hasMedium && !hasGrande ? PRICE_DISCOUNT_MEDIUM : PRICE_DISCOUNT
  const discountLabel  = hasMixed
    ? 'Precio normal (mixto)'
    : `$${discountPrice.toLocaleString('es-AR')} c/u`
  const discountNoteHeader = hasMixed
    ? 'Con tamaños mixtos no aplica descuento'
    : `A partir de 4 unidades bajás a $${discountPrice.toLocaleString('es-AR')} c/u`

  const BOX_OPTIONS = [
    {
      size: 'individual',
      label: 'Sin caja',
      description: '1 a 3 muffins',
      emoji: '🛍️',
      note: `$${normalPrice.toLocaleString('es-AR')} c/u`,
    },
    {
      size: 4,
      label: 'Caja x4',
      description: 'El gustito justo',
      emoji: '🧁',
      note: discountLabel,
    },
    {
      size: 6,
      label: 'Caja x6',
      description: 'Para compartir',
      emoji: '🎁',
      note: discountLabel,
    },
  ]

  return (
    <div className={`${styles.wrapper} ${compact ? styles.compact : ''}`}>
      {!compact && (
        <>
          <p className={styles.heading}>¿Cómo querés tu pedido?</p>
          <p className={styles.priceNote} dangerouslySetInnerHTML={{ __html:
            discountNoteHeader.replace(/\$[\d.]+/, m => `<strong>${m}</strong>`)
          }} />
        </>
      )}

      <div className={styles.options}>
        {BOX_OPTIONS.map(({ size, label, description, emoji, note }) => {
          const disabled =
            (size === 'individual' && itemCount >= 4) ||
            (size === 4           && itemCount > 4)  ||
            (size === 6           && itemCount > 6)

          return (
            <button
              key={size}
              className={`${styles.option} ${disabled ? styles.optionDisabled : ''}`}
              onClick={() => !disabled && setBoxSize(size)}
              disabled={disabled}
            >
              <span className={styles.emoji}>{emoji}</span>
              <span className={styles.label}>{label}</span>
              <span className={styles.description}>{description}</span>
              <span className={styles.note}>{note}</span>
              {disabled && (
                <span className={styles.disabledNote}>No disponible</span>
              )}
            </button>
          )
        })}
      </div>

      {savings > 0 && !compact && (
        <p className={styles.savings}>
          Ahorrás ${savings.toLocaleString('es-AR')} vs precio individual
        </p>
      )}
    </div>
  )
}