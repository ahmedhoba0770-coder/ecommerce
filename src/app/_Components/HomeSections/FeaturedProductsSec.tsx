import { getAllProducts } from '@/app/_Services/allProducts'
import { Product } from '@/app/_Types/product'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import AddToCartIcon from '@/app/_Components/AddToCartIcon'
import WishlistButton from '../WishlistButton'

export default async function FeaturedProductsSec({
  showTitle = true,
  subcategory,
  subcategoryName,
  brand,
  brandName,
}: {
  showTitle?: boolean
  subcategory?: string
  subcategoryName?: string
  brand?: string
  brandName?: string
}) {
  const { products, count }: { products: Product[], count: number } = await getAllProducts(subcategory, brand)
    return <>
    <section className='py-10 px-5'>
        {(subcategory || brand) && (
  <div className="mb-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-gray-500 text-sm flex items-center gap-1">
        Active Filters:
      </span>
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
        {subcategoryName ?? brandName}
        <Link href="/products" className="text-green-700 hover:text-red-500">✕</Link>
      </span>
      <Link href="/products" className="text-gray-500 text-sm underline hover:text-red-500">
        Clear all
      </Link>
    </div>
    <p className="text-sm text-gray-500">Showing {count} products</p>
  </div>
)}
        <div>
            {showTitle && (
                <div className='flex items-center gap-3 my-8'>
                    <div className='h-8 w-1.5 bg-linear-to-b from-stone-500 to-stone-700 rounded-full'></div>
                    <h2 className='text-3xl font-bold text-gray-800'>Featured <span className='text-stone-600'>Products</span></h2>
                </div>
            )}
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {products.map((p) => (
                    <div key={p._id} className='relative bg-white rounded-lg border border-gray-300 w-55 overflow-hidden'>
                    <div className='absolute top-3 right-3 flex flex-col space-y-2'>
                        <WishlistButton product={p} />
                        <Link href={`/products/${p._id}`} className='bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-stone-600 shadow-sm'>
                            <FaRegEye />
                        </Link>
                    </div>
                    {p.priceAfterDiscount && (
                        <div className='absolute top-3 left-3'>
                            <span className='bg-red-500 text-white text-xs px-2 py-1 rounded'>
                                {Math.round(((p.price - p.priceAfterDiscount) / p.price) * 100)}%
                            </span>
                        </div>    
                    )}
                    <Image
                    className='w-full h-60 object-contain bg-white'
                    src={p.imageCover}
                    alt={p.slug}
                    width={219}
                    height={240}
                    />
                    <div className='p-4'>
                        <div className='text-xs text-gray-500 mb-1'>{p.category.name}</div>
                            <Link href={`/products/${p._id}`} className='line-clamp-2'>
                                <span>{p.title}</span>
                            </Link>
                            <div className='flex items-center mb-2'>
                                <span className='text-xs text-gray-500'>{p.ratingsAverage} {p.ratingsQuantity}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='text-lg font-bold text-stone-600'>{p.priceAfterDiscount ?? p.price}</span>
                                {p.priceAfterDiscount && (
                                    <div>
                                        <span className='text-sm text-gray-500 line-through ml-2'>{p.price}</span>
                                    </div>
                                )}
                                <AddToCartIcon
                                productId={p._id}
                                product={{
                                    id: p._id,
                                    title: p.title,
                                    price: p.priceAfterDiscount ?? p.price,
                                    image: p.imageCover,
                                }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  </>
}
