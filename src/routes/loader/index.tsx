

import { component$ } from '@builder.io/qwik'
import { useProductsLoader, useSimpleProductsLoader, 
  useProductFormLoader, formSchema, type ProductForm  } from '../layout'
//import { useProductForm } from '../modular-forms'
import { useForm, zodForm$ } from '@modular-forms/qwik'
//import { useFormLoader } from '@modular-forms/qwik'

export default component$(() => {

  const simpleProducts = useSimpleProductsLoader()
  const products = useProductsLoader()
  const [productForm, { Form, Field, FieldArray }] = useForm<ProductForm>({
    loader: useProductFormLoader(), 
    validate: zodForm$(formSchema)
})
  
  return (
    <>
    <h1 class="p-8 text-4xl">Loader (intial loading of data into app)</h1>
    <div class="p-8">
      <h1 class="text-2xl">Simple Products (from lacally defined data)</h1>
      <p class="pt-4">href:  {simpleProducts.value?.url.href}</p>
      <ul class="p-8 list-disc">
        {simpleProducts.value?.simpleProducts.map((product) => {
          return (
            <li class="pl-8 ">
              <div class="text-2xl">
                {product.name}
                <i class="pl-4 text-xl">{product.description}</i>
                <a class="pl-4 text-lg text-blue-400" href={`/loader/${product.id}`}><u>see details</u></a>  
              </div>
              <div></div>
            </li>
          )
        })}
      </ul>

    </div>
    <div class=" flex flex-row">
    <div class="p-8">
      <h1 class="text-2xl">Products from Database</h1>
      <p class="pt-4">href not requested</p>
      <ul class="p-8 list-disc">
        {products.value.map((product) => {
          return (
            <li class="pl-8 ">
              <div class="text-2xl">
                {product.name}
                <i class="pl-4 text-xl">{product.description}</i>
                <a class="pl-4 text-lg text-blue-400" href={`/loader/${product.id}`}><u>see details</u></a>  
              </div>
              <div></div>
            </li>
          )
        })}
      </ul>
    </div>
    <div class="p-8">
      <h1 class="text-2xl">Add a Product to the Database</h1>
      <Form>
        <Field name="name">
          {(field, props) => <input { ...props } type="text" />}
        </Field>
        <Field name="description">
          {(field, props) => <input { ...props } type="text" />}
        </Field>
        <button class="w-max" type="submit">
          Submit
        </button>
      </Form>
    </div>
    </div>
    </>
  )
})