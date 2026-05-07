import axios from "axios"

const BASE_URL = "https://ecommerce.routemisr.com/api/v2/addresses"

const getHeaders = (token: string) => ({ token })

export type Address = {
  _id: string
  name?: string
  details: string
  phone: string
  city: string
}

// GET /addresses — get logged user addresses
export const getUserAddresses = async (token: string) => {
  const res = await axios.get(BASE_URL, { headers: getHeaders(token) })
  return res.data
}

// GET /addresses/:id — get specific address
export const getAddressById = async (token: string, id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`, { headers: getHeaders(token) })
  return res.data
}

// POST /addresses — add address
export const addAddress = async (
  token: string,
  address: { name?: string; details: string; phone: string; city: string }
) => {
  const res = await axios.post(BASE_URL, address, { headers: getHeaders(token) })
  return res.data
}

// DELETE /addresses/:id — remove address
export const removeAddress = async (token: string, id: string) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, { headers: getHeaders(token) })
  return res.data
}
