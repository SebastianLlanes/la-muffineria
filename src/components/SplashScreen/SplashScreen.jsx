import { useEffect, useRef } from 'react'
import styles from './SplashScreen.module.css'

export default function SplashScreen({ onComplete }) {
  const domeRef = useRef(null)
  const wrapRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const dot1Ref = useRef(null)
  const dot2Ref = useRef(null)
  const dot3Ref = useRef(null)
  const dot4Ref = useRef(null)
  const introRef = useRef(null)
  const fnameRef = useRef(null)
  const lnameRef = useRef(null)
  const badgeRef = useRef(null)
  const dividerRef = useRef(null)
  const brandRef = useRef(null)
  const splashRef = useRef(null)
  const pbarRef = useRef(null)

  useEffect(() => {
    const timers = []
    const T = (ms, fn) => timers.push(setTimeout(fn, ms))

    const dome = domeRef.current
    const wrap = wrapRef.current
    dome.style.strokeDasharray = '360'
    dome.style.strokeDashoffset = '360'
    wrap.style.strokeDasharray = '420'
    wrap.style.strokeDashoffset = '420'

    T(40, () => {
      const pb = pbarRef.current
      pb.style.transition = 'width 4.0s linear'
      pb.style.width = '100%'
    })
    T(50, () => {
      dome.style.transition = 'stroke-dashoffset 1.35s ease-out'
      dome.style.strokeDashoffset = '0'
    })
    T(400, () => {
      wrap.style.transition = 'stroke-dashoffset 1.05s ease-out'
      wrap.style.strokeDashoffset = '0'
    })
    T(700, () => {
      ;[line1Ref, line2Ref, line3Ref].forEach((ref, i) => {
        setTimeout(() => {
          ref.current.style.transition = 'opacity 0.4s ease'
          ref.current.style.opacity = '0.45'
        }, i * 90)
      })
    })
    T(900, () => {
      introRef.current.style.transition = 'opacity 0.7s ease'
      introRef.current.style.opacity = '1'
    })
    T(1020, () => {
      ;[dot1Ref, dot2Ref, dot3Ref, dot4Ref].forEach((ref, i) => {
        setTimeout(() => {
          ref.current.style.transition = 'opacity 0.35s ease'
          ref.current.style.opacity = '1'
        }, i * 75)
      })
    })
    T(1280, () => {
      fnameRef.current.style.transition = 'transform 0.78s cubic-bezier(0.16,1,0.3,1)'
      fnameRef.current.style.transform = 'translateY(0)'
    })
    T(1520, () => {
      lnameRef.current.style.transition = 'transform 0.78s cubic-bezier(0.16,1,0.3,1)'
      lnameRef.current.style.transform = 'translateY(0)'
    })
    T(2150, () => {
      const b = badgeRef.current
      b.style.transition = 'opacity 0.4s ease, transform 0.52s cubic-bezier(0.34,1.56,0.64,1)'
      b.style.opacity = '1'
      b.style.transform = 'scale(1)'
    })
    T(2600, () => {
      dividerRef.current.style.transition = 'opacity 0.55s ease'
      dividerRef.current.style.opacity = '1'
    })
    T(2780, () => {
      brandRef.current.style.transition = 'opacity 0.6s ease'
      brandRef.current.style.opacity = '1'
    })
    T(4050, () => {
      splashRef.current.style.transition = 'opacity 0.65s ease-in-out'
      splashRef.current.style.opacity = '0'
    })
    T(4750, () => onComplete?.())

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div ref={splashRef} className={styles.splash}>
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      <svg viewBox="0 0 160 162" className={styles.muffinSvg} xmlns="http://www.w3.org/2000/svg">
        <path ref={domeRef} d="M28,88 C28,88 33,16 80,13 C127,16 132,88 132,88" fill="none" stroke="#C8A46E" strokeWidth="3.5" strokeLinecap="round" />
        <path ref={wrapRef} d="M28,88 L41,152 L119,152 L132,88 Z" fill="none" stroke="#B87A8A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <line ref={line1Ref} x1="58" y1="89" x2="52" y2="151" stroke="#B87A8A" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0 }} />
        <line ref={line2Ref} x1="80" y1="89" x2="80" y2="151" stroke="#B87A8A" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0 }} />
        <line ref={line3Ref} x1="102" y1="89" x2="108" y2="151" stroke="#B87A8A" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: 0 }} />
        <circle ref={dot1Ref} cx="63" cy="53" r="5.5" fill="#6B8F4A" style={{ opacity: 0 }} />
        <circle ref={dot2Ref} cx="89" cy="31" r="4.5" fill="#B87A8A" style={{ opacity: 0 }} />
        <circle ref={dot3Ref} cx="101" cy="60" r="5" fill="#C8A46E" style={{ opacity: 0 }} />
        <circle ref={dot4Ref} cx="74" cy="38" r="3.5" fill="#6B8F4A" style={{ opacity: 0 }} />
      </svg>

      <p ref={introRef} className={styles.intro}>Detrás de cada muffin,</p>

      <div className={styles.nameLine}>
        <span ref={fnameRef} className={`${styles.name} ${styles.nameFirst}`}>Marcela</span>
      </div>
      <div className={styles.nameLine}>
        <span ref={lnameRef} className={`${styles.name} ${styles.nameLast}`}>Buseghin</span>
      </div>

      <div ref={badgeRef} className={styles.badge}>
        <span className={styles.diamond}>◆</span>
        <span>Lic. en Nutrición</span>
        <span className={styles.diamond}>◆</span>
      </div>

      <div ref={dividerRef} className={styles.divider}>
        <div className={styles.dividerLine} />
        <div className={styles.dividerDot} />
        <div className={styles.dividerLine} />
      </div>

      <p ref={brandRef} className={styles.brandName}>La Muffinería</p>

      <div className={styles.progressTrack}>
        <div ref={pbarRef} className={styles.progressFill} />
      </div>
    </div>
  )
}