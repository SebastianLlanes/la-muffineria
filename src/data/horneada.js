/*
 * data/horneada.js
 * Horneadas: martes y viernes a las 10:00 hs.
 */

const HORNEADA_CONFIG = {
  capacidad: 12,
  productos: ['muf-001', 'muf-002', 'muf-003', 'muf-004', 'muf-005', 'muf-007'],
  mensajeCierre: 'Pedidos hasta el mediodía.',
}

const DIAS_HORNEADA = [2, 5]
const HORA_HORNEADA = 19

/*
 * getProximaHorneada
 * Primero chequea si HOY es día de horneada y todavía no llegó la hora.
 * Si ya pasó, busca el próximo día.
 */
function getProximaHorneada() {
  const now = new Date()

  // ¿Hoy es día de horneada y todavía no arrancó?
  const hoy = new Date(now)
  hoy.setHours(HORA_HORNEADA, 0, 0, 0)
  if (DIAS_HORNEADA.includes(now.getDay()) && now < hoy) {
    return hoy
  }

  // Buscar el próximo día de horneada
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
 * getHorneadaAnterior — punto de inicio del ciclo de reservas.
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
 * pseudoRandom — número estable basado en semilla diaria.
 */
function pseudoRandom(seed) {
  const x = Math.sin(seed + 1) * 43758.5453123
  return x - Math.floor(x)
}

/*
 * calcReservados — crece con el tiempo, con ruido diario impredecible.
 */
function calcReservados(ahora, anterior, proxima, capacidad) {
  const totalCiclo   = proxima - anterior
  const transcurrido = ahora   - anterior
  const progreso     = Math.max(0, Math.min(transcurrido / totalCiclo, 1))

  const base       = Math.pow(progreso, 1.6)
  const diaSemilla = Math.floor(ahora / 86400000)
  const ruido      = pseudoRandom(diaSemilla) * 0.18 - 0.09

  const min = 1
  const max = capacidad - 1
  const raw = (base + ruido) * (max - min) + min

  return Math.round(Math.min(Math.max(raw, min), max))
}

export function getHorneada() {
  const { capacidad, ...rest } = HORNEADA_CONFIG

  const ahora    = new Date()
  const proxima  = getProximaHorneada()
  const anterior = getHorneadaAnterior(proxima)

  const reservados  = calcReservados(ahora, anterior, proxima, capacidad)
  const disponibles = capacidad - reservados

  // ← Barra basada en disponibles: arranca llena, se vacía con urgencia
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