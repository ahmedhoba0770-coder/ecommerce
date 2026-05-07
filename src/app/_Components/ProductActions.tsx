'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { FiShoppingCart, FiHeart, FiShare2, FiMinus, FiPlus } from 'react-icons/fi'
import { BsCartCheckFill } from 'react-icons/bs'
import { Loader2 } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'

interface Props {
  product: {
    id: string
    title: string
    price: number
    image: string
    quantity: number
  }
}

export default function ProductActions({ product }: Props) {
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [loading, setLoading] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const { data: session, status } = useSession()
  const token = session?.user?.token ?? null
  const isSessionLoading = status === 'loading'

  const { addApiItem, addLocalItem } = useCartStore()

  const handleCart = async () => {
    if (isSessionLoading || loading) return
    setLoading(true)
    try {
      if (token) {
        await addApiItem(token, product.id)
      } else {
        addLocalItem({ ...product, quantity: qty })
      }
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 2000)
    } catch (err) {
      console.error('Cart action failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.title, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const isDisabled = loading || isSessionLoading

  return (
    <div className='space-y-4 mb-6'>

      {/* Quantity selector */}
      <div className='flex items-center gap-3'>
        <span className='text-sm font-medium text-gray-700'>Quantity</span>
        <div className='flex items-center border border-gray-200 rounded-xl overflow-hidden'>
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className='h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40'
          >
            <FiMinus size={14} />
          </button>
          <span className='w-12 text-center text-sm font-semibold text-gray-900 tabular-nums'>
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => Math.min(product.quantity, q + 1))}
            disabled={qty >= product.quantity}
            className='h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40'
          >
            <FiPlus size={14} />
          </button>
        </div>
        <span className='text-xs text-gray-400'>{product.quantity} available</span>
      </div>

      {/* Action buttons */}
      <div className='flex flex-wrap gap-3'>

        <button
          onClick={handleCart}
          disabled={isDisabled}
          className={`
            flex-1 min-w-[160px] h-12 flex items-center justify-center gap-2.5
            rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm
            disabled:opacity-60 disabled:cursor-not-allowed
            ${justAdded
              ? 'bg-green-500 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white hover:shadow-md'
            }
          `}
        >
          {isDisabled ? (
            <Loader2 size={18} className='animate-spin' />
          ) : justAdded ? (
            <><BsCartCheckFill size={18} /> Added!</>
          ) : (
            <><FiShoppingCart size={18} /> Add to Cart</>
          )}
        </button>

        <button
          onClick={() => setWished((w) => !w)}
          className={`
            h-12 w-12 rounded-xl flex items-center justify-center border transition-all duration-200
            ${wished
              ? 'bg-red-50 border-red-200 text-red-500'
              : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            }
          `}
          title='Add to Wishlist'
        >
          <FiHeart size={18} className={wished ? 'fill-red-500 stroke-red-500' : ''} />
        </button>

        <button
          onClick={handleShare}
          className='h-12 w-12 rounded-xl flex items-center justify-center border border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200'
          title='Share'
        >
          <FiShare2 size={17} />
        </button>

      </div>
    </div>
  )
}
