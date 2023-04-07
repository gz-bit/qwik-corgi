import { component$, $, useTask$, useStore, useContext} from '@builder.io/qwik'
import { ButtonAction } from './ButtonAction'
import { ctxCorgi } from '~/routes/layout'

interface Props {
  close: any
}

export const Basket = component$(({close}: Props) => {

  const corgiState = useContext(ctxCorgi)

  const state = useStore({
    basket: corgiState.corgiBasket,
    count: corgiState.corgiCount
  })

  useTask$(({track}) => {
    const tempBasket = track(() => corgiState.corgiBasket)
    state.basket = tempBasket
    state.count = tempBasket.length
  })


  const deleteItem = $((i: int) => {
    corgiState.corgiBasket.splice(i, 1)
    corgiState.corgiCount = corgiState.corgiBasket.length
    //save it
    localStorage.setItem('corgiBasket', JSON.stringify(corgiState.corgiBasket))
    localStorage.setItem('corgiCount', corgiState.corgiCount.toString())
  })

  const emptyBasket = $(() => {
    corgiState.corgiBasket = []
    corgiState.corgiCount = 0
    //save it
    localStorage.setItem('corgiBasket', JSON.stringify([]))
    localStorage.setItem('corgiCount', '0')
    close()
  })

  const modal =`
    absolute top-0 right-0 w-1/2 h-screen bg-white z-50 text-black
    flex flex-col gap-4 p-4 overflow-scroll
  `
  return (
    <div class={modal}>
      <div class="flex items-center justify-between pb-4 border-b">
        <h1 class="font-bold text-4xl">Basket</h1>
        {corgiState.corgiBasket.length > 0 &&
          <p class="text-2xl">
            {corgiState.corgiCount}
            <i class="fa-solid fa-trash text-lg px-2" onClick$={emptyBasket} />
          </p>
        }
        <i class="fa-solid fa-arrow-right-from-bracket" onClick$={close} />
        
      </div>
      {corgiState.corgiBasket.length == 0
        ? <div class="text-xl">Basket is empty</div>
        : <div class="bg-slate-400 flex flex-col gap-[1px]">
          {corgiState.corgiBasket.map((item, index) => <div class="bg-white p-4 flex justify-between border-b">
              <div  class="min-w-max"><h2 class="text-xl">{item.name}</h2></div>
              <p class="text-xl min-w-max">£{item.price}</p>
              <i class="fa-solid fa-xmark text-xl" onClick$={() => {
                corgiState.corgiBasket.splice(index, 1)
                corgiState.corgiCount = corgiState.corgiBasket.length
                //save it
                localStorage.setItem('corgiBasket', JSON.stringify(corgiState.corgiBasket))
                localStorage.setItem('corgiCount', corgiState.corgiCount.toString()) 
              }}></i>
              <div></div>
          </div>)}
          <ButtonAction action={emptyBasket} theme="black" caption="Checkout" />
        </div>
      }
    </div>
  )
})