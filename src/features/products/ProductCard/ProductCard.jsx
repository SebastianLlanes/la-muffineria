import { useState } from 'react'
import { useCart } from '@hooks/useCart'
import { formatPrice } from '@utils/formatPrice'
import { isEnHorneada } from '@data/horneada'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }) {
  const { addItem, precios } = useCart()
  const [size, setSize]   = useState('grande')
  const [added, setAdded] = useState(false)
  const enHorneada = isEnHorneada(product.id)

  // ── Modo "Próximamente" — render simplificado, sin lógica de carrito ──────
  if (product.proximamente) {
    return (
      <article
        className={`${styles.card} ${styles.cardProximamente}`}
        aria-label={`Próximamente: nuevo muffin`}
      >
        {/* Imagen blureada */}
        <div className={styles.imageWrapper}>
          <img
            src={product.image}
            alt="Nuevo producto próximamente"
            className={`${styles.image} ${styles.imageBlurred}`}
            loading="lazy"
          />
          {/* Overlay con ícono */}
          <div className={styles.proximamenteOverlay} aria-hidden="true">
            <LockIcon />
          </div>
          {/* Chips */}
          <div className={styles.chipsStack}>
            <div className={styles.chipProximamente}>✨ Próximamente</div>
            <div className={styles.chipSecretoPill}>🤫 Algo nuevo</div>
          </div>
        </div>

        {/* Contenido */}
        <div className={styles.body}>
          <h3 className={`${styles.name} ${styles.nameProximamente}`}>
            {product.name}
          </h3>
          <p className={`${styles.description} ${styles.teaserText}`}>
            {product.teaserText}
          </p>

          {/* Footer teaser — sin precio, sin botón de agregar */}
          <div className={styles.teaserFooter}>
            <span className={styles.teaserLabel}>Muy pronto en La Muffinería</span>
            <div className={styles.teaserDots} aria-hidden="true">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </article>
    )
  }

  // ── Card normal ───────────────────────────────────────────────────────────

  const SIZE_CONFIG = {
    grande:  {
      normalPrice:   precios.precioNormalGrande,
      discountPrice: precios.precioDescuentoGrande,
      grams: '160g'
    },
    mediano: {
      normalPrice:   precios.precioNormalMediano,
      discountPrice: precios.precioDescuentoMediano,
      grams: '90g'
    },
  }

  const config = SIZE_CONFIG[size]

  function handleAdd() {
    if (!product.available || added) return
    addItem({
      ...product,
      id:            `${product.id}-${size}`,
      productId:     product.id,
      size,
      normalPrice:   config.normalPrice,
      discountPrice: config.discountPrice,
      price:         config.normalPrice,
    })
    setAdded(true)
    setTimeout(function resetAdded() { setAdded(false) }, 1500)
  }

  return (
    <article
      className={`${styles.card} ${!product.available ? styles.unavailable : ''}`}
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
            e.currentTarget.src = '/images/placeholder-muffin.jpg'
          }}
        />
        <div className={styles.chipsStack}>
          {!product.available && (
            <div className={styles.chipUnavailable}>Sin stock</div>
          )}
          {enHorneada && product.available && (
            <div className={styles.chipHorneada}>🔥 En esta horneada</div>
          )}
          {product.tags.includes('especial-temporada') && product.available && (
            <div className={styles.chipSpecial}>🌿 Temporada</div>
          )}
          {product.tags.includes('novedad') && product.available && (
            <div className={styles.chipNew}>🆕 Novedad</div>
          )}
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className={styles.body}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {product.tags.includes('vegano') && (
            <span className={`${styles.tag} ${styles.tagVegan}`}>Vegano</span>
          )}
          {product.tags.includes('sin-azucar-refinada') && (
            <span className={`${styles.tag} ${styles.tagSugar}`}>Sin azúcar ref.</span>
          )}
          {product.tags.includes('harina-de-almendras') && (
            <span className={`${styles.tag} ${styles.tagAlmond}`}>Harina de almendras</span>
          )}
          {product.tags.includes('alto-proteico') && (
            <span className={`${styles.tag} ${styles.tagProtein}`}>Alto en proteína</span>
          )}
          {product.tags.includes('base-legumbres') && (
            <span className={`${styles.tag} ${styles.tagLegumes}`}>Base de legumbres</span>
          )}
          {product.tags.includes('sin-gluten') && (
            <span className={`${styles.tag} ${styles.tagSinGluten}`}>Sin gluten</span>
          )}
          {product.tags.includes('almendras') && (
            <span className={`${styles.tag} ${styles.tagAlmendras}`}>Almendras</span>
          )}
        </div>

        {/* Toggle de tamaño */}
        <div className={styles.sizeToggle} role="group" aria-label="Tamaño del muffin">
          {Object.entries(SIZE_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              className={`${styles.sizeBtn} ${size === key ? styles.sizeBtnActive : ''}`}
              onClick={() => setSize(key)}
              aria-pressed={size === key}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              <span className={styles.sizeGrams}>{cfg.grams}</span>
            </button>
          ))}
        </div>

        {/* Footer: precio + botón */}
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.price}>{formatPrice(config.normalPrice)}</span>
          </div>
          <button
            className={`${styles.addButton} ${added ? styles.addButtonSuccess : ''}`}
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {!product.available ? (
              'Sin stock'
            ) : added ? (
              <><CheckIcon /> Agregado</>
            ) : (
              <><PlusIcon /> Agregar</>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

// ── Íconos ───────────────────────────────────────────────────────────────────

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

function LockIcon() {
  return (
    <svg
      width="40" height="40" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
