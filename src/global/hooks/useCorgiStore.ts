import { useStore, $, createContextId, useContextProvider, useContext } from '@builder.io/qwik'
import type { CorgiState, Corgi } from '../interfaces'
import { emptyCorgi } from '../interfaces'

export const ctxCorgi = createContextId<CorgiState>('CTX_Corgi')

export const useCorgiStore = () => {  
  const corgiState = useStore<CorgiState>({
    corgiBasket: [],
    corgiCount: 0,
    corgiSelected: emptyCorgi
  })

  const ls = localStorage.getItem('corgiBasket')
  if (ls != null) {
    corgiState.corgiBasket = JSON.parse(ls)
    corgiState.corgiCount = corgiState.corgiBasket.length
  }

  useContextProvider(ctxCorgi, corgiState) 
}
