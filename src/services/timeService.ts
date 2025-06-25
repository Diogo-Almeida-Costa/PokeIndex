// src/services/timeService.ts

import type { TimePokemon } from '../types/timePokemon.types'

const STORAGE_KEY = 'timesPokemon'

/** export Named: **/
export const listarTimes = (): TimePokemon[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as TimePokemon[]
  } catch {
    console.error('Erro ao ler times do localStorage')
    return []
  }
}

/** export Named: **/
export const salvarTime = (time: TimePokemon): void => {
  const times = listarTimes()
  times.push(time)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(times))
}
