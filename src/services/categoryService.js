import { categories } from "@/data/categoryData";
const apiUrl = process.env.NEXT_PUBLIC_API_URL


function getCategories() {
    return categories;
}

async function getCategoriesByCompanySlug({ slug, lang = "en" }) {
    const response = await fetch(`${apiUrl}/categories?company=${slug}&populate[image][fields][0]=*&populate[company][populate][0]=logo&populate[company][populate][1]=theme&locale=${lang}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories, getCategoriesByCompanySlug }