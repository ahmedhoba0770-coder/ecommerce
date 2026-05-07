import Image from 'next/image'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import RegisterForm from '@/app/_Components/forms/RegisterForm';
import { Button } from '@/components/ui/button';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import Link from 'next/link';


 export default function Register() {
  return (
    <section className='bg-linear-to-r from-stone-100 via-stone-200 to-stone-300 py-10 px-4'>
      <div className='relative container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4'>
        <div className='absolute w-96 h-96 bg-stone-400/80 rounded-full blur-3xl top-50 right-10 '></div>
        <div>
          <h1 className='text-4xl font-bold'>Welcome to <span className='text-stone-600'>FreshCart</span></h1>
          <p className='text-xl mt-2 mb-4'>Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
          <ul className='*:flex *:items-start *:gap-4 space-y-6 my-8'>
            <li>
              <div className='icon size-12 text-lg bg-mauve-500 text-white rounded-full flex justify-center items-center'>
                <FaStar />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Premium Quality</h2>
                <p className='text-gray-600'>Premium quality products sourced from trusted suppliers.</p>
              </div>
            </li>
            <li>
              <div className='icon size-12 text-lg bg-mauve-500 text-white rounded-full flex justify-center items-center'>
                <TbTruckDelivery />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Fast Delivery</h2>
                <p className='text-gray-600'>Same-day delivery available in most areas</p>
              </div>
            </li>
            <li>
              <div className='icon size-12 text-lg bg-mauve-500 text-white rounded-full flex justify-center items-center'>
                <FaShieldAlt />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>Secure Shopping</h2>
                <p className='text-gray-600'>Your data and payments are completely secure</p>
              </div>
            </li>
          </ul>
          <div className='bg-white shadow-sm p-4 rounded-md'>
            <div className='flex items-center gap-4 mb-4'>
              <Image
              src="/review-author.webp"
              width={48}
              height={48}
              alt='review image'
              className='size-12 rounded-full'
              />
              <div>
                <h3>Sarah Johnson</h3>
                <div className='*:text-yellow-300 flex items-center'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <p className='italic text-gray-600'>
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>
        <div className='bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-6 py-10'>
          <h2 className='text-center text-3xl font-semibold mb-2'>Create Your Account</h2>
          <p className='text-center'>Start your fresh journey with us today</p>
          <div className='flex gap-2 *:grow my-10'>
            <Button className='btn bg-white text-black cursor-pointer h-10 border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed'>
              <span className='text-red-600'><FaGoogle /></span>
              Google
            </Button>
            <Button className='btn bg-white text-black cursor-pointer h-10 border border-gray-300 hover:bg-gray-100 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed'>
              <span className='text-blue-600'><FaFacebookF /></span>
              Facebook
            </Button>
          </div>
          <RegisterForm/>
          <p className='border-t pt-10 border-gray-400/30 my-4 text-center'>
          Already have an account? <Link href="login" className='text-blue-900 hover:underline font-medium'>Sign In</Link>
          </p>
        </div>
      </div>
    </section>
  )
}
