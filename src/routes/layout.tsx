import { component$, Slot, useStore, useVisibleTask$, createContextId, useContextProvider } from '@builder.io/qwik';
import { Header, Footer } from '../components'
import type { CorgiState } from '../global/interfaces';
import { emptyCorgi } from '../global/interfaces'
import { routeLoader$, z } from '@builder.io/qwik-city';
import type { InitialValues } from "@modular-forms/qwik"
import { getProducts, getProductById, simpleProducts } from './loader/data'

// loader
// export const useProductsLoader = routeLoader$(({url, method}) => {
//   if (method === 'GET') {
//     return { url, products}
//   }
//   return { url, products: [] }
// })

export const useProductsLoader = routeLoader$( async () => {
   return await getProducts()
})
export const useProductByIdLoader = routeLoader$(async ({ url, method, params }) => {

  // logging the context for educational reasons
  console.log({url})
  console.log({method})
  console.log({params})

  // we are interested in params which are {} when pages are initially created
  if (params.id) {
    return await getProductById(parseInt(params.id));
  }
  return []
  
});
export const useSimpleProductsLoader = routeLoader$(({ url, method }) => {
  if (method === 'GET') {
    return { url, simpleProducts }
  }

})

export const formSchema = z.object({
  //name: z.string().nonempty(),
  //description: z.string().min(8),
  name: z
    .string()
    .nonempty()
    .min(1, 'Product Name'),
  description: z
    .string()
    .min(1, 'Product Description')
    .min(8, 'Your description must have at least 8 characters.'),
})
export type ProductForm = z.infer<typeof formSchema>
export const useProductFormLoader = routeLoader$<InitialValues<ProductForm>>(() => ({
  name: '',
  description: '',
}))


export const ctxCorgi = createContextId<CorgiState>('ctxCorgi')

export default component$(() => {
  const corgiState = useStore<CorgiState>({
    corgiBasket: [],
    corgiCount: 0,
    corgiSelected: emptyCorgi
  })
  
  useContextProvider(ctxCorgi, corgiState)

  
  // load globalState from localStorage (Browser)
  
  useVisibleTask$(() => {
    const ls = localStorage.getItem('corgiBasket')
    if (ls != null) {
      corgiState.corgiBasket = JSON.parse(ls)
      corgiState.corgiCount = corgiState.corgiBasket.length
    }
  })
  
  
  return (
    <>
      <main class="flex flex-1 flex-col flex-justify-between">
        <Header />
        <Slot />
        <Footer />
      </main>
    
    </>
  );
});
