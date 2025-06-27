var qs = require('qs');
const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCompanyHome({ slug, lang = 'tr' }) {
    const query = qs.stringify({
        company: slug,
        pagination: {
            pageSize: 999,
            page: 1
        },
        populate: {
            logo: {
                fields: ["url", "formats"]
            },
            buttons: {
                sort: ["line:asc"]
            },
            theme: {
                sort: ["id:asc"]
            },
            banner: {
                fields: ["url", "formats"]
            },
            currencies: {
                sort: ["id:asc"]
            },
            localizations: {
                fields: ["locale"]
            }
        },
        filters: {
            slug: {
                $eq: slug
            }
        },
        locale: lang,
    }, { encodeValuesOnly: true });

    const response = await fetch(`${apiUrl}/companies?${query}`, {
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