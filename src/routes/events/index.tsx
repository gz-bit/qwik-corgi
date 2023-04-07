import { component$, useSignal, $, useVisibleTask$, PropFunction, useStore, useOnDocument } from '@builder.io/qwik'

export default component$(() => {
  const count1 = useSignal(0)
  const count2 = useSignal(0)
  const increment = $(() => count2.value++)

  const position = useSignal<{x: number, y: number}>()

  const currentTarget = useSignal<HTMLElement|null>(null)
  const target = useSignal<HTMLElement|null>(null)

  const draggableRef = useSignal<HTMLElement>()
  const dragStatus = useSignal('')
  useVisibleTask$(({ cleanup }) => {
    if (draggableRef.value) {
      // use the DOM API to add an event listener
      const dragstart = () => dragStatus.value = 'dragstart'
      const dragend = () => dragStatus.value = 'dragend'
      draggableRef.value!.addEventListener('dragstart', dragstart)
      draggableRef.value!.addEventListener('dragend', dragend)
      cleanup(() => {
        draggableRef.value!.removeEventListener('dragstart', dragstart)
        draggableRef.value!.removeEventListener('dragend', dragend)
      })
    }
  })

  const ButtonComponent = component$<{onClick$?: PropFunction<() => void>}>(({ onClick$ }) => {
    return (
      <button onClick$={onClick$}>Click on this ButtonComponent!</button>
    )
  })

  const useMousePosition = () => {
    const position = useStore({x: 0, y: 0})
    useOnDocument('mousemove', $((event) => {
      const { x, y } = event as MouseEvent
      position.x = x
      position.y = y
    }))
    return position
  }
  const pos = useMousePosition()

  return (
    <>
    {/* Inline Handler */}
    <div class="flex flex-row p-5">
      <button class="px-4 py-2 border-2" onClick$={() => count1.value++}>Increment</button>
      <div class="py-2 pl-4">Count: {count1.value}</div>
    </div>

    {/* Extracting the Handler */}
    <div class="flex flex-row p-5 bg-gray-100">
      <button class="px-4 py-2 border-2" onClick$={increment}>Increment</button>
      <div class="py-2 pl-4">Count: {count2.value}</div>
    </div>

    {/* Extracting the Handler */}
    <div class="flex flex-row gap-4 pl-5 items-center" onClick$={(event) => (position.value = { x: event.x, y: event.y })}>
      <div class="w-24 p-4 border-2 text-center">1</div>
      <div class="w-24 p-4 border-2 text-center">2</div>
      <div>clicked at ({position.value?.x}, {position.value?.y})</div>
    </div>

    {/* Asyncronous Events */}

    {/* Prevent Default */}
    <div class="flex flex-row p-5 text-blue-600 hover:underline bg-gray-100">
      <a href="/"
        preventdefault:click        // <-------------------------------+
        onClick$={() =>             //                                 |
          //event.preventDefault()  // does not work here, that's why -+
          alert('Do something else for navigation ...')
        }
      >Go to Home Page</a>
    </div>

    {/* Target 
        Because event handling is asyncronous there is no: event.currentTarget
        ==> Qwik provides _currentTarget as second argument
    */}    
    <div class="pl-5 flex flex-row items-center"
      onClick$={(event, _currentTarget) => {
        currentTarget.value = _currentTarget
        target.value = event.target as HTMLElement
    }}>
      Click to see the difference between &nbsp; <u>target</u> &nbsp; and &nbsp; <u>currentTarget</u> &nbsp; of the event.
      <div class="m-5 p-5 border-2"><span class="px-5">Hello <b>World</b> <i>!</i></span></div>
      <ul class="w-36">
        <li>currentTarget: {currentTarget.value?.tagName}</li>
        {/* currentTarget in the DOM points to the element that has the event listener attached to: <DIV> */}
        <li>target: {target.value?.tagName}</li>
        {/* event.target points to the element that is clicked on here 
            Hello -> <SPAN> 
            World -> <B>
            !     -> <I> 
            else  -> <DIV> 
        */}
      </ul>
      <ul class="pl-5 items-center">
        <li>always DIV because event listener is attachet to DIV</li>
        <li>depends on where you click: Hello, World, ! or else</li>
      </ul>
    </div>

    {/* Syncronous Event Handling
        In useVisibleTask$ we add an event listener using the DOM API directly
    */}
    <div class="p-5 bg-gray-100">
      <div draggable ref={draggableRef}> Drag me! </div>
      <p class="pt-5">dragStatus: {dragStatus.value}</p>
    </div>

    <div class="p-5 border-2">
      <ButtonComponent onClick$={() => alert('Thank you!')} />
    </div>
    <div class="p-5 bg-gray-100">
      MousePosition: ({pos.x}, {pos.y})
    </div>
     
    </>
  )
})