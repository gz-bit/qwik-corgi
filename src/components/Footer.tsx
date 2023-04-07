import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
//import styles from './header.css?inline';

export const Footer = component$(() => {
  //useStylesScoped$(styles);

  const store = useStore({ scrolled: false })
  const footer = `
    fixed bottom-0 left-0 w-full
    flex justify-left items-center p-4
    text-xl sm:text-2xl sm:p-8 bg-slate-900 text-white
  ` 
  return (
    <footer 
      document:onScroll$={() => store.scrolled = window.scrollY > 0 }
      class={footer}
    >  
      
        
      <img class="w-6 h-6" alt="z-bit Logo" src="/z-bit.ico" /><div>- bit</div>
      <div class="w-10"></div>  
      <img class="w-6 h-6"  src="/commi.png" />Commi
        
      
       
    </footer>
  )
})
