import { useBoxBuilder } from './useBoxBuilder'
import styles from './BoxSizeSelector.module.css'

const BOX_OPTIONS = [
  {
    size: 'individual',
    label: 'Sin caja',
    description: '1 a 3 muffins',
    emoji: '🛍️',
    note: '$2.400 c/u',
  },
  {
    size: 4,
    label: 'Caja x4',
    description: 'El gustito justo',
    emoji: '🧁',
    note: '$2.250 c/u',
  },
  {
    size: 6,
    label: 'Caja x6',
    description: 'Para compartir',
    emoji: '🎁',
    note: '$2.250 c/u',
  },
]

export function BoxSizeSelector({ compact = false }) {
  const { setBoxSize, savings, itemCount } = useBoxBuilder()

  return (
    <div className={`${styles.wrapper} ${compact ? styles.compact : ""}`}>
      {!compact && (
        <>
          <p className={styles.heading}>¿Cómo querés tu pedido?</p>
          <p className={styles.priceNote}>
            A partir de 4 unidades bajás a <strong>$2.250 c/u</strong>
          </p>
        </>
      )}

      <div className={styles.options}>
        {BOX_OPTIONS.map(({ size, label, description, emoji, note }) => {
          const disabled =
            (size === "individual" && itemCount >= 4) ||
            (size === 4 && itemCount > 4) ||
            (size === 6 && itemCount > 6);

          return (
            <button
              key={size}
              className={`${styles.option} ${disabled ? styles.optionDisabled : ""}`}
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
          );
        })}
      </div>

      {savings > 0 && !compact && (
        <p className={styles.savings}>
          Ahorrás ${savings.toLocaleString("es-AR")} vs precio individual
        </p>
      )}
    </div>
  );
}