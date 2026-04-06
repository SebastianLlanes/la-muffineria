import { useState, useMemo } from 'react'
import { products, getProductsByCategory } from '@data/products'
import ProductCard from '@features/products/ProductCard/ProductCard'
import CategoryFilter from '@features/products/CategoryFilter/CategoryFilter'
import styles from './ProductGrid.module.css'

/*
 * ProductGrid — Sección completa de productos
 *
 * Incluye:
 *  - Encabezado de sección
 *  - CategoryFilter (pills horizontales)
 *  - Grilla responsive de ProductCards
 *  - Estado vacío (si el filtro no devuelve nada)
 */
export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState('todos')

  // Productos filtrados según la categoría activa
  const filtered = useMemo(
    function computeFiltered() {
      return getProductsByCategory(activeCategory)
    },
    [activeCategory]
  )

  // Cantidad por categoría para mostrar en los pills
  const counts = useMemo(
    function computeCounts() {
      return products.reduce(function(acc, product) {
        const cat = product.category
        acc[cat] = (acc[cat] || 0) + 1
        return acc
      }, {})
    },
    []
  )

  function handleCategorySelect(categoryId) {
    setActiveCategory(categoryId)
  }

  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>

        {/* ── Encabezado ── */}
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Muffins</h2>
          <p className={styles.subtitle}>
            Elaborados con harinas alternativas, ingredientes reales
            y mucho amor. Sin conservantes, sin rellenos industriales.
          </p>
        </div>

        {/* ── Filtro de categorías ── */}
        <div className={styles.filterWrapper}>
          <CategoryFilter
            activeCategory={activeCategory}
            onSelect={handleCategorySelect}
            counts={counts}
          />
        </div>

        {/* ── Grilla ── */}
        {filtered.length > 0
          ? (
            <ul className={styles.grid} aria-label="Catálogo de muffins">
              {filtered.map(function(product) {
                return (
                  <li key={product.id} className={styles.gridItem}>
                    <ProductCard product={product} />
                  </li>
                )
              })}
            </ul>
          )
          : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🧁</span>
              <p className={styles.emptyText}>
                No hay muffins en esta categoría por el momento.
              </p>
            </div>
          )
        }

        {/* ── Nota al pie ── */}
        <p className={styles.note}>
          🌿 Todos nuestros muffins se preparan a pedido. Los disponibles{' '}
          <strong>sin TACC</strong> se elaboran en ambiente diferenciado.
        </p>

      </div>
    </section>
  )
}
