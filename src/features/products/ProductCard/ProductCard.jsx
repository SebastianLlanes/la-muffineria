import { useState } from 'react'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatPrice'
import { isEnHorneada } from '@data/horneada'
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
  const [added, setAdded] = useState(false)
  const enHorneada = isEnHorneada(product.id)

  function handleAdd() {
    if (!product.available || added) return

   const itemToAdd = {
      ...product,
      price: product.price,
    }

    addItem(itemToAdd)

    // Feedback visual: "¡Agregado!" por 1.5s
    setAdded(true)
    setTimeout(function resetAdded() { setAdded(false) }, 1500)
  }

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

        {/* Stack de chips sobre la imagen */}
        <div className={styles.chipsStack}>
          {!product.available && (
            <div className={styles.chipUnavailable}>Sin stock</div>
          )}
          {enHorneada && product.available && (
            <div className={styles.chipHorneada}>🔥 En esta horneada</div>
          )}
          {product.tags.includes("especial-temporada") && product.available && (
            <div className={styles.chipSpecial}>🌿 Temporada</div>
          )}
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className={styles.body}>
        {/* Nombre */}
        <h3 className={styles.name}>{product.name}</h3>

        {/* Descripción */}
        <p className={styles.description}>{product.description}</p>

        {/* Tags relevantes */}
        <div className={styles.tags}>
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
          {product.tags.includes('base-legumbres') && (
            <span className={`${styles.tag} ${styles.tagLegumes}`}>Base de legumbres</span>
          )}
          {product.tags.includes('sin-gluten') && (
            <span className={`${styles.tag} ${styles.tagSinGluten}`}>Sin gluten</span>
          )}
        </div>


        {/* Footer: precio + botón */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
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
