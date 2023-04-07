import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components';

export default component$(() => {
  
  return (
    <div class="flex flex-1 flex-col">
      <section class="min-h-screen flex relative">
        <img
          class="object-cover" 
          src="https://images3.alphacoders.com/116/1162567.jpg" 
          alt="corgi home page"
        />
        {/* <a class={button} href="/products"><h3 class="relative z-20 text-center">Shop Corgis</h3></a> */}
        
        <ButtonLink theme="white" position="absolute left-2/3 top-2/3" href="/products" caption="Shop Corgis" />
        
      </section>
      
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Store',
  meta: [
    {
      name: 'description',
      content: 'Purchase a Corgi',
    },
  ],
};
