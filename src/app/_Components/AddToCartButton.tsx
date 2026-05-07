"use client"

import { ReactNode, useState } from "react"
import { useCartStore } from "@/store/cartStore"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"

type Props = {
  productId: string
  product?: {
    id: string
    title: string
    price: number
    image: string
  }
  children: (loading: boolean) => ReactNode
}

export default function AddToCartButton({ productId, product, children }: Props) {
  const { data: session } = useSession()
  const addApiItem = useCartStore((state) => state.addApiItem)
  const addLocalItem = useCartStore((state) => state.addLocalItem)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    if (loading) return
    setLoading(true)
    try {
      if (session) {
        await addApiItem(session.user.token, productId)
      } else {
        if (!product) return
        addLocalItem({ ...product, quantity: 1 })
      }
      toast.success("Added to cart!")
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div onClick={handleAddToCart} className="cursor-pointer">
      {children(loading)}
    </div>
  )
}
