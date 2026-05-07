export async function getAllBrands() {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/brands",
    { cache: "no-store" }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.data
}