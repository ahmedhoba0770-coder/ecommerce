import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoIosRefresh } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";
import Link from 'next/link';
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import LogoIMG from "../_Components/LogoIMG";


export default function Footer() {
  return (
    <footer>
        <div className='bg-stone-200 border-y border-stone-100 p-4'>
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0'>
                <span className='text-stone-600'><TbTruckDelivery /></span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 text-sm'>Free Shipping</h4>
                <p className='text-gray-500 text-xs'>On orders over 500 EGP</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0'>
                <span className='text-stone-600'><IoIosRefresh /></span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 text-sm'>Easy Returns</h4>
                <p className='text-gray-500 text-xs'>14-day return policy</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0'>
                <span className='text-stone-600'><FaShieldAlt /></span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 text-sm'>Secure Payment</h4>
                <p className='text-gray-500 text-xs'>100% secure checkout</p>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center shrink-0'>
                <span className='text-stone-600'><TfiHeadphoneAlt /></span>
              </div>
              <div>
                <h4 className='font-semibold text-gray-900 text-sm'>24/7 Support</h4>
                <p className='text-gray-500 text-xs'>Contact us anytime</p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-900 text-white mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 px-4 py-12'>
            <div className='lg:col-span-4'>
              <div className='bg-white rounded-lg px-4 py-2 inline-block'>
                <LogoIMG/>
              </div>
              <p className='text-gray-400 mb-6 text-sm leading-relaxed'>
                FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
              </p>
              <div className='space-y-3 mb-6'>
                <Link href="tel:+18001234567" className='flex items-center gap-3 text-gray-400 hover:text-stone-400 transition-colors text-sm'>
                  <span className='text-stone-500'><FaPhoneAlt /></span>
                  <span>+1 (800) 123-4567</span>
                </Link>
                <Link href="mailto:support@freshcart.com" className='flex items-center gap-3 text-gray-400 hover:text-stone-400 transition-colors text-sm'>
                  <span className='text-stone-500'><IoMdMail /></span>
                  <span>support@freshcart.com</span>
                </Link>
                <div className='flex items-center gap-3 text-gray-400 hover:text-stone-400 transition-colors text-sm'>
                  <span className='text-stone-500'><IoLocation /></span>
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <Link href="#" className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors'>
                  <FaFacebookF />
                </Link>
                <Link href="#" className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-sky-400 hover:text-white transition-colors'>
                  <FaTwitter />
                </Link>
                <Link href="#" className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-400 hover:text-white transition-colors'>
                  <FaInstagram />
                </Link>
                <Link href="#" className='w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-rose-600 hover:text-white transition-colors'>
                  <FaYoutube />
                </Link>
              </div>
            </div>
            <div className='lg:col-span-2'>
              <h3 className='font-semibold text-lg mb-5'>Shop</h3>
              <ul className='space-y-3'>
                <li><Link href="/products" className='footer-link'>All Products</Link></li>
                <li><Link href="/categories" className='footer-link'>Categories</Link></li>
                <li><Link href="/brands" className='footer-link'>Brands</Link></li>
                <li><Link href="/products?category=6439d58a0049ad0b52b9003f" className='footer-link'>Electronics</Link></li>
                <li><Link href="/products?category=6439d2d167d9aa4ca970649f" className='footer-link'>Men's Fashion</Link></li>
                <li><Link href="/products?category=6439d5b90049ad0b52b90048" className='footer-link'>Women's Fashion</Link></li>
              </ul>
            </div>
            <div className='lg:col-span-2'>
              <h3 className='font-semibold text-lg mb-5'>Account</h3>
              <ul className='space-y-3'>
                <li><Link href="/profile" className='footer-link'>My Account</Link></li>
                <li><Link href="/profile/orders" className='footer-link'>Order History</Link></li>
                <li><Link href="/wishlist" className='footer-link'>Wishlist</Link></li>
                <li><Link href="/cart" className='footer-link'>Shopping Cart</Link></li>
                <li><Link href="/login" className='footer-link'>Sign In</Link></li>
                <li><Link href="/register" className='footer-link'>Create Account</Link></li>
              </ul>
            </div>
            <div className='lg:col-span-2'>
              <h3 className='font-semibold text-lg mb-5'>Support</h3>
              <ul className='space-y-3'>
                <li><Link href="/contact" className='footer-link'>Contact Us</Link></li>
                <li><Link href="/help" className='footer-link'>Help Center</Link></li>
                <li><Link href="/shipping" className='footer-link'>Shipping Info</Link></li>
                <li><Link href="/returns" className='footer-link'>Returns & Refunds</Link></li>
                <li><Link href="/track-order" className='footer-link'>Track Order</Link></li>
              </ul>
            </div>
            <div className='lg:col-span-2'>
              <h3 className='font-semibold text-lg mb-5'>Legal</h3>
              <ul className='space-y-3'>
                <li><Link href="/privacy" className='footer-link'>Privacy Policy</Link></li>
                <li><Link href="/terms" className='footer-link'>Terms of Service</Link></li>
                <li><Link href="/cookies" className='footer-link'>Cookies Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className='mx-auto px-4 py-6 border-t border-stone-50/50'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
              <p className='text-gray-500 text-sm text-center md:text-left'>
                © 2026 FreshCart. All rights reserved.
              </p>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <span><FaCreditCard /></span>
                  <span>Visa</span>
                </div>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <span><FaCreditCard /></span>
                  <span>Mastercard</span>
                </div>
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                  <span><FaCreditCard /></span>
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  )
}
