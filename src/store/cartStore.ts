import { create } from "zustand"
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "@/app/_Services/cartService"

// Local cart item (للي مش لوجين)
type LocalCartItem = {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

// API cart item (للي لوجين)
type ApiCartProduct = {
  _id: string
  title: string
  imageCover: string
  price: number
}

type ApiCartItem = {
  _id: string
  product: ApiCartProduct
  count: number
  price: number
}

type CartState = {
  // Local
  localItems: LocalCartItem[]
  addLocalItem: (product: LocalCartItem) => void
  removeLocalItem: (id: string) => void
  increaseLocal: (id: string) => void
  decreaseLocal: (id: string) => void
  clearLocal: () => void

  // API
  apiItems: ApiCartItem[]
  cartId: string | null
  totalPrice: number
  loading: boolean
  fetchCart: (token: string) => Promise<void>
  addApiItem: (token: string, productId: string) => Promise<void>
  updateApiItem: (token: string, productId: string, count: number) => Promise<void>
  removeApiItem: (token: string, productId: string) => Promise<void>
  clearApiItems: (token: string) => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  // Local
  localItems: [],
  addLocalItem: (product) =>
    set((state) => {
      const existing = state.localItems.find((item) => item.id === product.id)
      if (existing) {
        return {
          localItems: state.localItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        }
      }
      return { localItems: [...state.localItems, product] }
    }),
  removeLocalItem: (id) =>
    set((state) => ({ localItems: state.localItems.filter((item) => item.id !== id) })),
  increaseLocal: (id) =>
    set((state) => ({
      localItems: state.localItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decreaseLocal: (id) =>
    set((state) => ({
      localItems: state.localItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),
  clearLocal: () => set({ localItems: [] }),

  // API
  apiItems: [],
  cartId: null,
  totalPrice: 0,
  loading: false,
  fetchCart: async (token) => {
    if (!token) return
    set({ loading: true })
    try {
      const data = await getCart(token)
      set({
        apiItems: data.data.products,
        cartId: data.data._id,
        totalPrice: data.data.totalCartPrice,
      })
    } finally {
      set({ loading: false })
    }
  },
  addApiItem: async (token, productId) => {
    await addToCart(token, productId)
    const data = await getCart(token)
    set({
      apiItems: data.data.products,
      cartId: data.data._id,
      totalPrice: data.data.totalCartPrice,
    })
  },
  updateApiItem: async (token, productId, count) => {
    await updateCartItem(token, productId, count)
    const data = await getCart(token)
    set({
      apiItems: data.data.products,
      cartId: data.data._id,
      totalPrice: data.data.totalCartPrice,
    })
  },
  removeApiItem: async (token, productId) => {
    await removeCartItem(token, productId)
    const data = await getCart(token)
    set({
      apiItems: data.data.products,
      cartId: data.data._id,
      totalPrice: data.data.totalCartPrice,
    })
  },
  clearApiItems: async (token) => {
    await clearCart(token)
    set({ apiItems: [], cartId: null, totalPrice: 0 })
  },
}))