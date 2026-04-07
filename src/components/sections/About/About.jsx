import { useScrollReveal } from '@hooks/useScrollReveal'
import styles from './About.module.css'

/*
 * About — Historia y valores de La Muffinería.
 *
 * Estructura:
 *   - Encabezado con historia breve
 *   - 3 cards de valores
 *   - Frase de cierre
 */

const VALUES = [
  {
    icon: '🌾',
    title: 'Harinas alternativas',
    description:
      'Trabajamos con harina de avena, arroz, almendra, garbanzo y más. Sin trigo refinado, sin vacíos nutricionales.',
  },
  {
    icon: '🏠',
    title: 'Hecho en casa',
    description:
      'Producción artesanal en pequeños lotes. Cada muffin se prepara a pedido para garantizar frescura real.',
  },
  {
    icon: '💛',
    title: 'Del mismo amor',
    description:
      'Un emprendimiento familiar que nació del disfrute de comer bien sin resignar sabor. La receta incluye amor, siempre.',
  },
]

export default function About() {
  const sectionRef  = useScrollReveal({ threshold: 0.1 })
  const headerRef   = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.container}>
        {/* ── Encabezado ── */}
        <div ref={headerRef} className={`${styles.header} reveal`}>
          <span className={styles.tag}>Nuestra historia</span>
          <h2 className={styles.title}>
            Comer rico <em>y</em> comer bien
            <br />
            no son opuestos
          </h2>
          <p className={styles.story}>
            La Muffinería nació en San Carlos Centro de una idea simple: ¿por
            qué los productos saludables tienen que ser aburridos? Empezamos
            experimentando en casa con harinas alternativas, buscando texturas y
            sabores que de verdad enamoren. Lo que empezó como un hobby se
            convirtió en un pequeño gran proyecto familiar.
          </p>
          <p className={styles.story}>
            Hoy horneamos por encargo, con ingredientes reales, sin conservantes
            ni rellenos industriales. Cada muffin cuenta una historia — y la
            mayoría termina muy rápido.
          </p>
        </div>

        {/* ── Mapa + origen ── */}
        <div className={styles.mapBlock}>
          <div className={styles.mapImageWrapper}>
            <img
              src="/images/an-carlos-centro.png"
              alt="Mapa de San Carlos Centro, Santa Fe — origen de La Muffinería"
              className={styles.mapImage}
              loading="lazy"
            />
          </div>
          <div className={styles.mapCaption}>
            <span className={styles.mapPin} aria-hidden="true">
              📍
            </span>
            <div>
              <p className={styles.mapTitle}>Origen del ingenio nutricional.</p>
              <p className={styles.mapSubtitle}>
                Elaborado en casa, con amor local.
              </p>
            </div>
          </div>
        </div>

        {/* ── Cards de valores ── */}
        <ul
          ref={sectionRef}
          className={`${styles.values} reveal`}
          aria-label="Nuestros valores"
        >
          {VALUES.map(function (value, index) {
            return (
              <li
                key={value.title}
                className={styles.valueCard}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={styles.valueIcon} aria-hidden="true">
                  {value.icon}
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </li>
            );
          })}
        </ul>

        {/* ── Cierre ── */}
        <div className={styles.closing}>
          <div className={styles.closingLine} aria-hidden="true" />
          <p className={styles.closingText}>
            <em>De otra semilla. Del mismo amor.</em>
          </p>
          <div className={styles.closingLine} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
