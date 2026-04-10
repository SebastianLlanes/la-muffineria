import styles from './BoxSlot.module.css'

export function BoxSlot({ item, index, onRemove, onAdd }) {
  const isEmpty = item === null

  if (isEmpty) {
    return (
      <button
        className={`${styles.slot} ${styles.empty}`}
        style={{ animationDelay: `${index * 60}ms` }}
        onClick={onAdd}
        aria-label="Agregar muffin"
      >
        <span className={styles.addIcon}>+</span>
        <span className={styles.addLabel}>Elegir</span>
      </button>
    )
  }

  return (
    <div
      className={`${styles.slot} ${styles.filled}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <img
        src={item.image}
        alt={item.name}
        className={styles.image}
      />
      <span className={styles.name}>{item.name}</span>
      <button
        className={styles.removeBtn}
        onClick={() => onRemove(item.id)}
        aria-label={`Quitar ${item.name}`}
      >
        ✕
      </button>
    </div>
  )
}