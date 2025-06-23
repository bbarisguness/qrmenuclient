const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCompanyHome({ slug, lang = 'tr' }) {
    const response = await fetch(`${apiUrl}/companies?filters[slug][$eq]=${slug}&populate[buttons][sort][0]=line:asc&populate[logo][fields][0]=url&populate[theme][sort][0]=id:asc&populate[banner][fields][0]=url&populate[currencies][fields]=*&populate[localizations][fields][0]=locale&locale=${lang}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getLastUpdate({ id }) {
    const response = await fetch(`${apiUrl}/companies/lastUpdate/${id}`, {
        method: 'POST',
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}


export { getCompanyHome, getLastUpdate }