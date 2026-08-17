import { useState, useEffect, useRef, useCallback } from 'react';
import { getMuffinCount } from '../utils/muffinCounter';

const POLL_INTERVAL_MS = 20 * 1000;      // cada cuánto chequea si subió el número
const VISIBLE_DURATION_MS = 30 * 1000;   // cuánto dura visible por aparición
const REST_MIN_MS = 90 * 1000;           // descanso mínimo entre apariciones
const REST_MAX_MS = 120 * 1000;          // descanso máximo entre apariciones
const BUMP_ANIM_MS = 1000;                // duración del pulso + conteo animado

function randomRest() {
  return REST_MIN_MS + Math.random() * (REST_MAX_MS - REST_MIN_MS);
}

export function useMuffinCounter() {
  const [count, setCount] = useState(() => getMuffinCount());
  const [displayCount, setDisplayCount] = useState(count);
  const [visible, setVisible] = useState(false);
  const [bumping, setBumping] = useState(false);

  const countRef = useRef(count);
  const displayCountRef = useRef(count);
  const visibleTimer = useRef(null);
  const restTimer = useRef(null);
  const bumpTimer = useRef(null);

  const scheduleHide = useCallback(() => {
    clearTimeout(visibleTimer.current);
    visibleTimer.current = setTimeout(() => {
      setVisible(false);
      restTimer.current = setTimeout(() => setVisible(true), randomRest());
    }, VISIBLE_DURATION_MS);
  }, []);

  // Lógica compartida: aplicar un nuevo count y disparar la animación correspondiente.
  // La usa tanto el polling real como el helper de debug.
  const bumpTo = useCallback((newCount) => {
    countRef.current = newCount;
    setCount(newCount);
    setBumping(true);
    clearTimeout(bumpTimer.current);
    bumpTimer.current = setTimeout(() => setBumping(false), BUMP_ANIM_MS);

    setVisible((wasVisible) => {
      if (!wasVisible) {
        clearTimeout(restTimer.current); // interrumpe el descanso, reaparece ya
        return true;
      }
      scheduleHide(); // ya estaba visible: le da otro ciclo completo
      return true;
    });
  }, [scheduleHide]);

  // Primera aparición al montar
  useEffect(() => {
    setVisible(true);
    return () => {
      clearTimeout(visibleTimer.current);
      clearTimeout(restTimer.current);
      clearTimeout(bumpTimer.current);
    };
  }, []);

  useEffect(() => {
    if (visible) scheduleHide();
  }, [visible, scheduleHide]);

  // Odómetro: anima displayCount hacia count cada vez que count cambia
  useEffect(() => {
    const from = displayCountRef.current;
    const to = count;
    if (from === to) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / BUMP_ANIM_MS, 1);
      const value = Math.round(from + (to - from) * t);
      displayCountRef.current = value;
      setDisplayCount(value);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  // Polling del contador real
  useEffect(() => {
    const interval = setInterval(() => {
      const newCount = getMuffinCount();
      if (newCount > countRef.current) bumpTo(newCount);
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [bumpTo]);

//   // Solo en dev: helper de consola para forzar un bump y probar el efecto sin esperar.
//   useEffect(() => {
//     if (!import.meta.env.DEV) return;
//     window.__debugMuffinBump = () => bumpTo(countRef.current + 1 + Math.floor(Math.random() * 4));
//     return () => { delete window.__debugMuffinBump; };
//   }, [bumpTo]);

  return { count: displayCount, visible, bumping };
}