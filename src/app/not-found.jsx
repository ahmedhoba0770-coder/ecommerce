'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FaHome } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-stone-50 to-gray-100">

      <h1 className="text-6xl font-bold text-stone-600 mb-4">404</h1>

      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Oops! Nothing Here
      </h2>

      <p className="text-gray-500 max-w-md mb-8">
        Looks like this page went out of stock! Don't worry, there's plenty more to explore.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-stone-600 text-white px-6 py-3 rounded-xl shadow hover:bg-stone-700 transition"
        >
          <FaHome />
          Go to Homepage
        </Link>

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-white border px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          <IoArrowBack />
          Go Back
        </button>
      </div>

      {/* Quick links */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <p className="text-gray-400 mb-4 uppercase text-sm">Popular Destinations</p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/products" className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg">All Products</Link>
          <Link href="/categories" className="px-4 py-2 bg-gray-100 rounded-lg">Categories</Link>
          <Link href="/brands" className="px-4 py-2 bg-gray-100 rounded-lg">Brands</Link>
          <Link href="/contact" className="px-4 py-2 bg-gray-100 rounded-lg">Contact Us</Link>
        </div>
      </div>

    </div>
  )
}