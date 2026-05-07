import CartItems from "./_components/CartItems"
import OrderSummary from "./_components/OrderSummary"
import { HiShoppingCart } from "react-icons/hi2"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-stone-600 transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Shopping Cart</span>
      </div>

      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center gap-3">
        <div className="h-14 w-14 bg-green-500 text-white rounded-xl flex items-center justify-center text-2xl">
          <HiShoppingCart />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        <CartItems />
        <OrderSummary />
      </div>

    </div>
  )
}