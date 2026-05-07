import { getAllCategories } from '@/app/_Services/allCategories';
import { Category } from '@/app/_Types/category';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

type Props = {
  variant?: 'compact' | 'full'
  showTitle?: boolean
}

export default async function CategoriesSection({ variant = 'compact', showTitle = true }: Props) {
  const categories: Category[] = await getAllCategories()

  return (
    <section className='bg-white py-10 px-5'>
      {showTitle && (
      <div className='flex flex-col sm:flex-row justify-between sm:items-center mb-8'>
        <div className='flex items-center gap-3 my-8'>
          <div className='h-8 w-1.5 bg-linear-to-b from-stone-500 to-stone-700 rounded-full'></div>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Shop By <span className='text-stone-600'>Category</span>
          </h2>
        </div>
        {variant === 'compact' && (
          <Link href="/categories" className='text-stone-600 self-end sm:self-auto hover:text-stone-700 font-medium flex items-center cursor-pointer'>
            View All Categories<span className='ml-2'><FaLongArrowAltRight /></span>
          </Link>
        )}
      </div>
      )}

      {variant === 'compact' ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className='bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer'
            >
              <Image
                src={cat.image}
                alt={cat.name}
                height={80}
                width={80}
                className='w-20 h-20 mx-auto rounded-full object-cover'
              />
              <h3 className='font-medium mt-2'>{cat.name}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className='group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-stone-200 transition-all duration-300 hover:-translate-y-1'
            >
              <div className='relative h-50 w-full overflow-hidden'>
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className='object-cover group-hover:scale-105 transition duration-300'
                />
                <div className='absolute inset-0 bg-black/20 group-hover:bg-black/30 transition' />
              </div>
                <h3 className='text-black text-center font-bold text-lg drop-shadow pt-2'>{cat.name}</h3>
              <div className='px-4 py-1 flex items-center justify-between opacity-0 group-hover:opacity-100'>
                <span className='text-sm text-green-500 font-medium'>View Subcategories</span>
                <FaLongArrowAltRight className='text-green-500' />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}