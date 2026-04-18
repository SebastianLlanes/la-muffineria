import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config'

const PRECIOS_DEFAULT = {
  precioNormalGrande:    2400,
  precioDescuentoGrande: 2250,
  precioNormalMediano:   2000,
  precioDescuentoMediano:1800,
  umbralDescuento:       6,
}

export function usePrecios() {
  const [precios, setPrecios] = useState(PRECIOS_DEFAULT)
  const [loading, setLoading] = useState(true)

  useEffect(function suscribirPrecios() {
    const ref = doc(db, 'config', 'precios')
    const unsub = onSnapshot(ref, function (snap) {
      if (snap.exists()) {
        setPrecios({ ...PRECIOS_DEFAULT, ...snap.data() })
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return { precios, loading }
}