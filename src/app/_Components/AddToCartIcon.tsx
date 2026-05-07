"use client"

import AddToCartButton from "@/app/_Components/AddToCartButton"
import { FaPlus } from "react-icons/fa6"
import { Spinner } from "@/components/ui/spinner"

type Props = {
  productId: string
  product: {
    id: string
    title: string
    price: number
    image: string
  }
}

export default function AddToCartIcon({ productId, product }: Props) {
  return (
    <AddToCartButton productId={productId} product={product}>
      {(loading) => (
        <button
          disabled={loading}
          className='h-10 w-10 rounded-full flex items-center justify-center transition bg-stone-600 text-white hover:bg-stone-700 disabled:opacity-70'
        >
          {loading ? <Spinner className="size-4" /> : <FaPlus />}
        </button>
      )}
    </AddToCartButton>
  )
}