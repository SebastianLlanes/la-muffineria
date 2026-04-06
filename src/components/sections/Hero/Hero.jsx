import IconMuffin from '../../../assets/icons/iconmuffin.png'
import styles from './Hero.module.css'

/*
 * Hero — primera sección, full viewport height.
 *
 * Sin imágenes: usa formas CSS con la paleta de la marca.
 * El fondo crema con círculos decorativos da calidez artesanal
 * sin depender de assets externos.
 *
 * Props:
 *   onShopClick  fn  — scroll a #productos (opcional, sino usa el anchor)
 */
export default function Hero({ onShopClick }) {
  function handleShopClick(e) {
    e.preventDefault()
    if (onShopClick) {
      onShopClick()
    } else {
      document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className={styles.hero} aria-label="Bienvenidos a La Muffinería">

      {/* ── Formas decorativas de fondo ── */}
      <div className={styles.shapes} aria-hidden="true">
        <div className={`${styles.shape} ${styles.shapeOliva}`}  />
        <div className={`${styles.shape} ${styles.shapeRosa}`}   />
        <div className={`${styles.shape} ${styles.shapeTrigo}`}  />
        <div className={`${styles.shape} ${styles.shapeCacao}`}  />
      </div>

      {/* ── Contenido ── */}
      <div className={styles.content}>

        {/* Eyebrow — categoría / descriptor */}
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          Muffins artesanales · San Carlos Centro, Argentina
        </p>

        {/* Heading principal */}
        <h1 className={styles.heading}>
          Horneados con{' '}
          <em className={styles.headingAccent}>harinas alternativas</em>{' '}
          y un sabor único
        </h1>

        {/* Catchphrase oficial */}
        <p className={styles.catchphrase}>
          De otra semilla. Del mismo amor.
        </p>

        {/* Highlights de propuesta de valor */}
        <ul className={styles.highlights} aria-label="Destacados">
          <li className={styles.highlight}>
            <span className={styles.highlightIcon} aria-hidden="true">🌾</span>
            Sin harinas refinadas
          </li>
          <li className={styles.highlight}>
            <span className={styles.highlightIcon} aria-hidden="true">🚫</span>
            Sin conservantes
          </li>
          <li className={styles.highlight}>
            <span className={styles.highlightIcon} aria-hidden="true">✅</span>
            Opción sin TACC
          </li>
        </ul>

        {/* CTAs */}
        <div className={styles.actions}>
          <a
            href="#productos"
            className={styles.ctaPrimary}
            onClick={handleShopClick}
          >
            Ver productos
          </a>
          <a href="#nosotros" className={styles.ctaSecondary}>
            Conocernos
          </a>
        </div>

      </div>

      {/* ── Visual decorativo (muffin estilizado con CSS) ── */}
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.muffinWrapper}>
          <div className={styles.muffinEmoji}>
            <img src={IconMuffin} alt="" aria-hidden="true" />
            </div>
          <div className={styles.muffinGlow} />
        </div>

        {/* Tarjetitas flotantes */}
        <div className={`${styles.floatCard} ${styles.floatCardTop}`}>
          <span className={styles.floatCardIcon}>🌿</span>
          <span className={styles.floatCardText}>100% natural</span>
        </div>
        <div className={`${styles.floatCard} ${styles.floatCardBottom}`}>
          <span className={styles.floatCardIcon}>💚</span>
          <span className={styles.floatCardText}>Pedido por WhatsApp</span>
        </div>
      </div>

      {/* ── Indicador de scroll ── */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollDot} />
      </div>

    </section>
  )
}
