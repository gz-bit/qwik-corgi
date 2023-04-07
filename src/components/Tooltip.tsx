import { component$, Slot } from '@builder.io/qwik'

interface Props {
  tip: string,
}
export const Tooltip = component$<Props>(({ tip }) => {

  const tt =`
    absolute top-20 rounded bg-gray-800 p-2 text-xl text-white 
    scale-0 group-hover:scale-100 transition-all
  `

  return (
    <div class="group relative flex">
      <Slot />  
      <span class={tt}>{tip}</span>  
    </div>
  )
})