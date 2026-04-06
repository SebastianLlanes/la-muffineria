import { CATEGORIES } from '@data/products'
import styles from './CategoryFilter.module.css'

/*
 * CategoryFilter
 *
 * Props:
 *   activeCategory  string  — id de la categoría activa
 *   onSelect        fn      — callback(categoryId)
 *   counts          object  — { categoryId: cantidad } para mostrar totales
 */
export default function CategoryFilter({ activeCategory, onSelect, counts = {} }) {
  return (
    <div className={styles.wrapper} role="tablist" aria-label="Filtrar por categoría">
      <div className={styles.track}>
        {CATEGORIES.map(function(cat) {
          const isActive = cat.id === activeCategory
          const count    = cat.id === 'todos'
            ? Object.values(counts).reduce(function(a, b) { return a + b }, 0)
            : counts[cat.id] || 0

          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              className={`${styles.pill} ${isActive ? styles.pillActive : ''}`}
              onClick={function() { onSelect(cat.id) }}
            >
              {cat.label}
              {count > 0 && (
                <span className={`${styles.count} ${isActive ? styles.countActive : ''}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
