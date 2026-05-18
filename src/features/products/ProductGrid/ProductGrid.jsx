import { useMemo } from 'react'
import { products } from '@data/products'
import ProductCard from '@features/products/ProductCard/ProductCard'
import styles from './ProductGrid.module.css'

export default function ProductGrid() {

  const proximamente = useMemo(function() {
    return products.filter(function(p) { return p.proximamente })
  }, [])

  const disponibles = useMemo(function() {
    return products.filter(function(p) { return p.available && !p.proximamente })
  }, [])

  const noDisponibles = useMemo(function() {
    return products.filter(function(p) { return !p.available && !p.proximamente })
  }, [])

  return (
    <section id="productos" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Muffins</h2>
          <p className={styles.subtitle}>
            Elaborados con harinas alternativas, ingredientes reales
            y mucho amor. Sin conservantes, sin rellenos industriales.
          </p>
        </div>

        <ul className={styles.grid} aria-label="Catálogo de muffins">
          {proximamente.map(function(product) {
            return (
              <li key={product.id} className={styles.gridItem}>
                <ProductCard product={product} />
              </li>
            )
          })}
          {disponibles.map(function(product) {
            return (
              <li key={product.id} className={styles.gridItem}>
                <ProductCard product={product} />
              </li>
            )
          })}
          {noDisponibles.map(function(product) {
            return (
              <li key={product.id} className={styles.gridItem}>
                <ProductCard product={product} />
              </li>
            )
          })}
        </ul>

        <p className={styles.note}>
          🌿 Todos nuestros muffins se preparan a pedido. Los disponibles{' '}
          <strong>sin TACC</strong> se elaboran en ambiente diferenciado.
        </p>

      </div>
    </section>
  )
}
