import { products } from "@/data/productData";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

//--------
function getProduct(id) {
  return products.find((item) => item.id == id);
}
function getProducts(categoryId) {
  return products.filter((item) => item.categoryId == categoryId);
}




async function getProductsByCategorySlug({ slug, company }) {
  const response = await fetch(`${apiUrl}/products?category=${slug}&company=${company}&populate[category][populate][0]=image&populate[category][populate][1]=company.logo&populate[image][fields][0]=*`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

async function getProductById({ id, company }) {
  const response = await fetch(`${apiUrl}/products/${id}?company=${company}&populate[category][populate][company][populate][0]=logo&populate[category][populate][company][populate][1]=theme&populate[image][fields][0]=*&populate[contents][sort][0]=line:asc`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}


export { getProduct, getProducts, getProductsByCategorySlug, getProductById };
