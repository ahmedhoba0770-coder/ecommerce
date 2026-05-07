"use client"

import { useEffect } from "react"
import { useCartStore } from "@/store/cartStore"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa"
import { MdDeleteSweep } from "react-icons/md"
import { IoArrowBack } from "react-icons/io5"
import toast from "react-hot-toast"

export default function CartItems() {
  const { data: session } = useSession()

  // ✅ الـ token دايماً من session.user.token
  const token = session?.user?.token

  const {
    localItems, removeLocalItem, increaseLocal, decreaseLocal, clearLocal,
    apiItems, loading, fetchCart, updateApiItem, removeApiItem, clearApiItems,
  } = useCartStore()

  useEffect(() => {
    if (token) fetchCart(token)
  }, [token])

  const isLoggedIn = !!session
  const items = isLoggedIn ? apiItems : localItems

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-24">
      <div className="w-10 h-10 border-4 border-stone-300 border-t-stone-600 rounded-full animate-spin" />
    </div>
  )

  if (items.length === 0) return (
    <div className="flex-1 text-center py-24">
      <p className="text-gray-400 text-lg">Your cart is empty</p>
      <Link href="/" className="text-stone-600 hover:underline text-sm mt-2 block">
        Start Shopping
      </Link>
    </div>
  )

  return (
    <div className="flex-1 space-y-4">
      {isLoggedIn ? (
        apiItems.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm">
            <div className="h-24 w-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
              <Image src={item.product.imageCover} alt={item.product.title} width={96} height={96} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.product.title}</h3>
              <p className="text-green-500 font-bold text-lg mt-1">{item.price} EGP</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => token && updateApiItem(token, item.product._id, item.count - 1)}
                  disabled={item.count === 1}
                  className="h-8 w-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-stone-300 transition disabled:opacity-40"
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="w-10 text-center font-semibold text-gray-900">{item.count}</span>
                <button
                  onClick={() => token && updateApiItem(token, item.product._id, item.count + 1)}
                  className="h-8 w-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <button
                onClick={() => {
                  if (!token) return
                  removeApiItem(token, item.product._id)
                  toast.success("Item removed")
                }}
                className="h-9 w-9 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition"
              >
                <FaTrash className="text-sm" />
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {item.price * item.count} <span className="text-sm font-normal text-gray-400">EGP</span>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        localItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-5 flex items-center gap-5 shadow-sm">
            <div className="h-24 w-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
              <Image src={item.image} alt={item.title} width={96} height={96} className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
              <p className="text-green-500 font-bold text-lg mt-1">{item.price} EGP</p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => decreaseLocal(item.id)}
                  disabled={item.quantity === 1}
                  className="h-8 w-8 rounded-lg border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-stone-300 transition disabled:opacity-40"
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="w-10 text-center font-semibold text-gray-900">{item.quantity}</span>
                <button
                  onClick={() => increaseLocal(item.id)}
                  className="h-8 w-8 rounded-lg bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <button
                onClick={() => { removeLocalItem(item.id); toast.success("Item removed") }}
                className="h-9 w-9 bg-red-50 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-100 transition"
              >
                <FaTrash className="text-sm" />
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-400">Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {item.price * item.quantity} <span className="text-sm font-normal text-gray-400">EGP</span>
                </p>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Bottom Actions */}
      <div className="flex items-center justify-between pt-2">
        <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-stone-600 transition text-sm">
          <IoArrowBack />
          Continue Shopping
        </Link>
        <button
          onClick={() => {
            if (isLoggedIn && token) {
              clearApiItems(token)
            } else {
              clearLocal()
            }
            toast.success("Cart cleared")
          }}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 transition text-sm"
        >
          <MdDeleteSweep className="text-lg" />
          Clear all items
        </button>
      </div>
    </div>
  )
}
