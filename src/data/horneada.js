/*
 * data/horneada.js
 * Horneadas: martes y viernes a las 10:00 hs.
 */

const HORNEADA_CONFIG = {
  capacidad: 12,
  productos: ['muf-001', 'muf-002', 'muf-004', 'muf-005', 'muf-007'],
  mensajeCierre: 'Pedidos hasta el día anterior a las 20 hs.',
}

const DIAS_HORNEADA = [2, 5]
const HORA_HORNEADA = 10

/*
 * getProximaHorneada — próximo martes o viernes a las 10 hs.
 */
function getProximaHorneada() {
  const now = new Date()
  for (let i = 1; i <= 7; i++) {
    const candidate = new Date(now)
    candidate.setDate(now.getDate() + i)
    candidate.setHours(HORA_HORNEADA, 0, 0, 0)
    if (DIAS_HORNEADA.includes(candidate.getDay())) {
      return candidate
    }
  }
}

/*
 * getHorneadaAnterior — el martes/viernes anterior al próximo.
 * Es el punto de partida del ciclo de reservas.
 */
function getHorneadaAnterior(proxima) {
  for (let i = 1; i <= 7; i++) {
    const candidate = new Date(proxima)
    candidate.setDate(proxima.getDate() - i)
    candidate.setHours(HORA_HORNEADA, 0, 0, 0)
    if (DIAS_HORNEADA.includes(candidate.getDay())) {
      return candidate
    }
  }
}

/*
 * pseudoRandom — número pseudoaleatorio estable basado en una semilla.
 * Misma semilla = mismo número siempre. Sin Math.random().
 * Devuelve un float entre 0 y 1.
 */
function pseudoRandom(seed) {
  const x = Math.sin(seed + 1) * 43758.5453123
  return x - Math.floor(x)
}

/*
 * calcReservados
 *
 * Lógica:
 *   - Calcula qué % del tiempo del ciclo ya pasó (0% = recién abrió, 100% = ya cerró)
 *   - Mapea ese % a reservados entre min=1 y max=capacidad-1
 *   - Agrega ruido diario: cada día tiene un "extra" diferente e impredecible
 *   - El resultado se clampea siempre entre 1 y capacidad-1
 */
function calcReservados(ahora, anterior, proxima, capacidad) {
  const totalCiclo   = proxima - anterior
  const transcurrido = ahora   - anterior
  const progreso     = Math.max(0, Math.min(transcurrido / totalCiclo, 1))

  // Base: crece exponencialmente — lento al principio, rápido al final
  const base = Math.pow(progreso, 1.6)

  // Ruido diario: semilla basada en el día actual (estable en el mismo día)
  const diaSemilla  = Math.floor(ahora / 86400000) // día en ms
  const ruido       = pseudoRandom(diaSemilla) * 0.18 - 0.09 // ±9%

  // Reservados = base + ruido, mapeado al rango [1, capacidad-1]
  const min = 1
  const max = capacidad - 1
  const raw = (base + ruido) * (max - min) + min

  return Math.round(Math.min(Math.max(raw, min), max))
}

function clampReservados(reservados, capacidad) {
  return Math.min(Math.max(reservados, 1), capacidad - 1)
}

export function getHorneada() {
  const { capacidad, ...rest } = HORNEADA_CONFIG

  const ahora    = new Date()
  const proxima  = getProximaHorneada()
  const anterior = getHorneadaAnterior(proxima)

  const reservados  = calcReservados(ahora, anterior, proxima, capacidad)
  const disponibles = capacidad - reservados
  const porcentaje  = Math.round((reservados / capacidad) * 100)

  return {
    ...rest,
    capacidad,
    reservados,
    disponibles,
    porcentaje,
    fechaProxima: proxima.toISOString(),
    urgente: disponibles <= Math.ceil(capacidad * 0.25),
  }
}

export function isEnHorneada(productId) {
  return HORNEADA_CONFIG.productos.includes(productId)
}