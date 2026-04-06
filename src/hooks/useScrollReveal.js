import { useEffect, useRef } from 'react'

/*
 * useScrollReveal
 *
 * Agrega la clase CSS `visible` al elemento ref cuando entra
 * en el viewport. Sin librerías: usa IntersectionObserver nativo.
 *
 * Uso:
 *   const ref = useScrollReveal()
 *   <section ref={ref} className={styles.section}>
 *
 * En el CSS del componente:
 *   .section          { opacity: 0; transform: translateY(24px); transition: ... }
 *   .section.visible  { opacity: 1; transform: translateY(0); }
 *
 * Options:
 *   threshold  number   0–1, fracción del elemento visible para disparar (default: 0.15)
 *   rootMargin string   margen del viewport (default: '0px 0px -40px 0px')
 *   once       boolean  si true, deja de observar tras el primer trigger (default: true)
 */
export function useScrollReveal({
  threshold  = 0.15,
  rootMargin = '0px 0px -40px 0px',
  once       = true,
} = {}) {
  const ref = useRef(null)

  useEffect(function setupObserver() {
    const el = ref.current
    if (!el) return

    // Si el usuario prefiere no motion, aplicamos visible directamente
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible')
      return
    }

    const observer = new IntersectionObserver(
      function onIntersect(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('visible')
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)

    return function cleanup() {
      observer.unobserve(el)
    }
  }, [threshold, rootMargin, once])

  return ref
}
