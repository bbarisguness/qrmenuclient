var qs = require('qs');
const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getCategoriesByCompanySlug({ slug, lang = "en" }) {
    const query = qs.stringify({
        sort: ["line:asc"],
        fields: ["name", "slug", "shortDescription", "longDescription", "line"],
        company: slug,
        pagination: {
            pageSize: 999,
            page: 1
        },
        populate: {
            image: {
                fields: ["url", "formats"]
            },
            company: {
                populate: {
                    logo: {
                        fields: ["formats", "url"]
                    },
                    theme: {
                        sort: ["id:asc"]
                    }
                }
            }
        },
        locale: lang,
    }, { encodeValuesOnly: true });

    const response = await fetch(`${apiUrl}/categories?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

async function getCategoriesByCompanySlug2({ slug, lang = "en" }) {
    const query = qs.stringify({
        sort: ["line:asc"],
        fields: ["name", "slug", "shortDescription", "longDescription", "line"],
        company: slug,
        pagination: {
            pageSize: 999,
            page: 1
        },
        populate: {
            image: {
                fields: ["url", "formats"]
            },
            products: {
                sort: ["line:asc"],
                fields: ["name", "price", "slug", "discount", "line", "locale"],
                populate: {
                    image: {
                        fields: ["url", "formats"]
                    }
                }
            },
            company: {
                populate: {
                    logo: {
                        fields: ["formats", "url"]
                    },
                    theme: {
                        sort: ["id:asc"]
                    }
                }
            }
        },
        locale: lang,
    }, { encodeValuesOnly: true });

    const response = await fetch(`${apiUrl}/categories?${query}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getCategoriesByCompanySlug, getCategoriesByCompanySlug2 }