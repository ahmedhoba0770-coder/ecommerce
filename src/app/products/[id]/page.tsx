import { getOneProduct } from '@/app/_Services/oneProduct'
import { Product } from '@/app/_Types/product'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { FaHome } from "react-icons/fa";
import ImageGallery from '@/app/_Components/ImageGallery';
import Link from 'next/link';
import {
  Card,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FaStar, FaRegStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { MdInventory2 } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import ProductActions from '@/app/_Components/ProductActions'
import RelatedProducts from '@/app/_Components/RelatedProducts'


type Props = {
    params: Promise<{id: string}>
}

interface Review {
  _id: string
  review: string
  rating: number
  user: { _id: string; name: string }
  createdAt: string
}

async function getProductReviews(productId: string): Promise<Review[]> {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    return data.data || []
  } catch {
    return []
  }
}

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const starSize = size === 'md' ? 'text-xl' : 'text-sm'
  return (
    <div className={`flex items-center gap-0.5 ${starSize} text-yellow-400`}>
      {[1,2,3,4,5].map(i => (
        i <= Math.round(rating)
          ? <FaStar key={i} />
          : <FaRegStar key={i} className="text-gray-300" />
      ))}
    </div>
  )
}

export default async function ProductDetails({params}: Props) {
    const {id} = await params
    const product: Product = await getOneProduct(id)
    if (!product) return <div>Product not found</div>

    const reviews = await getProductReviews(id)

    // Calculate rating distribution
    const ratingCounts = [5,4,3,2,1].map(star => ({
      star,
      count: reviews.filter(r => Math.round(r.rating) === star).length,
      pct: reviews.length
        ? Math.round((reviews.filter(r => Math.round(r.rating) === star).length / reviews.length) * 100)
        : 0,
    }))

    return <>
        <nav className='py-4 px-4'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                    <div className='flex items-center gap-1'>
                        <FaHome />
                        <span>Home</span>
                    </div>
                    </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href={`/categories/${product.category._id}`}>{product.category.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbLink href={`/categories/${product.category._id}/${product.subcategory[0]._id}`}>{product.subcategory[0].name}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                    <BreadcrumbPage>{product.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </nav>

        <section className='py-6 px-4'>
            <div className='flex flex-col lg:flex-row gap-8'>

                {/* Images */}
                <div className='lg:w-[310px] shrink-0 sticky top-4 h-fit'>
                    <div className='bg-white rounded-xl shadow-sm p-4'>
                        <ImageGallery images={product.images}/>
                    </div>
                </div>

                {/* Product Details */}
                <div className='flex-1 bg-white rounded-xl shadow-sm p-6'>

                    <div className='flex flex-wrap gap-2 mb-4'>
                        <Link
                            href={`/categories/${product.category._id}`}
                            className='bg-stone-50 text-stone-700 text-xs px-3 py-1.5 rounded-full hover:bg-stone-100 transition'
                        >
                            {product.category.name}
                        </Link>
                        <span className='bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full'>
                            {product.brand.name}
                        </span>
                    </div>

                    <h1 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-3'>
                        {product.title}
                    </h1>

                    <div className='flex items-center gap-3 mb-4'>
                        <div className='text-yellow-400 flex items-center gap-0.5'>
                            {[1,2,3,4,5].map(i => (
                              i <= Math.round(product.ratingsAverage)
                                ? <FaStar key={i} />
                                : <FaRegStar key={i} className="text-gray-300" />
                            ))}
                        </div>
                        <span className='text-sm text-gray-600'>
                            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                        </span>
                    </div>

                    <div className='flex items-center flex-wrap gap-3 mb-6'>
                        <span className='text-3xl font-bold text-gray-900'>
                            {product.priceAfterDiscount || product.price} EGP
                        </span>
                        {product.priceAfterDiscount && (
                            <>
                                <span className='text-lg text-gray-400 line-through'>
                                    {product.price} EGP
                                </span>
                                <span className='bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium'>
                                    -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                                </span>
                            </>
                        )}
                    </div>

                    <span className='flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700 w-fit mb-3'>
                        <GoDotFill />
                        In Stock ({product.quantity} available)
                    </span>

                    <div className='border-t border-gray-100 pt-5 mb-6'>
                        <p className='text-gray-600 leading-relaxed'>
                            {product.description}
                        </p>
                    </div>

                    <ProductActions
                        product={{
                            id: product._id,
                            title: product.title,
                            price: product.priceAfterDiscount ?? product.price,
                            image: product.imageCover,
                            quantity: product.quantity,
                        }}
                    />

                    <div className='border-t border-gray-100 pt-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                            <div className='flex items-center gap-3'>
                                <div className='h-10 w-10 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center shrink-0'>
                                    <TbTruckDelivery size={18} />
                                </div>
                                <div>
                                    <h4 className='font-medium text-gray-900 text-sm'>Free Delivery</h4>
                                    <p className='text-xs text-gray-500'>Orders over $50</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='h-10 w-10 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center shrink-0'>
                                    <GiReturnArrow size={16} />
                                </div>
                                <div>
                                    <h4 className='font-medium text-gray-900 text-sm'>Money back</h4>
                                    <p className='text-xs text-gray-500'>30 Days Return</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div className='h-10 w-10 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center shrink-0'>
                                    <FaShieldAlt size={16} />
                                </div>
                                <div>
                                    <h4 className='font-medium text-gray-900 text-sm'>Secure Payment</h4>
                                    <p className='text-xs text-gray-500'>100% Protected</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* ── Tabs Section ── */}
        <section className='py-8 px-4'>
            <div className='bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden'>
                <Tabs defaultValue="product-details" className="w-full">

                    <TabsList variant="line" className='border-b border-gray-200 w-full py-0 px-6 h-auto bg-transparent'>
                        <TabsTrigger
                            value="product-details"
                            className='flex items-center gap-2 py-4 px-4 text-sm font-medium data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none'
                        >
                            <MdInventory2 size={16} />
                            Product Details
                        </TabsTrigger>
                        <TabsTrigger
                            value="reviews"
                            className='flex items-center gap-2 py-4 px-4 text-sm font-medium data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none'
                        >
                            <FaStar size={14} />
                            Reviews ({reviews.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="shipping"
                            className='flex items-center gap-2 py-4 px-4 text-sm font-medium data-[state=active]:text-green-600 data-[state=active]:border-b-2 data-[state=active]:border-green-600 rounded-none'
                        >
                            <TbTruckDelivery size={16} />
                            Shipping &amp; Returns
                        </TabsTrigger>
                    </TabsList>

                    {/* ── Tab 1: Product Details ── */}
                    <TabsContent value="product-details" className='p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-2'>About this Product</h3>
                        <p className='text-gray-600 leading-relaxed mb-6'>{product.description}</p>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            {/* Product Information */}
                            <div className='bg-gray-50 rounded-xl p-5'>
                                <h4 className='font-semibold text-gray-900 mb-4'>Product Information</h4>
                                <ul className='space-y-3'>
                                    {[
                                        { label: 'Category', value: product.category.name },
                                        { label: 'Subcategory', value: product.subcategory[0].name },
                                        { label: 'Brand', value: product.brand.name },
                                        { label: 'Items Sold', value: `${product.sold}+ sold` },
                                    ].map(({ label, value }) => (
                                        <li key={label} className='flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0'>
                                            <span className='text-gray-500'>{label}</span>
                                            <span className='text-gray-900 font-medium'>{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Key Features */}
                            <div className='bg-gray-50 rounded-xl p-5'>
                                <h4 className='font-semibold text-gray-900 mb-4'>Key Features</h4>
                                <ul className='space-y-3'>
                                    {[
                                        'Premium Quality Product',
                                        '100% Authentic Guarantee',
                                        'Fast & Secure Packaging',
                                        'Quality Tested',
                                    ].map(feature => (
                                        <li key={feature} className='flex items-center gap-2 text-sm text-gray-700'>
                                            <BsCheckCircleFill className='text-green-500 shrink-0' size={15} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </TabsContent>

                    {/* ── Tab 2: Reviews ── */}
                    <TabsContent value="reviews" className='p-6'>
                        {/* Rating Summary */}
                        <div className='flex flex-col sm:flex-row gap-8 mb-8'>
                            <div className='flex flex-col items-center justify-center shrink-0'>
                                <span className='text-6xl font-bold text-gray-900 leading-none'>{product.ratingsAverage}</span>
                                <StarRating rating={product.ratingsAverage} size='md' />
                                <span className='text-sm text-gray-500 mt-1'>Based on {reviews.length} reviews</span>
                            </div>

                            <div className='flex-1 space-y-2'>
                                {ratingCounts.map(({ star, pct }) => (
                                    <div key={star} className='flex items-center gap-3'>
                                        <span className='text-sm text-gray-600 w-10 shrink-0'>{star} star</span>
                                        <div className='flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                                            <div
                                                className='bg-yellow-400 h-2.5 rounded-full transition-all duration-500'
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className='text-sm text-gray-600 w-8 text-right'>{pct}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Individual Reviews */}
                        <div className='space-y-4'>
                            {reviews.map(review => (
                                <div key={review._id} className='border border-gray-100 rounded-xl p-4 bg-gray-50'>
                                    <div className='flex items-start justify-between mb-2'>
                                        <div>
                                            <p className='font-medium text-gray-900 text-sm'>{review.user.name}</p>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <span className='text-xs text-gray-400'>
                                            {new Date(review.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}
                                        </span>
                                    </div>
                                    <p className='text-sm text-gray-600 leading-relaxed'>{review.review}</p>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {/* ── Tab 3: Shipping & Returns ── */}
                    <TabsContent value="shipping" className='p-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
                            {/* Shipping */}
                            <div className='bg-green-50 rounded-xl p-5'>
                                <div className='flex items-center gap-3 mb-4'>
                                    <div className='h-11 w-11 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0'>
                                        <TbTruckDelivery size={20} />
                                    </div>
                                    <h4 className='font-semibold text-gray-900'>Shipping Information</h4>
                                </div>
                                <ul className='space-y-2.5'>
                                    {[
                                        'Free shipping on orders over $50',
                                        'Standard delivery: 3-5 business days',
                                        'Express delivery available (1-2 business days)',
                                        'Track your order in real-time',
                                    ].map(item => (
                                        <li key={item} className='flex items-start gap-2 text-sm text-gray-700'>
                                            <BsCheckCircleFill className='text-green-500 shrink-0 mt-0.5' size={14} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Returns */}
                            <div className='bg-green-50 rounded-xl p-5'>
                                <div className='flex items-center gap-3 mb-4'>
                                    <div className='h-11 w-11 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0'>
                                        <GiReturnArrow size={18} />
                                    </div>
                                    <h4 className='font-semibold text-gray-900'>Returns &amp; Refunds</h4>
                                </div>
                                <ul className='space-y-2.5'>
                                    {[
                                        '30-day hassle-free returns',
                                        'Full refund or exchange available',
                                        'Free return shipping on defective items',
                                        'Easy online return process',
                                    ].map(item => (
                                        <li key={item} className='flex items-start gap-2 text-sm text-gray-700'>
                                            <BsCheckCircleFill className='text-green-500 shrink-0 mt-0.5' size={14} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Buyer Protection */}
                        <div className='bg-gray-50 rounded-xl p-5 flex items-center gap-4'>
                            <div className='h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0'>
                                <FaShieldAlt size={22} />
                            </div>
                            <div>
                                <h4 className='font-semibold text-gray-900 mb-1'>Buyer Protection Guarantee</h4>
                                <p className='text-sm text-gray-600'>
                                    Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described.
                                    We ensure your shopping experience is safe and secure.
                                </p>
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </div>
        </section>

        {/* ── You May Also Like ── */}
        <section className='py-8 px-4'>
            <RelatedProducts
                categoryId={product.category._id}
                currentProductId={product._id}
            />
        </section>
    </>
}
