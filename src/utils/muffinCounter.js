// --- Configuración ---
const BASE_COUNT = 2286; // conteo real al momento de EPOCH
const EPOCH = new Date('2026-08-16T00:00:00-03:00'); 

// Peso relativo de cada hora del día (0-23). Mismo patrón los 7 días
// (no se pondera por día de la semana). AJUSTABLE — ver nota abajo.
const HOURLY_WEIGHTS = [
  0,   0,   0,   0,   0,   0,   0,   0,   // 00-07h madrugada (sin actividad)
  1.5, 2.5, 3,   3,   2.5, 1.8,           // 08-13h pico mañana/mediodía
  1.2, 1.2, 1.5,                          // 14-16h tarde tranquila
  2.5, 3,   3,   2.5, 1.8,                // 17-21h pico tarde/noche
  1,   0.5,                               // 22-23h cierre
];

const MS_PER_HOUR = 3600 * 1000;
const MS_PER_WEEK = 7 * 24 * MS_PER_HOUR;

// PRNG determinístico (mulberry32) — misma semilla = misma secuencia siempre
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Semilla estable a partir del índice de semana (evita sesgos de semillas secuenciales)
function seedForWeek(weekIndex) {
  let h = 2166136261 ^ weekIndex;
  h = Math.imul(h, 16777619);
  h ^= h >>> 13;
  return h >>> 0;
}

// Total "horneado" esa semana (180-210), determinístico
function weeklyTotalForWeek(weekIndex) {
  const rand = mulberry32(seedForWeek(weekIndex));
  return 150 + Math.floor(rand() * 31); // 31 valores: 150..180
}

const WEEK_TOTAL_WEIGHT = HOURLY_WEIGHTS.reduce((a, b) => a + b, 0) * 7;

// Fracción [0-1] de la semana ya "transcurrida" en términos ponderados
function weightedFractionElapsed(msIntoWeek) {
  const hoursIntoWeek = msIntoWeek / MS_PER_HOUR;
  const fullHours = Math.floor(hoursIntoWeek);
  const partialHour = hoursIntoWeek - fullHours;

  let accumulated = 0;
  for (let h = 0; h < fullHours; h++) {
    accumulated += HOURLY_WEIGHTS[h % 24];
  }
  accumulated += HOURLY_WEIGHTS[fullHours % 24] * partialHour;

  return accumulated / WEEK_TOTAL_WEIGHT;
}

/**
 * Conteo acumulado de muffins horneados hasta `now`.
 * Función pura: mismo `now` => mismo resultado para cualquier visitante,
 * sin backend ni estado compartido.
 */
export function getMuffinCount(now = new Date()) {
  if (now < EPOCH) return BASE_COUNT;

  const elapsedMs = now - EPOCH;
  const weekIndex = Math.floor(elapsedMs / MS_PER_WEEK);
  const msIntoCurrentWeek = elapsedMs % MS_PER_WEEK;

  let total = BASE_COUNT;

  for (let w = 0; w < weekIndex; w++) {
    total += weeklyTotalForWeek(w); // semanas ya completas, enteras
  }

  const currentWeekTotal = weeklyTotalForWeek(weekIndex);
  total += Math.round(currentWeekTotal * weightedFractionElapsed(msIntoCurrentWeek));

  return total;
}