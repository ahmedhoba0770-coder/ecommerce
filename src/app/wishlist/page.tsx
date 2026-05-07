"use client"

import { useWishlistStore } from "@/store/wishlistStore"
import { useSession } from "next-auth/react"
import { removeFromWishlistApi } from "@/app/_Services/wishlistService"
import Image from "next/image"
import Link from "next/link"
import { FaHeart, FaTrash } from "react-icons/fa"
import { BsCart3 } from "react-icons/bs"
import AddToCartButton from "@/app/_Components/AddToCartButton"
import toast from "react-hot-toast"

export default function WishlistPage() {
  const { data: session } = useSession()
  const { items, removeFromWishlist } = useWishlistStore()

  const handleRemove = async (id: string) => {
  removeFromWishlist(id)
  toast.success("Removed from wishlist")
  if (session?.user?.token) {
    await removeFromWishlistApi(id, session.user.token)
  }
}

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-gray-800">Wishlist</span>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
            <FaHeart className="text-red-500 text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 text-sm">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <FaHeart className="text-gray-200 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save items you love to your wishlist</p>
            <Link href="/products" className="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 text-sm text-gray-400 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            {/* Items */}
            {items.map((product, i) => (
              <div
                key={product._id}
                className={`grid grid-cols-12 items-center px-6 py-4 ${
                  i !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Product Info */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden shrink-0">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">{product.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{product.category?.name}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 text-center">
                  <span className="font-bold text-gray-900">
                    {product.priceAfterDiscount ?? product.price} EGP
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span className="flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                    In Stock
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  <AddToCartButton
                  productId={product._id}
                  product={{
                    id: product._id,
                    title: product.title,
                    price: product.priceAfterDiscount ?? product.price,
                    image: product.imageCover,
                  }}
                >
                  {(loading) => (
                    <span className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                      <BsCart3 className="text-base" />
                      {loading ? "Adding..." : "Add to Cart"}
                    </span>
                  )}
                  </AddToCartButton>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="w-9 h-9 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100">
              <Link href="/products" className="text-sm text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
