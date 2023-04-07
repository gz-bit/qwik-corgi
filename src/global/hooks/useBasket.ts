import { useContext } from "@builder.io/qwik"
import { ctxCorgi } from "./useCorgiStore"
import type { CorgiState, Corgi } from '../interfaces'

/*
      const corgieState = useBasket()
      corgiState.select(corgi)
      corgiState.addSelectedCorgi()
      corgiState.removeSelctedCorgi()
      corgiState.empty()
*/
export const useBasket = () => {
  const state = useContext<CorgiState>(ctxCorgi)
  
  const _add = (state: CorgiState) => {
    state.corgiBasket.push(state.corgiSelected)
    state.corgiCount++
    //save it
    localStorage.setItem('corgiBasket', JSON.stringify(state.corgiBasket))
    localStorage.setItem('corgiCount', state.corgiCount.toString())
  }

  const _remove = (state: CorgiState, index: number) => {
    state.corgiBasket.splice(index, 1)
    state.corgiCount = state.corgiBasket.length
    //save it
    localStorage.setItem('corgiBasket', JSON.stringify(state.corgiBasket))
    localStorage.setItem('corgiCount', state.corgiCount.toString()) 

  const _select = (state: CorgiState, corgi: Corgi) => {
    state.corgiSelected = corgi
    //save it                                                      ==> needed?
    localStorage.setItem('corgiSelected', JSON.stringify(corgi))
  }

  }

  return {
    state,
    addSelected: (state: CorgiState, corgi: Corgi) => _add(state, corgi),
    removeSelected: () => 
    select: (corgi) => 
  }
}