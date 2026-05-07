"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useWishlistStore } from "@/store/wishlistStore"
import { getWishlist } from "@/app/_Services/wishlistService"

export default function WishlistInitializer() {
  const { data: session } = useSession()
  const setWishlist = useWishlistStore((s) => s.setWishlist)

  useEffect(() => {
    if (!session?.user?.token) return
    getWishlist(session.user.token).then((res) => {
      if (res.data) setWishlist(res.data)
    })
  }, [session, setWishlist])

  return null
}
