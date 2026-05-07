"use client"

import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import { useSession } from "next-auth/react"

export default function CartCount() {
  const { data: session } = useSession()
  const { localItems, apiItems, fetchCart } = useCartStore()

  useEffect(() => {
    if (session) {
      fetchCart((session as any).accessToken)
    }
  }, [session])

  const count = session
    ? apiItems.reduce((sum, item) => sum + item.count, 0)
    : localItems.reduce((sum, item) => sum + item.quantity, 0)

  if (count === 0) return null

  return (
    <span className='absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium'>
      {count > 99 ? "99+" : count}
    </span>
  )
}