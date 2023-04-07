import { component$, useStore } from '@builder.io/qwik'

const Design = component$(() => {
  const state = useStore({theme: false})
  return (
    <div class={`
      p-10 text-4xl text-slate-900
      grow 
      grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
    ` +
    (state.theme 
      ? 'text-slate-900  bg-slate-300' 
      : 'text-yellow-300 bg-slate-900'
    )  
    }>
      <h1 class="pb-20 m-10">Design with Tailwind</h1>

      <button
        onClick$={() =>state.theme = !state.theme} 
        class="
          relative bg-white m-10  
          after:absolute  after:bg-green-300 after:inset-0  after:z-0 after:blur
          after:content-['hello']
          before:absolute before:bg-blue-300 before:inset-0 before:z-0 before:blur 
          before:-top-10 before:-left-10 before:h-full before:w-full
          text-slate-900 p-10 
          hover:opacity-50 duration-300
          flex items-center gap-4
          group
        "
      >
        <h1 class="z-10">Change Theme</h1>
        <span class="z-10 w-10 h-10 bg-amber-600 group-hover:rotate-45 duration-300"></span>
      </button>

      <button class="
        relative bg-white m-10 
        after:absolute  after:bg-rose-300 after:inset-0  after:z-0 after:blur
        after:content-['hello']
        before:absolute before:bg-amber-300 before:inset-0 before:z-0 before:blur 
        before:-top-10 before:-left-10 before:h-full before:w-full
        text-slate-900 p-10 
        hover:opacity-50 duration-300
        flex items-center gap-4
        group
      ">
        <h1 class="z-10">BUTTON</h1>
        <span class="
          z-10 w-10 h-10 rounded-full relative
          after:absolute   after:bg-white  after:inset-1  after:rounded-full
          before:absolute before:bg-white before:h-full before:w-2 before:top-4
          before:left-1/2 before:-translate-x-1/2 
          overflow-hidden 
          bg-amber-800 group-hover:animate-spin duration-300
        "></span>
      </button>

    </div>
  )
}) 
export default Design