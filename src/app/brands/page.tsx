import { getAllBrands } from '@/app/_Services/allBrands'
import { Brand } from '@/app/_Types/brands'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '../_Components/pageHeaderComps/PageHeader'
import { FaTags } from "react-icons/fa";

export default async function BrandsPage() {
  const brands: Brand[] = await getAllBrands()

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Brands" },
  ]

  return <>
    <PageHeader
      title="Top Brands"
      subtitle="Shop from your favorite brands"
      icon={<FaTags />}
      breadcrumbs={breadcrumbs}
    />
    <section className='py-10 px-5'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {brands.map((brand) => (
          <Link
            key={brand._id}
            href={`/products?brand=${brand._id}`}
            className='bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-3 border border-gray-100 shadow-sm hover:shadow-md transition group'
          >
            <div className='h-20 w-full relative'>
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                className='object-contain group-hover:scale-105 transition duration-300'
              />
            </div>
            <span className='text-sm text-gray-600 font-medium'>{brand.name}</span>
          </Link>
        ))}
      </div>
    </section>
  </>
}