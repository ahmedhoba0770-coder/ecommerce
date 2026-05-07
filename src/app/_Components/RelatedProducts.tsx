'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaStar, FaRegStar, FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa'
import { IoAddCircle } from 'react-icons/io5'

interface RelatedProduct {
  _id: string
  title: string
  price: number
  priceAfterDiscount?: number
  imageCover: string
  ratingsAverage: number
  ratingsQuantity: number
  category: { _id: string; name: string }
}

interface Props {
  categoryId: string
  currentProductId: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className='flex items-center gap-0.5 text-xs text-yellow-400'>
      {[1, 2, 3, 4, 5].map(i =>
        i <= Math.round(rating)
          ? <FaStar key={i} />
          : <FaRegStar key={i} className='text-gray-300' />
      )}
    </div>
  )
}

export default function RelatedProducts({ categoryId, currentProductId }: Props) {
  const [products, setProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [wished, setWished] = useState<Set<string>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=12`)
      .then(r => r.json())
      .then(data => {
        const filtered = (data.data || []).filter((p: RelatedProduct) => p._id !== currentProductId)
        setProducts(filtered)
      })
      .finally(() => setLoading(false))
  }, [categoryId, currentProductId])

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' })
  }

  const toggleWish = (id: string) => {
    setWished(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (loading) return (
    <div className='space-y-4'>
      <div className='h-7 w-48 bg-stone-100 rounded-lg animate-pulse' />
      <div className='flex gap-4'>
        {[...Array(5)].map((_, i) => (
          <div key={i} className='w-52 shrink-0 bg-stone-50 rounded-2xl h-72 animate-pulse' />
        ))}
      </div>
    </div>
  )

  if (!products.length) return null

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between mb-5'>
        <h2 className='text-xl font-bold text-gray-900 flex items-center gap-2'>
          <span className='w-1 h-6 bg-[#b5a0a8] rounded-full inline-block' />
          You May Also{' '}
          <span className='text-[#9b7e8a]'>Like</span>
        </h2>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => scroll('left')}
            className='h-9 w-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors'
          >
            <FaChevronLeft size={13} />
          </button>
          <button
            onClick={() => scroll('right')}
            className='h-9 w-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors'
          >
            <FaChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className='flex gap-4 overflow-x-auto pb-2 scroll-smooth'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(product => {
          const discountPct = product.priceAfterDiscount
            ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
            : null

          return (
            <div
              key={product._id}
              className='w-[200px] shrink-0 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group'
            >
              {/* Image */}
              <div className='relative h-[170px] bg-stone-50 overflow-hidden'>
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />

                {/* Discount badge */}
                {discountPct && (
                  <span className='absolute top-2 left-2 bg-[#9b7e8a] text-white text-xs font-semibold px-2 py-0.5 rounded-full'>
                    -{discountPct}%
                  </span>
                )}

                {/* Action buttons */}
                <div className='absolute top-2 right-2 flex flex-col gap-1.5'>
                  <button
                    onClick={() => toggleWish(product._id)}
                    className='h-8 w-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform'
                  >
                    {wished.has(product._id)
                      ? <FaHeart className='text-[#c87a8a]' size={14} />
                      : <FaRegHeart className='text-gray-400' size={14} />
                    }
                  </button>
                  <Link
                    href={`/products/${product._id}`}
                    className='h-8 w-8 bg-white rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform'
                  >
                    {/* eye icon via SVG */}
                    <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className='text-gray-500'>
                      <path d='M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z'/>
                      <circle cx='12' cy='12' r='3'/>
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Info */}
              <div className='p-3'>
                <p className='text-xs text-stone-400 mb-0.5'>{product.category.name}</p>
                <h3 className='text-sm font-semibold text-gray-800 leading-tight line-clamp-2 mb-1.5'>
                  {product.title}
                </h3>

                <div className='flex items-center gap-1 mb-2'>
                  <StarRating rating={product.ratingsAverage} />
                  <span className='text-xs text-gray-400'>
                    {product.ratingsAverage} ({product.ratingsQuantity})
                  </span>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    {product.priceAfterDiscount ? (
                      <div className='flex items-center gap-1.5'>
                        <span className='text-sm font-bold text-[#9b7e8a]'>
                          {product.priceAfterDiscount} EGP
                        </span>
                        <span className='text-xs text-gray-400 line-through'>
                          {product.price}
                        </span>
                      </div>
                    ) : (
                      <span className='text-sm font-bold text-gray-800'>
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  <button className='h-8 w-8 bg-[#9b7e8a] hover:bg-[#8a6d77] text-white rounded-full flex items-center justify-center transition-colors shadow-sm'>
                    <IoAddCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}