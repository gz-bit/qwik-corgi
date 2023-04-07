import { component$, Slot, useStore, useVisibleTask$, createContextId, useContextProvider } from '@builder.io/qwik';
import { Header, Footer } from '../components'
import type { CorgiState } from '../global/interfaces';
import { emptyCorgi } from '../global/interfaces'

export const ctxCorgi = createContextId<CorgiState>('ctxCorgi')

export default component$(() => {
  const corgiState = useStore<CorgiState>({
    corgiBasket: [],
    corgiCount: 0,
    corgiSelected: emptyCorgi
  })
  
  useContextProvider(ctxCorgi, corgiState)

  
  // load globalState from localStorage (Browser)
  
  useVisibleTask$(() => {
    const ls = localStorage.getItem('corgiBasket')
    if (ls != null) {
      corgiState.corgiBasket = JSON.parse(ls)
      corgiState.corgiCount = corgiState.corgiBasket.length
    }
  })
  


  return (
    <>
      <main class="flex flex-1 flex-col flex-justify-between">
        <Header />
        <Slot />
        <Footer />
      </main>
    
    </>
  );
});
