var qs = require('qs');
const apiUrl = process.env.NEXT_PUBLIC_API_URL

async function getProductsByCategorySlug({ slug, company, lang = "tr" }) {
  const query = qs.stringify({
    sort: ["line:asc"],
    company: company,
    category: slug,
    pagination: {
      pageSize: 999,
      page: 1
    },
    populate: {
      image: {
        fields: ["url", "formats"]
      },
      contents: {
        sort: ["line:asc"]
      },
      category: {
        populate: {
          image: {
            fields: ["url", "formats"]
          },
          banner: {
            fields: ["url", "formats"]
          },
          company: {
            populate: {
              logo: {
                fields: ["url", "formats"]
              },
              theme: {
                sort: ["id:asc"]
              },
              localizations: {
                fields: ["locale"]
              },
              currencies: {
                sort: ["id:asc"]
              },
              buttons: {
                sort: ["id:asc"]
              }
            }
          }
        }
      }
    },
    locale: lang,
  }, { encodeValuesOnly: true });

  const response = await fetch(`${apiUrl}/products?${query}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}

async function getProductById({ id, company, lang = 'tr' }) {
  const query = qs.stringify({
    sort: ["line:asc"],
    company: company,
    populate: {
      image: {
        fields: ["url", "formats"]
      },
      contents: {
        sort: ["line:asc"]
      },
      portions: {
        sort: ["line:asc"]
      },
      allergens: {
        sort: ["line:asc"]
      },
      category: {
        populate: {
          company: {
            populate: {
              logo: {
                fields: ["url", "formats"]
              },
              theme: {
                sort: ["id:asc"]
              }
            }
          }
        }
      }
    },
    locale: lang,
  }, { encodeValuesOnly: true });

  const response = await fetch(`${apiUrl}/products/${id}?${query}`, {
    cache: 'no-store'
  })
  const data = await response.json()
  return data
}


export { getProductsByCategorySlug, getProductById };
