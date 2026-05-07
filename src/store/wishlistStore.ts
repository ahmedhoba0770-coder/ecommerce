import { create } from "zustand"
import { persist } from "zustand/middleware"

interface WishlistProduct {
  _id: string
  title: string
  imageCover: string
  price: number
  priceAfterDiscount?: number
  category: { name: string }
  quantity?: number
}

interface WishlistStore {
  items: WishlistProduct[]
  ids: string[]
  // Actions
  setWishlist: (products: WishlistProduct[]) => void
  addToWishlist: (product: WishlistProduct) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      ids: [],

      setWishlist: (products) =>
        set({ items: products, ids: products.map((p) => p._id) }),

      addToWishlist: (product) =>
        set((state) => ({
          items: [...state.items, product],
          ids: [...state.ids, product._id],
        })),

      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((p) => p._id !== id),
          ids: state.ids.filter((i) => i !== id),
        })),

      isInWishlist: (id) => get().ids.includes(id),

      clearWishlist: () => set({ items: [], ids: [] }),
    }),
    { name: "wishlist-storage" }
  )
)
