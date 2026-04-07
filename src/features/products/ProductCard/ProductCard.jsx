import { useState } from 'react'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatPrice'
import styles from './ProductCard.module.css'

/*
 * ProductCard
 *
 * Props:
 *   product  object  — item del catálogo (ver data/products.js)
 *
 * Muestra: imagen, nombre, descripción, precio, variante sin TACC,
 * tags, botón "agregar al carrito" con feedback visual.
 */
export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded]           = useState(false)
  const [glutenFree, setGlutenFree] = useState(false)

  const currentPrice = glutenFree && product.priceGlutenFree
    ? product.priceGlutenFree
    : product.price

  function handleAdd() {
    if (!product.available || added) return

    const itemToAdd = {
      ...product,
      // Si eligió sin TACC, sobrescribimos id y precio para distinguirlo en el carrito
      id:    glutenFree ? `${product.id}-gf` : product.id,
      name:  glutenFree ? `${product.name} (Sin TACC)` : product.name,
      price: currentPrice,
    }

    addItem(itemToAdd)

    // Feedback visual: "¡Agregado!" por 1.5s
    setAdded(true)
    setTimeout(function resetAdded() { setAdded(false) }, 1500)
  }

  const hasGlutenFreeOption = Boolean(product.priceGlutenFree)
  const isSinTacc = product.tags.includes('sin-gluten')

  return (
    <article
      className={`${styles.card} ${!product.available ? styles.unavailable : ""}`}
      aria-label={`Muffin ${product.name}`}
    >
      {/* ── Imagen ── */}
      <div className={styles.imageWrapper}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
          onError={function handleImgError(e) {
            e.currentTarget.src = "/images/placeholder-muffin.jpg";
          }}
        />

        {/* Chip "Sin stock" */}
        {!product.available && (
          <div className={styles.chipUnavailable}>Sin stock</div>
        )}

        {/* Chip "Especial temporada" */}
        {product.tags.includes("especial-temporada") && product.available && (
          <div className={styles.chipSpecial}>🌿 Temporada</div>
        )}
      </div>

      {/* ── Contenido ── */}
      <div className={styles.body}>
        {/* Nombre */}
        <h3 className={styles.name}>{product.name}</h3>

        {/* Descripción */}
        <p className={styles.description}>{product.description}</p>

        {/* Tags relevantes */}
        <div className={styles.tags}>
          {isSinTacc && (
            <span className={`${styles.tag} ${styles.tagGlutenFree}`}>
              Sin TACC
            </span>
          )}
          {product.tags.includes("sin-gluten-disponible") && (
            <span className={`${styles.tag} ${styles.tagGlutenAvail}`}>
              Sin TACC disponible
            </span>
          )}
          {product.tags.includes("vegano") && (
            <span className={`${styles.tag} ${styles.tagVegan}`}>Vegano</span>
          )}
          {product.tags.includes("sin-azucar-refinada") && (
            <span className={`${styles.tag} ${styles.tagSugar}`}>
              Sin azúcar ref.
            </span>
          )}
          {product.tags.includes("harina-de-almendras") && (
            <span className={`${styles.tag} ${styles.tagAlmond}`}>
              Harina de almendras
            </span>
          )}
          {product.tags.includes("alto-proteico") && (
            <span className={`${styles.tag} ${styles.tagProtein}`}>
              Alto en proteína
            </span>
          )}
        </div>

        {/* Selector sin TACC (si tiene opción) */}
        {hasGlutenFreeOption && (
          <div className={styles.glutenToggle}>
            <button
              className={`${styles.toggleBtn} ${!glutenFree ? styles.toggleActive : ""}`}
              onClick={function () {
                setGlutenFree(false);
              }}
              aria-pressed={!glutenFree}
            >
              Estándar
            </button>
            <button
              className={`${styles.toggleBtn} ${glutenFree ? styles.toggleActive : ""}`}
              onClick={function () {
                setGlutenFree(true);
              }}
              aria-pressed={glutenFree}
            >
              Sin TACC
            </button>
          </div>
        )}

        {/* Footer: precio + botón */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{formatPrice(currentPrice)}</span>
            {glutenFree && (
              <span className={styles.priceBase}>
                Base: {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            className={`${styles.addButton} ${added ? styles.addButtonSuccess : ""}`}
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {!product.available ? (
              "Sin stock"
            ) : added ? (
              <>
                <CheckIcon /> Agregado
              </>
            ) : (
              <>
                <PlusIcon /> Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
