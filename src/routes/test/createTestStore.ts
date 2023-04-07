import { useStore, createContextId, useContextProvider } from '@builder.io/qwik'
import type { Basket } from './types'
import { emptyItem } from './types'

export const ctxTest = createContextId<Basket>('ctxTest')

export const createTestStore = () => {  
  const testState = useStore<Basket>({
    basket: [],
    count: 0,
    selectedItem: emptyItem
  })

  useContextProvider(ctxTest, testState) 
}
