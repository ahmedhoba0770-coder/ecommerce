import React from 'react'
import { MdEmail } from "react-icons/md";
import { BsFillLeafFill } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { FaTag } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";



export default function AppSection() {
  return (
    <section>
        <div className='py-16 px-5 bg-linear-to-b from-white to-gray-50'>
            <div className='bg-linear-to-br from-stone-50 via-white to-mauve-50 rounded-[2.5rem] border border-stone-100/50 shadow-2xl shadow-stone-500/10 overflow-hidden'>
                <div className='relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14'>
                    <div className='lg:col-span-3 space-y-6'>
                        <div className='flex items-center gap-4'>
                            <div className='w-14 h-14 bg-linear-to-br from-stone-500 to-mauve-500 rounded-2xl flex items-center justify-center shadow-lg shadow-stone-500/30'>
                                <span className='text-white text-xl'><MdEmail /></span>
                            </div>
                            <div>
                                <h3 className='text-sm font-semibold text-stone-600 uppercase tracking-wide'></h3>
                                <p className='text-xs text-gray-500'>50,000+ subscribers</p>
                            </div>
                        </div>
                        <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 leading-snug'>
                        Get the Freshest Updates 
                        <span className='text-stone-600'> Delivered Free</span>
                        </h2>
                        <p className='text-gray-500 mt-3 text-lg'>Weekly recipes, seasonal offers & exclusive member perks.</p>
                        <div className='flex flex-wrap gap-3'>
                            <div className='flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-stone-100 px-4 py-2.5 rounded-full shadow-sm'>
                                <div className='w-7 h-7 bg-stone-100 text-stone-600 text-xs rounded-full flex items-center justify-center'>
                                    <BsFillLeafFill />
                                </div>
                                <span className='text-sm font-medium text-gray-700'>Fresh Picks Weekly</span>
                            </div>
                            <div className='flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-stone-100 px-4 py-2.5 rounded-full shadow-sm'>
                                <div className='w-7 h-7 bg-stone-100 text-stone-600 text-xs rounded-full flex items-center justify-center'>
                                    <TbTruckDelivery />
                                </div>
                                <span className='text-sm font-medium text-gray-700'>Free Delivery Codes</span>
                            </div>
                            <div className='flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-stone-100 px-4 py-2.5 rounded-full shadow-sm'>
                                <div className='w-7 h-7 bg-stone-100 text-stone-600 text-xs rounded-full flex items-center justify-center'>
                                    <FaTag />
                                </div>
                                <span className='text-sm font-medium text-gray-700'>Members-Only Deals</span>
                            </div>
                        </div>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            <input type="email" className='w-full pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-stone-500 focus:ring-4 focus:ring-stone-500/10 transition-all text-base shadow-sm' placeholder='you@example.com' />
                            <button className='group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-stone-600 to-stone-500 hover:from-stone-500 hover:to-mauve-500 text-white shadow-stone-500/30 hover:shadow-stone-500/40 hover:scale-[1.02]'>
                                <span>Subscribe</span>
                                <span><FaLongArrowAltRight /></span>
                            </button>
                        </div>
                        <p className='text-xs text-gray-400 mt-3 pl-1'>✨ Unsubscribe anytime. No spam, ever.</p>
                    </div>
                    
                    <div className='lg:col-span-2 lg:border-l lg:border-stone-100 lg:pl-8'>
                        <div className='bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white relative overflow-hidden'>
                            <div className='absolute top-0 right-0 w-32 h-32 bg-stone-500/20 rounded-full blur-2xl'></div>
                            <div className='relative space-y-5'>
                                <div className='inline-block bg-stone-500/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-stone-500/30'>
                                    <span>📱 MOBILE APP</span>
                                </div>
                                <h3 className='text-2xl font-bold leading-tight'>Shop Faster on Our App</h3>
                                <p className='text-gray-400 text-sm leading-relaxed'>Get app-exclusive deals & 15% off your first order.</p>
                                <div className='flex flex-col gap-3 pt-2'>
                                    <div className='flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]'>
                                        <span><FaApple /></span>
                                        <div>
                                            <p className='text-[10px] text-gray-400 uppercase tracking-wide'>Download on</p>
                                            <h5 className='text-sm font-semibold -mt-0.5'>App Store</h5>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02]'>
                                        <span><FaGooglePlay /></span>
                                        <div>
                                            <p className='text-[10px] text-gray-400 uppercase tracking-wide'>Download on</p>
                                            <h5 className='text-sm font-semibold -mt-0.5'>Google Play</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-2 pt-2 text-sm'>
                                    <span className='text-yellow-400 flex items-center'>
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </span>
                                    <span className='text-gray-400'>4.9 • 100K+ downloads</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
