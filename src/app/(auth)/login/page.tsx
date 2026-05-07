import Image from 'next/image'
import React from 'react'
import { IoIosTime } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { FaShieldAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import Link from 'next/link';
import LoginForm from '@/app/_Components/forms/LoginForm';
import LogoIMG from "../../_Components/LogoIMG";


export default function Login() {
  return (
        <section className='bg-linear-to-r from-stone-100 via-stone-200 to-stone-300 py-10 px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto'>
            <div className='absolute w-96 h-96 bg-stone-400/80 rounded-full blur-3xl top-50 right-10 '></div>
            <div className='text-center space-y-6'>
              <Image
              src={"/loginIMG.png"}
              width={600}
              height={384}
              alt='Login Image'
              className='w-full h-96 object-cover rounded-2xl shadow-lg'
              />
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold text-gray-800'>
                  Welcome Back!
                </h2>
                <p className='text-lg text-gray-600'>
                  Sign in to continue your fresh shopping experience
                </p>
                <div className='flex items-center justify-center space-x-8 text-sm text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <span className='text-stone-600'><TbTruckDelivery/></span>
                    <span>Free Delivery</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='text-stone-600'><FaShieldAlt/></span>
                    <span>Secure Payment</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <span className='text-stone-600'><IoIosTime/></span>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white/20 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl px-6 py-10'>
              <span className='flex items-center justify-center mb-2'><LogoIMG/></span>
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
              <LoginForm/>
              <p className='border-t pt-10 border-gray-400/30 my-4 text-center'>
              New to FreshCart? <Link href="register" className='text-blue-900 hover:underline font-medium'>Create an account</Link>
              </p>
            </div>
          </div>
        </section>
  )
}
