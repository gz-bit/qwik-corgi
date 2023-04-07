import { component$, useContext, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city'
import { ctxCorgi } from '../routes/layout';
import type { Corgi, CorgiState } from '~/global/interfaces';

export const Card = component$((props: Corgi) => {

  const { key, name, price, url} = props
  const corgiState = useContext<CorgiState>(ctxCorgi)
  const nav = useNavigate()

  const select = $(() => {
    corgiState.corgiSelected = props
    // save this Corgi over multiple sessions in browser
    localStorage.setItem('corgiSelected', JSON.stringify(corgiState.corgiSelected))
    nav('/corgi')
  }) 
 
  return (
      <div key={key} class="flex flex-col gap-2 sm:max-w-[400px] cursor-pointer 
        border border-solid border-transparent hover:border-slate-900"
        onClick$={select}
      >
        <img src={url} alt={name} class="h-[140] object-cover p-4" />
        <div class="flex flex-col gap-2 p-4 shadow">
          <h2 class="text-4xl">{name}</h2>
          <p>£{price}</p>
        </div>
      </div>
  )
})