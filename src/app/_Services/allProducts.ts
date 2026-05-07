export async function getAllProducts(subcategory?: string, brand?: string) {
  let url = `https://ecommerce.routemisr.com/api/v1/products`

  if (subcategory) url += `?subcategory=${subcategory}`
  else if (brand) url += `?brand=${brand}`

  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) return { products: [], count: 0 }
  const data = await res.json()
  return { products: data.data, count: data.results }
}