import { component$ } from '@builder.io/qwik'

interface Props {
  theme: 'black' | 'white'
  position?: string
  action: () => void
  caption: string
}

export const ButtonAction = component$(({ theme, position, action, caption }: Props) => {
  let style: string
  style = theme == 'white'
    ? 'border-white text-white hover:bg-white hover:text-black '
    : 'border-black text-black hover:text-white hover:bg-black'
  style += `
    m-8 p-4 px-8 
    border-2 border-solid    
  `
  // this made the oppisite colour slide in, did not work well wit positioning the button
  //after:absolute after:right-full after:top-0 after:w-full after:h-full 
  //hover:after:translate-x-full after:duration-300 
  //overflow-hidden 

  //const //translate-x-1/2 tranlate-y-1/2 '
  return (
    <button class={style + position} onClick$={action}>
      <h3 class="relative z-20 text-center">{caption}</h3>
    </button>
  )
})