import { $, component$, useContext, useStore } from '@builder.io/qwik';
import { ctxCorgi } from '../routes/layout';
import type { CorgiState } from '~/global/interfaces';
import { Basket } from './'

export const Header = component$(() => {
 
  const header = `
    w-full
    flex justify-between items-center p-4
    text-2xl sm:text-4xl sm:p-8 bg-slate-900 text-white
  ` 
  const count =`
    absolute top-7 right-7 
    bg-slate-900 rounded-full h-5 w-5 text-sm
    border-2 border-white
    grid place-items-center
  `
  
  const corgiState = useContext<CorgiState>(ctxCorgi)
  const state = useStore({
    showBasket: false,
  })

  const closeBasket = $(() => state.showBasket = false)

  const tooltip = `
    transititext-primary text-primary transition duration-150 ease-in-out 
    hover:text-primary-600 focus:text-primary-600 active:text-primary-700 
    dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600
  `

  return (
    <header class={header}>
      {state.showBasket && <Basket close={closeBasket}/>}
      <div class="flex flex-row">

        <div class="group relative flex">        
          <a href="/"><h1 class="">Corgito</h1></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Shop</span>
        </div>

        <div class="group relative flex">
          <a href="/test"><i class="fa-solid fa-microscope pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Test</span>
        </div>

        <div class="group relative flex">
          <a href="/design"><i class="fa-solid fa-pen-clip pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Design</span>
        </div>

        <div class="group relative flex">
          <a href="/events"><i class="fa-solid fa-bolt pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Events</span>
        </div>

        <div class="group relative flex">
          <a title="Tooltip" href="/tooltip"><i class="fa-solid fa-message pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Tooltip</span>
        </div>

        <div class="group relative flex">
          <a href="/prisma"><i class="fa-solid fa-database pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Prisma</span>
        </div>

        <div class="group relative flex">
          <a href="/loader"><i class="fa-solid fa-download pl-8"></i></a>
          <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Loader</span>
        </div>
      </div>
      
      <div class="group relative flex">
      <div class="flex flex-row" onClick$={() => state.showBasket = true}>
        <i class="fa-solid fa-cart-shopping"></i>
        <div class="pl-4">{corgiState.corgiCount}</div>
      </div>
      <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-2xl text-white group-hover:scale-100">Basket</span>
      </div>
      
    </header>
  )
})
