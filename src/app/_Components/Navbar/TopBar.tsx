import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { IoGift } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from 'next/link';
import TopBarAuth from "./TopBarAuth"




export default function TopBar() {
  return (
    <div className='mx-auto px-4 bg-black'>
        <div className='flex justify-between items-center h-8'>
            <div className='flex items-center gap-6 text-gray-300'>
                <div className='flex items-center gap-2'>
                    <span className='text-slate-300'><TbTruckDelivery /></span>
                    <span>Free Shipping on Orders 500 EGP</span>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='text-slate-300'><IoGift /></span>
                    <span>New Arrivals Daily</span>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-4 text-gray-300'>
                    <a href="tel:+201115264736" className='flex items-center gap-1.5 hover:text-stone-200 transition-colors'>
                        <span><FaPhoneAlt /></span>
                        <span>+1 (800) 123-4567</span>
                    </a>
                    <a href="mailto:ahmedhoba0770@gmail.com" className='flex items-center gap-1.5 hover:text-stone-200 transition-colors'>
                        <span><IoMdMail /></span>
                        <span>ahmedhoba0770@gmail.com</span>
                    </a>
                </div>
                <span className='w-px h-4 bg-gray-500'></span>
                <TopBarAuth />  
            </div>
        </div>
    </div>
  )
}
