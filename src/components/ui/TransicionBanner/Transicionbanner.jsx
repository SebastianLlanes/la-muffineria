import { useState } from 'react'
import styles from './TransicionBanner.module.css'

/*
 * TransicionBanner
 * Comunica el cambio al horneado solo los viernes.
 * Se muestra desde hoy hasta EXPIRA (inclusive).
 * Pasada esa fecha desaparece solo, sin tocar código.
 */

const INICIO  = new Date('2026-06-12T00:00:00') // primer viernes del nuevo sistema
const EXPIRA  = new Date('2026-07-11T23:59:59') // después del 3er viernes, se va solo

export default function TransicionBanner() {
  const [cerrado, setCerrado] = useState(false)

  const ahora = new Date()
  if (ahora < INICIO || ahora > EXPIRA || cerrado) return null

  return (
    <div className={styles.banner} role="status" aria-live="polite">
      <div className={styles.inner}>
        <span className={styles.icon} aria-hidden="true">🔥</span>
        <p className={styles.texto}>
          <strong>A partir del viernes 20 de junio, horneamos solo los viernes.</strong>
          {' '}Organizá tu pedido antes del jueves al mediodía.
        </p>
        <button
          className={styles.cerrar}
          onClick={() => setCerrado(true)}
          aria-label="Cerrar aviso"
        >
          ✕
        </button>
      </div>
    </div>
  )
}