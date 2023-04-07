import { component$, $, useVisibleTask$, useStore, useContext} from '@builder.io/qwik'
import type { Corgi, CorgiState } from '../global/interfaces'
import { ButtonAction } from './ButtonAction'
import { ctxCorgi } from '~/routes/layout'

interface Props {
  close: () => void
}

export const ShowCorgiState = component$(({close}: Props) => {

  const corgiState = useContext(ctxCorgi)


  useVisibleTask$(() => {
    // find a way to make sure corgiState is fully available
  })

  const modal =`
    absolute top-0 right-0 w-1/2 h-screen bg-white z-50 text-black
    flex flex-col gap-4 p-4
  `
  return (
    <div class={modal}>
      <div class="flex items-center justify-between pb-4 border-b">
        <h1 class="font-bold text-4xl">corgiState</h1>
        <i onClick$={close} class="fa-solid fa-xmark"></i>
      </div>

      <div>
      <h1 class="font-bold text-2xl">corgiBasket</h1>
        {corgiState.corgiBasket.length == 0
          ? <div>Basket is empty</div>
          : <div class="bg-slate-400 flex flex-col gap-[1px]">
            {corgiState.corgiBasket.map((item, index) => <div class="bg-white p-4 flex justify-between border-b">
            
                <div  class="min-w-max"><h2>{item.name}</h2></div>
                <p class="text-l min-w-max">£{item.price}</p>
              
                <div></div>
            </div>)}
          </div>
        }
      </div>
      
      <div>
        <p class="font-bold text-2xl">corgiCount: {corgiState.corgiCount}</p>
      </div>

      <div>
        <h1 class="font-bold text-2xl">corgiSelected</h1>
        <ul>
          <li> Name: {corgiState.corgiSelected ?
                .name}</li>
        </ul>
      </div>

    </div>
  )
})