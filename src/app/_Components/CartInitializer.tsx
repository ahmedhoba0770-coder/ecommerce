"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/store/cartStore"

export default function CartInitializer() {
  const { data: session, status } = useSession()
  const fetchCart = useCartStore((s) => s.fetchCart)

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      fetchCart(session.user.token)
    }
  }, [status, session, fetchCart])

  return null
}
