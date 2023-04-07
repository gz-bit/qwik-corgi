import { component$, useContext } from '@builder.io/qwik'
import type { PropFunction } from '@builder.io/qwik'
import { testData } from './data'
import type { Item, Basket } from './types'
import { useTestBasket } from './useTestBasket'
import { ctxTest } from './createTestStore'

interface Props {
  item: Item
  caption: string
  onClick$: PropFunction<() => void>
}
const ActionLine = component$<Props>(({item, caption, onClick$}) => {
  return (
      <div class="flex flex-row border-b w-1/2"> 
        <p class="w-2/3 pt-2">{item.name} </p>
        <button class="border-4 px-2" onClick$={onClick$}>{caption}</button>
      </div>
  )
})

export const TestChild = component$(() => {
  const data = testData

  // The context has to be defined before in a parent component
  // here just in ./index.ts
  // but usually in root.tsx or layaout.tsx
  const state = useContext<Basket>(ctxTest)  

  // this is the hook which deliveres the procedures to hanlde the global state
  const test = useTestBasket()
  
  return (
    <div>
      <h1 class="text-2xl text-old" >Test Child with Hook</h1>
      <div class="flex flex-row">

        <ul class="p-5 flex flex-col w-1/3">
          <p class="pb-4 text-2xl">Products</p>
          {data.map(
            (item, index) => <ActionLine key={index} item={item} caption="add" onClick$={() => test.add$(state, item)} />
          )} 
        </ul>

        <ul class="p-5 flex flex-col w-1/3">
          <p class="pb-4 text-2xl">Selected</p>
          <li>{state.selectedItem.name === ''
            ? 'none'
            : state.selectedItem.name
          }</li>
        </ul>

        <ul class="p-5 flex flex-col w-1/3">
          <li key="0"><p class="pb-4 text-2xl">Basket</p></li>
          {state.basket.map(
            (item, index) => <ActionLine key={index} item={item} caption="x" onClick$={() => test.remove$(state, index)} />
          )}
          <li class="pt-6">Count: {state.count}</li>
        </ul>

      </div>
    </div>
  )
})