import Image from 'next/image'
import React from 'react'
export default function MainNavbar() {
  return <>
    <div className='container mx-auto px-4 bg-white'>
        <div className='flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8'>
            <Image
            src="/LuxveroLogo2.png"
            alt='logo image'
            width={120}
            height={60}
            
            />
        </div>
    </div>
  </>
}
