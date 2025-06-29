import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";


export async function getProducts() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const response = await fetch(baseURL + '/api/products')
  const products = await response.json()
  return products
}

export default async function Home(props) {

  const products = await getProducts()
  
  let planner = null
  let stickers = []

  const allProducts = []

  // for (let product of products) {
  //   if (product.name === 'Medieval Dragon Month Planner') {
  //     planner = product
  //     continue
  //   }
  //   stickers.push(product)
  // }

  for (let product of products){
    planner = product
    stickers.push(product)
  }

  return (
    <>
      <ImageBanner/>
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}