"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useWishlistStore } from "@/store/wishlistStore"
import { addToWishlistApi, removeFromWishlistApi } from "@/app/_Services/wishlistService"
import toast from "react-hot-toast"

interface Props {
  product: {
    _id: string
    title: string
    imageCover: string
    price: number
    priceAfterDiscount?: number
    category: { name: string }
    quantity?: number
  }
}

export default function WishlistButton({ product }: Props) {
  const { data: session } = useSession()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fix hydration mismatch from zustand persist
  useEffect(() => {
    setMounted(true)
  }, [])

  const inWishlist = mounted ? isInWishlist(product._id) : false

  const toggle = async () => {
    setLoading(true)
    try {
      if (inWishlist) {
        removeFromWishlist(product._id)
        toast.success("Removed from wishlist")
        // Sync with API only if logged in
        if (session?.user?.token) {
          await removeFromWishlistApi(product._id, session.user.token)
        }
      } else {
        addToWishlist(product)
        toast.success("Added to wishlist")
        // Sync with API only if logged in
        if (session?.user?.token) {
          await addToWishlistApi(product._id, session.user.token)
        }
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Render static placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-gray-400">
        <FaRegHeart />
      </div>
    )
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm cursor-pointer
        ${inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-400"}
        ${loading ? "opacity-50" : ""}
      `}
    >
      {inWishlist ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}
