import { useContext, $, useVisibleTask$ } from "@builder.io/qwik"
import { ctxTest } from "./createTestStore"
import type { Basket, Item } from './types'

// useTestBasket is a hook that delivers the global state
// and all procedures handling it
export const useTestBasket = () => {
  const state = useContext<Basket>(ctxTest)
  
  const saveState$ = $(() => {
    localStorage.setItem('testBasket', JSON.stringify(state.basket))
    localStorage.setItem('testSelectedItem', JSON.stringify(state.selectedItem))
    localStorage.setItem('testCount', state.count.toString())
  })

  useVisibleTask$(() => {
    const ls = localStorage.getItem('testBasket')
    //const ls = null
    if (ls != null) {
      state.basket = JSON.parse(ls)
      state.count = state.basket.length
    }
  })

  const _add = $((state: Basket, item: Item) => {
    state.basket.push(item)
    state.selectedItem = item
    state.count++
    saveState$()
  })

  const _remove = $((state: Basket, index: number) => {
    state.basket.splice(index,1)
    localStorage.setItem('testBasket', JSON.stringify(state.basket))
    state.count = state.basket.length
    // remove$ updates the state well but does not display the basket result 
    // that's why I load it again from the localStorage
    //todo there must be a better way to force an update of the page
    const ls = localStorage.getItem('testBasket')
    if (ls != null) {
      state.basket = JSON.parse(ls)
    }
    saveState$()
  })

  const _select = $((state: Basket, item: Item) => {
    state.selectedItem = item
    saveState$()
  })

  return {
    add$: $((state: Basket, item: Item) => _add(state, item)),
    remove$: $((state: Basket, index: number) => _remove(state, index)), 
    select$: $((state: Basket, item: Item) => _select(state, item)),
  }
}