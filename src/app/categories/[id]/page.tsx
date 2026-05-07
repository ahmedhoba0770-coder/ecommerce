import { getSubCategoriesOnCategory } from "@/app/_Services/subCategories";
import Link from "next/link";

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const subCategories = await getSubCategoriesOnCategory(params.id);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Subcategories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subCategories.map((sub: any) => (
          <Link
            key={sub._id}
            href={`/products?subcategory=${sub._id}`}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
          >
            <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-3">
              📁
            </div>
            <h3 className="font-semibold">{sub.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}