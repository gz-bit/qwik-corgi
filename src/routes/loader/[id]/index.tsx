import { component$ } from "@builder.io/qwik";
import { useProductByIdLoader } from "../../layout";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation()
  const param = (loc.params.id)
  //const product = {value: {name: 'Test', description: 'testdescription'}}
  const product = useProductByIdLoader()
  
   return (
       <div>
          <div>{param}</div>
           <div>{product.value?.name}</div>
           <div>{product.value?.description}</div>
       </div>
   );
});