import { component$ } from "@builder.io/qwik"
import { ButtonLink, Card } from "~/components"

const Products = component$(() => {
  const corgies = [
    { key: '1', name: 'Douglas', price: '1,500', url: 'https://kc-media-cdn-live.azureedge.net/cache/d/c/6/6/f/9/dc66f9034e203864607c387506670545b325d6b3.jpg' },
    { key: '2', name: 'Noodle', price: '4,000', url: 'https://wallpaperaccess.com/full/1154655.jpg' },
    { key: '3', name: 'Ein', price: '12,000', url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pembroke-welsh-corgi-female-puppy-off-leash-dog-royalty-free-image-1610119079.?resize=480:*' },
    { key: '4', name: 'Courgette', price: '1,200', url: 'https://www.dogtime.com/assets/uploads/2011/01/file_23192_pembroke-welsh-corgi.jpg' },
    { key: '5', name: 'Waffles', price: '1,400', url: 'https://www.scotsman.com/webimg/b25lY21zOmU5ZGRiMzIyLTFhYzQtNGM5My04ZWUyLWNhOGQyYjc1NzljMjo5ZjJiZGI4OS05OTE5LTQyY2UtYjI3My1mMDkyN2UxMjQ2MWM=.jpg' },
    { key: '6', name: 'Muffin', price: '2,500', url: 'https://cdn.shopify.com/s/files/1/0748/9103/products/kosen_16_corgi_6820.jpg?v=1675504798' },
    { key: '7', name: 'Saddy', price: '1,800', url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2020%2F08%2F24%2Fcorgi-puppy-on-floor-512536165-2000.jpg' },
    
  ]
  return (
      <div class="min-h-screen grid place-items-center  py-32">
        <h1 class="text-6xl">Products</h1>
        <div class="flex gap-4 flex-wrap items-stretch justify-center max-w-[1400px] mx-auto">
          
          {corgies.map((obj) => <Card {...obj} />)}
          
        </div>
        <ButtonLink theme="black"  href="/" caption="Back Home" />
      </div>
    
  )
})
export default Products