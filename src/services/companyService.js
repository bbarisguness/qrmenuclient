import { company } from "@/data/companyData"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

function getCompany() {
    return company;
}

async function getCompanyHome({ slug }) {
    const response = await fetch(`${apiUrl}/companies?filters[slug][$eq]=${slug}&populate[buttons][sort][0]=line:asc&populate[theme][sort][0]=id:asc`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCompany, getCompanyHome }