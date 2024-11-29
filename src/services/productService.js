const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getProductsByCategorySlug({ slug, company, lang = "tr" }) {
  const response = await fetch(`${apiUrl}/products?category=${slug}&company=${company}&populate[image][fields][0]=*&populate[contents][sort][0]=line:asc&populate[category][populate][image][fields][0]=*&populate[category][populate][banner][fields][0]=*&populate[category][populate][company][populate][0]=logo&populate[category][populate][company][populate][1]=theme&pagination[pageSize]=999&pagination[page]=1&locale=${lang}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

async function getProductById({ id, company, lang = 'tr' }) {
  const response = await fetch(`${apiUrl}/products/${id}?company=${company}&populate[category][populate][company][populate][0]=logo&populate[category][populate][company][populate][1]=theme&populate[image][fields][0]=*&populate[contents][sort][0]=line:asc&locale=${lang}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}


export { getProductsByCategorySlug, getProductById };
