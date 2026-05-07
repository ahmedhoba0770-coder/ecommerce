import React from 'react'
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { IoSearch } from "react-icons/io5";
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaRegHeart } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi2";
import LogoIMG from "../../_Components/LogoIMG";
import CartCount from '@/app/_Components/CartCount'

export default function MainNavbar() {
  return <>
    <div className='mx-auto px-4 bg-white sticky top-0 w-full z-3'>
        <div className='flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8'>
            <LogoIMG/>
            <div className='w-110'>
                <Field>
                        <ButtonGroup>
                            <Input className='w-full px-5 py-5 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-200/20 focus:border-stone-200 transition-all text-sm' id="input-button-group" placeholder="Type to search..." />
                            <Button className='px-5 py-5 bg-stone-200' variant="outline"><IoSearch /></Button>
                        </ButtonGroup>
                </Field>
            </div>
            <nav className='hidden xl:flex items-center gap-6'>
                <Link href="/" className='text-gray-700 hover:text-stone-500 font-medium transition-colors'>
                    Home
                </Link>
                <Link href="/products" className='text-gray-700 hover:text-stone-500 font-medium transition-colors'>
                    Shop
                </Link>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger className='text-gray-700 hover:text-stone-500 focus:bg-white hover:bg-white data-open:hover:bg-white data-open:focus:bg-white font-medium text-md transition-colors'>Products</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="w-50 flex flex-col">
                                <Link className='block px-4 py-2.5 text-gray-600 hover:text-stone-600 hover:bg-stone-50 transition-colors' href="/categories">All Categories</Link>
                                <Link className='block px-4 py-2.5 text-gray-600 hover:text-stone-600 hover:bg-stone-50 transition-colors' href="/categories/6439d2d167d9aa4ca970649f">Electronics</Link>
                                <Link className='block px-4 py-2.5 text-gray-600 hover:text-stone-600 hover:bg-stone-50 transition-colors' href="/categories/6439d58a0049ad0b52b9003f">Women's Fashion</Link>
                                <Link className='block px-4 py-2.5 text-gray-600 hover:text-stone-600 hover:bg-stone-50 transition-colors' href="/categories/6439d5b90049ad0b52b90048">Men's Fashion</Link>
                                <Link className='block px-4 py-2.5 text-gray-600 hover:text-stone-600 hover:bg-stone-50 transition-colors' href="/categories/6439d30b67d9aa4ca97064b1">Beauty & Health</Link>
                            </div>
                        </NavigationMenuContent>

                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Link href="/brands" className='text-gray-700 hover:text-stone-500 font-medium transition-colors'>
                    Brands
                </Link>
            </nav>
            <div className='flex items-center gap-1 lg:gap-2'>
                <Link href="/contact" className='hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity'> 
                    <div className='w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center'>
                        <span className='text-gray-700'><TfiHeadphoneAlt /></span>
                    </div>
                    <div>
                        <h5 className='text-gray-400 text-[12px]'>Support</h5>
                        <h4 className='font-semibold text-gray-700 text-[12px]'>24/7 Help</h4>
                    </div>
                </Link>
                <Link href="/wishlist" className='relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group'>
                    <span className='text-xl text-gray-500 group-hover:text-stone-400 transition-colors'><FaRegHeart /></span>
                </Link>
                <Link href="/cart" className='relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group'>
                    <span className='text-xl text-gray-500 group-hover:text-stone-400 transition-colors'>
                        <HiShoppingCart className='size-6' />
                    </span>
                    <CartCount />
                </Link>
            </div>
        </div>
    </div>
  </>
}
