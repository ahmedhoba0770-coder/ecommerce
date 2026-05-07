import axios from "axios"

const BASE_URL = "https://ecommerce.routemisr.com/api/v2"

const getHeaders = (token: string) => ({ token })

// Cash on Delivery — POST /orders/:cartId
export const createCashOrder = async (
  token: string,
  cartId: string,
  shippingAddress: { city: string; details: string; phone: string }
) => {
  const res = await axios.post(
    `${BASE_URL}/orders/${cartId}`,
    { shippingAddress },
    { headers: getHeaders(token) }
  )
  return res.data
}

// Online Payment (Stripe) — POST /orders/checkout-session/:cartId
export const createCheckoutSession = async (
  token: string,
  cartId: string,
  shippingAddress: { city: string; details: string; phone: string }
) => {
  const res = await axios.post(
    `${BASE_URL}/orders/checkout-session/${cartId}?url=${window.location.origin}`,
    { shippingAddress },
    { headers: getHeaders(token) }
  )
  return res.data
}
