const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCategoriesByCompanySlug({ slug, lang = "en" }) {
    const response = await fetch(`${apiUrl}/categories?sort[0]=line:asc&company=${slug}&pagination[pageSize]=999&pagination[page]=1&populate[image][fields][0]=*&populate[company][populate][0]=logo&populate[company][populate][1]=theme&locale=${lang}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export {  getCategoriesByCompanySlug }