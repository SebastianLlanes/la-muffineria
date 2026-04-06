import { useScrollReveal } from '@hooks/useScrollReveal'
import styles from './Contact.module.css'

/*
 * Contact — CTA de contacto y datos.
 *
 * Diseño: fondo cacao oscuro (contraste total con el resto del sitio),
 * texto crema, botón WhatsApp prominente.
 * Es la sección de conversión final.
 */

const WHATSAPP_NUMBER  = '5493482608105' // ← reemplazar con el real
const WHATSAPP_GREETING = encodeURIComponent(
  '¡Hola! Quisiera consultar sobre sus muffins 🧁'
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_GREETING}`

const INFO_ITEMS = [
  {
    icon: '📍',
    label: 'Ubicación',
    value: 'San Carlos Centro, Argentina',
  },
  {
    icon: '🕐',
    label: 'Pedidos',
    value: 'Lun a Sáb · 8:00 – 20:00',
  },
  {
    icon: '📦',
    label: 'Entrega',
    value: 'Coordinar por WhatsApp',
  },
]

export default function Contact() {
  const sectionRef = useScrollReveal({ threshold: 0.15 })

  return (
    <section id="contacto" className={styles.section}>
      <div className={styles.container}>

        {/* ── Contenido principal ── */}
        <div ref={sectionRef} className={`${styles.content} reveal`}>

          {/* Encabezado */}
          <div className={styles.header}>
            <span className={styles.tag}>Contacto</span>
            <h2 className={styles.title}>
              ¿Listo para hacer<br />
              <em className={styles.titleAccent}>tu pedido?</em>
            </h2>
            <p className={styles.subtitle}>
              Escribinos directamente por WhatsApp. Te confirmamos
              disponibilidad y coordinamos juntos la entrega.
            </p>
          </div>

          {/* CTA WhatsApp principal */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappCta}
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon />
            Escribirnos por WhatsApp
          </a>

          {/* Info items */}
          <ul className={styles.infoList} aria-label="Información de contacto">
            {INFO_ITEMS.map(function(item) {
              return (
                <li key={item.label} className={styles.infoItem}>
                  <span className={styles.infoIcon} aria-hidden="true">
                    {item.icon}
                  </span>
                  <div className={styles.infoText}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                </li>
              )
            })}
          </ul>

        </div>

        {/* ── Burbuja decorativa ── */}
        <div className={styles.bubble} aria-hidden="true">
          <div className={styles.bubbleInner}>
            <span className={styles.bubbleEmoji}>🧁</span>
            <p className={styles.bubbleText}>
              Los muffins se hacen a pedido.<br />¡Siempre frescos!
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
