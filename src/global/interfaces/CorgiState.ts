import type { Corgi } from "./Corgi"

export interface CorgiState {
  corgiBasket: Corgi[]
  corgiCount: number
  corgiSelected: Corgi
}