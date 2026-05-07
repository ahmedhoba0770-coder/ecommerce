"use client"

import { useCartStore } from "@/store/cartStore"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TbTruckDelivery } from "react-icons/tb"
import { FaShieldAlt, FaLock, FaTag } from "react-icons/fa"
import { useState } from "react"
import { applyCoupon } from "@/app/_Services/cartService"
import toast from "react-hot-toast"

export default function OrderSummary() {
  const { data: session } = useSession()
  const { localItems, apiItems, totalPrice } = useCartStore()
  const [promoCode, setPromoCode] = useState("")
  const [showPromo, setShowPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const isLoggedIn = !!session

  const totalItems = isLoggedIn
    ? apiItems.reduce((sum, item) => sum + item.count, 0)
    : localItems.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = isLoggedIn
    ? totalPrice
    : localItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const freeShipping = subtotal > 500

  const handleApplyCoupon = async () => {
    if (!promoCode) return
    try {
      const data = await applyCoupon((session as any).accessToken, promoCode)
      setDiscount(subtotal - data.data.totalAfterDiscount)
      toast.success("Coupon applied!")
    } catch {
      toast.error("Invalid coupon")
    }
  }

  return (
    <div className="lg:w-80 shrink-0">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm sticky top-4">

        {/* Header */}
        <div className="bg-green-500 text-white px-6 py-5">
          <div className="flex items-center gap-2">
            <FaLock />
            <h2 className="text-xl font-bold">Order Summary</h2>
          </div>
          <p className="text-green-100 text-sm mt-1">{totalItems} items in your cart</p>
        </div>

        <div className="px-6 py-5 space-y-4">

          {freeShipping && (
            <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
              <div className="h-9 w-9 bg-green-100 text-green-500 rounded-full flex items-center justify-center shrink-0">
                <TbTruckDelivery />
              </div>
              <div>
                <p className="text-green-600 font-semibold text-sm">Free Shipping!</p>
                <p className="text-green-500 text-xs">You qualify for free delivery</p>
              </div>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-medium text-gray-900">{subtotal} EGP</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-500">
              <span>Discount</span>
              <span>- {discount} EGP</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600 pb-4 border-b border-gray-100">
            <span>Shipping</span>
            <span className={freeShipping ? "text-green-500 font-semibold" : "font-medium text-gray-900"}>
              {freeShipping ? "FREE" : "Calculated at checkout"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">{subtotal - discount}</span>
              <span className="text-sm text-gray-400 ml-1">EGP</span>
            </div>
          </div>

        </div>

        <div className="px-6 pb-6 space-y-3">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setShowPromo(!showPromo)}
                className="w-full border-2 border-dashed border-gray-200 rounded-xl py-3 flex items-center justify-center gap-2 text-gray-500 hover:border-green-300 hover:text-green-500 transition text-sm font-medium"
              >
                <FaTag />
                Apply Promo Code
              </button>

              {showPromo && (
                <div className="flex gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-green-500 text-white px-4 rounded-lg text-sm hover:bg-green-600 transition"
                  >
                    Apply
                  </button>
                </div>
              )}

              <Link href="/checkout">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <FaLock />
                  Secure Checkout
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FaShieldAlt className="text-green-500" />
                  Secure Payment
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <TbTruckDelivery className="text-green-500" />
                  Fast Delivery
                </div>
              </div>

              <Link href="/" className="flex items-center justify-center gap-1 text-green-500 hover:text-green-600 text-sm transition pt-1">
                ← Continue Shopping
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <FaLock />
                  Login to Checkout
                </Button>
              </Link>

              <p className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-500 font-medium hover:underline">
                  Sign up
                </Link>
              </p>

              <div className="pt-2 space-y-2">
                {[
                  "Your cart items will be saved",
                  "Track your orders easily",
                  "Access exclusive member deals",
                ].map((text) => (
                  <p key={text} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {text}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}