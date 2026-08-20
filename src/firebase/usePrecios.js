import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from './config'

const PRECIOS_DEFAULT = {
  precioNormalGrande:    2400,
  precioDescuentoGrande: 2250,
  precioNormalMediano:   2000,
  precioDescuentoMediano:1800,
  umbralDescuento:       6,
  recargoAptoDiabeticoGrande:  450,
  recargoAptoDiabeticoMediano: 350,
  overridesPorProducto:  {},
}

export function resolverPrecio(precios, productId, tamano, { descuento = false } = {}) {
  const sufijo = tamano === 'grande' ? 'Grande' : 'Mediano'
  const campo = (descuento ? 'precioDescuento' : 'precioNormal') + sufijo
  const especial = precios.overridesPorProducto?.[productId]?.[campo]

  if (especial !== undefined && (typeof especial !== 'number' || Number.isNaN(especial))) {
    console.warn(`Override de precio inválido en "${productId}.${campo}" — se usó el precio global en su lugar`, especial)
    return precios[campo]
  }

  return especial ?? precios[campo]
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