import axios from "axios"

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/cart"

const getHeaders = (token: string) => ({
  token,
})

// Get cart
export const getCart = async (token: string) => {
  const res = await axios.get(BASE_URL, {
    headers: getHeaders(token),
  })
  return res.data
}

// Add to cart
export const addToCart = async (token: string, productId: string) => {
  const res = await axios.post(
    BASE_URL,
    { productId },
    { headers: getHeaders(token) }
  )
  return res.data
}

// Update quantity
export const updateCartItem = async (token: string, productId: string, count: number) => {
  const res = await axios.put(
    `${BASE_URL}/${productId}`,
    { count },
    { headers: getHeaders(token) }
  )
  return res.data
}

// Remove item
export const removeCartItem = async (token: string, productId: string) => {
  const res = await axios.delete(`${BASE_URL}/${productId}`, {
    headers: getHeaders(token),
  })
  return res.data
}

// Clear cart
export const clearCart = async (token: string) => {
  const res = await axios.delete(BASE_URL, {
    headers: getHeaders(token),
  })
  return res.data
}

// Apply coupon
export const applyCoupon = async (token: string, coupon: string) => {
  const res = await axios.put(
    `${BASE_URL}/applyCoupon`,
    { coupon },
    { headers: getHeaders(token) }
  )
  return res.data
}