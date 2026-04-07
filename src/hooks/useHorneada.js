import { useState, useEffect } from 'react'
import { getHorneada } from '@data/horneada'

export function useHorneada() {
  const horneada = getHorneada()

  const [countdown, setCountdown] = useState(
    function computeInitial() { return calcCountdown(horneada.fechaProxima) }
  )

  useEffect(function startTimer() {
    const interval = setInterval(function tick() {
      setCountdown(calcCountdown(horneada.fechaProxima))
    }, 1000)
    return function cleanup() { clearInterval(interval) }
  }, [horneada.fechaProxima])

  return { horneada, countdown }
}

function calcCountdown(fechaISO) {
  const diff = new Date(fechaISO) - new Date()
  if (diff <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0, vencido: true }
  }
  const totalSegundos = Math.floor(diff / 1000)
  const dias          = Math.floor(totalSegundos / 86400)
  const horas         = Math.floor((totalSegundos % 86400) / 3600)
  const minutos       = Math.floor((totalSegundos % 3600) / 60)
  const segundos      = totalSegundos % 60
  return { dias, horas, minutos, segundos, vencido: false }
}