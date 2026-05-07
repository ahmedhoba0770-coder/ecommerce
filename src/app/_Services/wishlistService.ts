const BASE = "https://ecommerce.routemisr.com/api/v1/wishlist"

export async function getWishlist(token: string) {
  const res = await fetch(BASE, {
    headers: { token },
    cache: "no-store",
  })
  return res.json()
}

export async function addToWishlistApi(productId: string, token: string) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json", token },
    body: JSON.stringify({ productId }),
  })
  return res.json()
}

export async function removeFromWishlistApi(productId: string, token: string) {
  const res = await fetch(`${BASE}/${productId}`, {
    method: "DELETE",
    headers: { token },
  })
  return res.json()
}
