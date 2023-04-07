import { component$, useVisibleTask$, $, useStore } from '@builder.io/qwik'
import type { PropFunction } from '@builder.io/qwik'
import { testData } from './data'
import type { Item, Basket } from './types'
import { emptyItem } from './types'

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

  const state = useStore<Basket>({
    basket: [],
    count: 0,
    selectedItem: emptyItem
  })
  
  useVisibleTask$(() =>{
    const ls = localStorage.getItem('testBasket')
    if (ls != null) {
      state.basket = JSON.parse(ls)
      state.count = state.basket.length
    }
  })

  const saveState$ = $(() => {
    localStorage.setItem('testBasket', JSON.stringify(state.basket))
    localStorage.setItem('testSelectedItem', JSON.stringify(state.selectedItem))
    localStorage.setItem('testCount', state.count.toString())
  })

  const select$ = $((item: Item) => {
    state.selectedItem = item
    saveState$()
  })

  const add$ = $((item: Item) => {
    state.basket.push(item)
    state.count = state.basket.length
    select$(item)
    saveState$()
  })

  const remove$ = $((index: number) => {
    state.basket.splice(index,1)
    localStorage.setItem('testBasket', JSON.stringify(state.basket))
    state.count = state.basket.length
    const ls = localStorage.getItem('testBasket')
    if (ls != null) {
      state.basket = JSON.parse(ls)
    }
    saveState$()
  })

  return (
    <div>
      <h1 class="text-2xl text-old" >Test Child with Component</h1>
      <div class="flex flex-row">

        <ul class="p-5 flex flex-col w-1/3">
          <p class="pb-4 text-2xl">Products</p>
          {data.map(
            (item, index) => <ActionLine key={index} item={item} caption="add" onClick$={() => add$(item)} />
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
            (item, index) => <ActionLine key={index} item={item} caption="x" onClick$={() => remove$(index)} />
          )}
          <li class="pt-6">Count: {state.count}</li>
        </ul>

      </div>
    </div>
  )
})