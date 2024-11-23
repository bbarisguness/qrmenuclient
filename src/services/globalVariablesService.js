const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getGlobalVariables({ lang = "en" }) {
    const response = await fetch(`${apiUrl}/global-variable?locale=${lang}`, {
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export { getGlobalVariables }