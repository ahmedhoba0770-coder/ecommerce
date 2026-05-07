export async function getOneProduct(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "no-store" }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.data
}