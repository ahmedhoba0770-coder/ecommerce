"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useCartStore } from "@/store/cartStore"
import { createCashOrder, createCheckoutSession } from "@/app/_Services/checkoutService"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { FaHome, FaLock, FaShieldAlt, FaCreditCard } from "react-icons/fa"
import { TbTruckDelivery } from "react-icons/tb"
import { MdReceiptLong } from "react-icons/md"
import { IoArrowBack } from "react-icons/io5"
import { BsBuilding, BsPhone } from "react-icons/bs"
import { HiLocationMarker } from "react-icons/hi"

// ─── Zod Schema ───────────────────────────────────────────
const checkoutSchema = z.object({
  city: z.string().min(1, "City is required"),
  details: z.string().min(1, "Street address is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[0-9]{9}$/, "Enter a valid Egyptian phone number"),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>
type PaymentMethod = "cash" | "online"

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { apiItems, cartId, totalPrice, fetchCart } = useCartStore()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  useEffect(() => {
    if (session) {
      fetchCart((session as any).accessToken)
    }
  }, [session])

  const onSubmit = async (formData: CheckoutFormData) => {
    if (!cartId) return toast.error("Your cart is empty")

    setSubmitting(true)
    try {
      const token = (session as any).accessToken

      if (paymentMethod === "cash") {
        await createCashOrder(token, cartId, formData)
        toast.success("Order placed successfully! 🎉")
        router.push("/orders")
      } else {
        const data = await createCheckoutSession(token, cartId, formData)
        window.location.href = data.session.url
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const totalItems = apiItems.reduce((sum, item) => sum + item.count, 0)
  const freeShipping = totalPrice > 500

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-stone-600 transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="hover:text-stone-600 transition">Cart</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Checkout</span>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 bg-green-500 text-white rounded-xl flex items-center justify-center text-2xl shadow-md">
            <MdReceiptLong />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
            <p className="text-gray-500 text-sm mt-0.5">Review your items and complete your purchase</p>
          </div>
        </div>
        <Link
          href="/cart"
          className="flex items-center gap-2 text-green-600 hover:text-green-700 transition text-sm font-medium"
        >
          <IoArrowBack />
          Back to Cart
        </Link>
      </div>

      {/* ─── Main Layout ─── */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8"
      >
        {/* ───────────── LEFT: Form ───────────── */}
        <div className="flex-1 space-y-6">

          {/* Shipping Address Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-green-500 text-white px-6 py-5 flex items-center gap-3">
              <FaHome className="text-xl" />
              <div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
                <p className="text-green-100 text-sm">Where should we deliver your order?</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-5">
              {/* Info banner */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
                <div className="h-6 w-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  i
                </div>
                <div>
                  <p className="text-blue-700 font-semibold text-sm">Delivery Information</p>
                  <p className="text-blue-500 text-xs mt-0.5">Please ensure your address is accurate for smooth delivery</p>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BsBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    {...register("city")}
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 text-sm outline-none transition
                      ${errors.city ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-400"}`}
                  />
                </div>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <HiLocationMarker className="absolute left-4 top-4 text-gray-400 text-sm" />
                  <textarea
                    {...register("details")}
                    placeholder="Street name, building number, floor, apartment..."
                    rows={3}
                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl border-2 text-sm outline-none transition resize-none
                      ${errors.details ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-400"}`}
                  />
                </div>
                {errors.details && (
                  <p className="text-red-500 text-xs mt-1">{errors.details.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BsPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    {...register("phone")}
                    placeholder="01xxxxxxxxx"
                    maxLength={11}
                    className={`w-full pl-10 pr-32 py-3.5 rounded-xl border-2 text-sm outline-none transition
                      ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-green-400"}`}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    Egyptian numbers only
                  </span>
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-green-500 text-white px-6 py-5 flex items-center gap-3">
              <FaCreditCard className="text-xl" />
              <div>
                <h2 className="text-xl font-bold">Payment Method</h2>
                <p className="text-green-100 text-sm">Choose how you'd like to pay</p>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              {/* Cash on Delivery */}
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`w-full rounded-xl border-2 p-4 flex items-center justify-between transition
                  ${paymentMethod === "cash" ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl transition
                    ${paymentMethod === "cash" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                    💵
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Pay when your order arrives at your doorstep</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition
                  ${paymentMethod === "cash" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                  {paymentMethod === "cash" && <div className="h-2 w-2 bg-white rounded-full" />}
                </div>
              </button>

              {/* Pay Online */}
              <button
                type="button"
                onClick={() => setPaymentMethod("online")}
                className={`w-full rounded-xl border-2 p-4 flex items-center justify-between transition
                  ${paymentMethod === "online" ? "border-green-400 bg-green-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-xl transition
                    ${paymentMethod === "online" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                    💳
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Pay Online</p>
                    <p className="text-sm text-gray-500">Secure payment with Credit/Debit Card via Stripe</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {["VISA", "MC", "AMEX"].map((brand) => (
                        <span key={brand} className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-300 text-gray-600 bg-white">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition
                  ${paymentMethod === "online" ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                  {paymentMethod === "online" && <div className="h-2 w-2 bg-white rounded-full" />}
                </div>
              </button>

              {/* SSL badge */}
              <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-3">
                <FaShieldAlt className="text-green-500 text-xl shrink-0" />
                <div>
                  <p className="text-green-700 font-semibold text-sm">Secure & Encrypted</p>
                  <p className="text-green-500 text-xs">Your payment info is protected with 256-bit SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───────────── RIGHT: Order Summary ───────────── */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm sticky top-4">

            <div className="bg-green-500 text-white px-6 py-5">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <p className="text-green-100 text-sm mt-0.5">{totalItems} items</p>
            </div>

            {/* Items list */}
            <div className="px-4 py-4 max-h-64 overflow-y-auto space-y-3 border-b border-gray-100">
              {apiItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                    <p className="text-xs text-gray-400">{item.count} × {item.price} EGP</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 shrink-0">
                    {item.price * item.count}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{totalPrice} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm pb-4 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <TbTruckDelivery className="text-green-500" />
                  <span>Shipping</span>
                </div>
                <span className={freeShipping ? "text-green-500 font-semibold" : "font-medium text-gray-900"}>
                  {freeShipping ? "FREE" : "Calculated"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">Total</span>
                <div>
                  <span className="text-2xl font-bold text-green-500">{totalPrice}</span>
                  <span className="text-sm text-gray-400 ml-1">EGP</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6 space-y-3">
              <button
                type="submit"
                disabled={submitting || apiItems.length === 0}
                className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed
                  text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FaLock className="text-sm" />
                    Place Order
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 pt-1">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <FaShieldAlt className="text-green-500" />
                  Secure
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <TbTruckDelivery className="text-green-500" />
                  Fast Delivery
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span className="text-orange-400">↩</span>
                  Easy Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
