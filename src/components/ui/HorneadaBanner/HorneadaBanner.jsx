import { useHorneada } from '@hooks/useHorneada'
import styles from './HorneadaBanner.module.css'

export default function HorneadaBanner() {
  const { horneada, countdown } = useHorneada()

  function pad(n) { return String(n).padStart(2, '0') }

  const diasLabel = [
    'domingo', 'lunes', 'martes',
    'miércoles', 'jueves', 'viernes', 'sábado'
  ]

  const fechaProxima   = new Date(horneada.fechaProxima)
  const diaHorneada    = diasLabel[fechaProxima.getDay()]
  const horaHorneada   = `${fechaProxima.getHours()}:00`

  return (
    <div className={`${styles.banner} ${horneada.urgente ? styles.urgente : ''}`}>

      {/* ── Header ── */}
      <div className={styles.header}>
        <span className={styles.fireIcon} aria-hidden="true">🔥</span>
        <div className={styles.headerText}>
          <p className={styles.title}>
            Próxima horneada — {diaHorneada} {horaHorneada}
          </p>
          <p className={styles.cierre}>{horneada.mensajeCierre}</p>
        </div>
      </div>

      {/* ── Countdown ── */}
      {countdown.vencido
        ? (
          <div className={styles.enCurso}>
            🔥 ¡Horneada en curso!
          </div>
        )
        : (
          <div className={styles.countdown} aria-live="polite">

            {/* Días — solo si quedan */}
            {countdown.dias > 0 && (
              <div className={styles.unit}>
                <span className={styles.unitValue}>{countdown.dias}</span>
                <span className={styles.unitLabel}>días</span>
              </div>
            )}

            {/* Horas */}
            <div className={styles.unit}>
              <span className={styles.unitValue}>{pad(countdown.horas)}</span>
              <span className={styles.unitLabel}>hs</span>
            </div>

            {/* Separador */}
            <span className={styles.sep}>:</span>

            {/* Minutos */}
            <div className={styles.unit}>
              <span className={styles.unitValue}>{pad(countdown.minutos)}</span>
              <span className={styles.unitLabel}>min</span>
            </div>

            {/* Separador */}
            <span className={styles.sep}>:</span>

            {/* Segundos — el que "late" */}
            <div className={`${styles.unit} ${styles.unitSeconds}`}>
              <span
                className={styles.unitValue}
                key={countdown.segundos}
              >
                {pad(countdown.segundos)}
              </span>
              <span className={styles.unitLabel}>seg</span>
            </div>

          </div>
        )
      }

      {/* ── Barra de progreso ── */}
      <div className={styles.progressSection}>
        <div
          className={styles.progressBar}
          role="progressbar"
          aria-valuenow={horneada.reservados}
          aria-valuemin={0}
          aria-valuemax={horneada.capacidad}
        >
          <div
            className={styles.progressFill}
            style={{ width: `${horneada.porcentaje}%` }}
          />
        </div>
        <p className={styles.progressLabel}>
          <strong className={horneada.urgente ? styles.urgentText : ''}>
            {horneada.disponibles === 1
              ? '¡Queda 1 lugar!'
              : `Quedan ${horneada.disponibles} lugares`}
          </strong>
          {' '}de {horneada.capacidad}
        </p>
      </div>

    </div>
  )
}