import { categories } from "@/data/categoryData";
const apiUrl = process.env.NEXT_PUBLIC_API_URL

function getCategories() {
    return categories;
}

async function getCategoriesByCompanySlug({ slug }) {
    const response = await fetch(`${apiUrl}/categories?company=${slug}&populate[0]=image&populate[1]=company.logo`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategories, getCategoriesByCompanySlug }