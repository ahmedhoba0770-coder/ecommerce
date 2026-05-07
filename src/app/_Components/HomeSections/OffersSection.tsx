import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

export default function OffersSection() {
  return (
    <section className='bg-white py-10 px-5'>
        <div className='grid md:grid-cols-2 gap-6'>
            <div className='relative overflow-hidden rounded-2xl bg-linear-to-br from-stone-500 to-stone-700 p-8 text-white'>
                <div className='inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4'>
                    <span>🔥</span>
                    <span>Deal of the Day</span>
                </div>
                <h3 className='text-2xl md:text-3xl font-bold mb-2'>Fresh Organic Fruits</h3>
                <p className='text-white/80 mb-4'>Get up to 40% off on selected organic fruits</p>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='text-3xl font-bold'>
                        <span>40% OFF</span>
                    </div>
                    <div className='text-sm text-white/70'>
                        <span>Use code:</span>
                        <span className='font-bold text-white'>ORGANIC40</span>
                    </div>
                </div>
                <Link href="/products" className='inline-flex items-center gap-2 bg-white text-stone-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
                    <span>Shop Now</span>
                    <span><FaLongArrowAltRight /></span>
                </Link>
            </div>
            <div className='relative overflow-hidden rounded-2xl bg-linear-to-br from-mauve-500 to-mauve-700 p-8 text-white'>
                <div className='inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4'>
                    <span>🔥</span>
                    <span>Deal of the Day</span>
                </div>
                <h3 className='text-2xl md:text-3xl font-bold mb-2'>Fresh Organic Fruits</h3>
                <p className='text-white/80 mb-4'>Get up to 40% off on selected organic fruits</p>
                <div className='flex items-center gap-4 mb-6'>
                    <div className='text-3xl font-bold'>
                        <span>40% OFF</span>
                    </div>
                    <div className='text-sm text-white/70'>
                        <span>Use code:</span>
                        <span className='font-bold text-white'>ORGANIC40</span>
                    </div>
                </div>
                <Link href="/products" className='inline-flex items-center gap-2 bg-white text-mauve-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'>
                    <span>Shop Now</span>
                    <span><FaLongArrowAltRight /></span>
                </Link>
            </div>
        </div>
    </section>
  )
}
