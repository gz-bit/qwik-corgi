import { component$, $, useContext } from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'
import { ctxCorgi } from '../layout'
import { ButtonAction } from '~/components'
import type { CorgiState } from '~/global/interfaces'

const CorgiPage = component$(() => {

  const corgiState = useContext<CorgiState>(ctxCorgi)  
  const nav = useNavigate()
  
  const addItemToBasket = $(() => {
    corgiState.corgiBasket.push(corgiState.corgiSelected)
    corgiState.corgiCount++
    //save to localStorage
    localStorage.setItem('corgiBasket', JSON.stringify(corgiState.corgiBasket))
    localStorage.setItem('corgiCount', JSON.stringify(corgiState.corgiCount))
    nav('/products')
  })

  return (
    <div class="py-32 h-fit flex flex-col gap-8 items-center">
      CORGI
      <img class="" src={corgiState.corgiSelected.url} alt={corgiState.corgiSelected.name} />
      <p class="text-4xl">{corgiState.corgiSelected.name}</p>
      <p class="text-2xl">£{corgiState.corgiSelected.price}</p>
      <ButtonAction theme="black" action={addItemToBasket} caption="Adopt" />
    </div> 
  )  

})
export default CorgiPage