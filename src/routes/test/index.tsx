import { component$ } from "@builder.io/qwik";
import { TestChild } from "./TestChildHookAndGlobalState"
import { TestChildCheck } from './TestChildCheck'
import { createTestStore } from './createTestStore'

export default component$(() => {

  // defines the global state and creates the context: ctxTest
  // has to be placed in a parent component, usually root.tsx or layout.tsx
  createTestStore()

  return(
    <div class="p-32">
      <div class="border-2 mb-10">
        <TestChild />
      </div>
      <div class="border-2">
        <TestChildCheck />
      </div>
    </div>
  )
})   