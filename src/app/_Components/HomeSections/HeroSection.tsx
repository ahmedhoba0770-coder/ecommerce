import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots, // استيراد الـ Dots هنا
} from "@/components/ui/carousel"
import Image from "next/image";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoIosRefresh } from "react-icons/io";
import { FaShieldAlt } from "react-icons/fa";



const slides = [
  {
    image: "/clothesBG.png",
    title: "New Collections Delivered to your Door",
    desc: "Get 20% off your first order",
    firstBtnTitle: "Shop Now",
    firstBtnHref: "/products",
    secondBtnTitle: "View Deals",
    secondBtnHref: "/deals",
  },
  {
    image: "/clothesBG.png",
    title: "Women Collection",
    desc: "Elegant styles for every occasion",
    firstBtnTitle: "Shop Now",
    firstBtnHref: "/products",
    secondBtnTitle: "Learn More",
    secondBtnHref: "/about",
  },
  {
    image: "/clothesBG.png",
    title: "New Arrivals",
    desc: "Check out the newest trends",
    firstBtnTitle: "Order Now",
    firstBtnHref: "/products",
    secondBtnTitle: "Delivery Info",
    secondBtnHref: "/delivery",
  },
];
export default function HeroSection() {
  return <>
    <div>
        <section className="flex flex-col justify-center items-center">
        <Carousel className="w-full">
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="rounded-none p-0 border-none">
                  <CardContent className="relative w-full h-100 p-0">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 py-20 text-white text-center p-8 w-full h-full bg-linear-to-r from-stone-500/90 to-stone-200/50 flex flex-col justify-center items-center">
                      <h2 className="text-white text-4xl font-bold mb-4 max-w-96">
                        {slide.title}
                      </h2>
                      <p className="text-lg max-w-lg">
                        {slide.desc}
                      </p>
                      <div className="mt-4">
                        <Link
                          href={slide.firstBtnHref}
                          className="btn bg-white border-2 border-white/50 text-stone-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                          {slide.firstBtnTitle}
                        </Link>

                        <Link
                          href={slide.secondBtnHref}
                          className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                        >
                          {slide.secondBtnTitle}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-5 size-13 [&_svg]:size-6" />
          <CarouselNext className="right-5 size-13 [&_svg]:size-6" />

          <div className="absolute bottom-4 left-0 right-0">
             <CarouselDots />
          </div>
        </Carousel>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 w-full">
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span><TbTruckDelivery className="size-7" /></span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Free Shipping</h4>
                <p className="text-xs text-gray-500">On orders over 500 EGP</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-emerald-50 text-emerald-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span><FaShieldAlt className="size-7" /></span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Secure Payment</h4>
                <p className="text-xs text-gray-500">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span><IoIosRefresh className="size-7" /></span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Easy Returns</h4>
                <p className="text-xs text-gray-500">14-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                <span><TfiHeadphoneAlt className="size-7" /></span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">24/7 Support</h4>
                <p className="text-xs text-gray-500">Dedicated support team</p>
              </div>
            </div>
        </div>
        </section>
    </div>
  </>
}
