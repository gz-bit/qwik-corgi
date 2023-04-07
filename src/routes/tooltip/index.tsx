import { component$ } from '@builder.io/qwik'
import { Tooltip } from '~/components/Tooltip'

export default component$(() => {

  return (
    <>
      <h1 class="text-center p-10 text-4xl">Tooltip</h1>
      
      <div class="group relative m-12 flex justify-center">
        <button class="rounded bg-amber-500 px-4 py-2 text-xl text-white shadow-sm">Hover me!</button>
        <span class="absolute top-20 scale-0 rounded bg-gray-800 p-2 text-xl text-white group-hover:scale-100">
          ✨ You hover me!
        </span>
      </div>

      <p class="text-center pt-20">This one has <code>'transition-all'</code> added, but I don't see a difference!</p>
      <div class="group relative m-6 flex justify-center">
        <button class="rounded bg-amber-500 px-4 py-2 text-xl text-white shadow-sm">Hover me!</button>
        <span class="absolute top-20 scale-0 transition-all rounded bg-gray-800 p-2 text-xl text-white group-hover:scale-100">
          ✨ You hover me!
          And I am not having any problems when the tip is wider than the tool.
        </span>
      </div>

      <div class="flex flex-col items-center">    
        <p class="pt-20 pb-5">This one is done using the <code>&lt;Tooltip&gt;</code> component</p>
        <Tooltip tip="✨ Works! But now I am having problems when the tip is wider than the tool.">
          <button class="rounded bg-amber-500 px-4 py-2 text-xl text-white shadow-sm">Hover me!</button>
        </Tooltip>
      </div>
  
    </>
  )
}) 