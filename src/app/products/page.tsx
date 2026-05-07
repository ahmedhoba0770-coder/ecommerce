import FeaturedProductsSec from "../_Components/HomeSections/FeaturedProductsSec";
import { getOneSubcategory } from "../_Services/oneSubcategory";
import { getOneBrand } from "../_Services/oneBrand";
import PageHeader from "../_Components/pageHeaderComps/PageHeader";
import { FaBoxOpen } from "react-icons/fa6";

export default async function Page({ searchParams }: any) {
  const params = await searchParams;

  const subcategory = params?.subcategory;
  const brand = params?.brand;

  const subcategoryData = subcategory
    ? await getOneSubcategory(subcategory)
    : null;

  const brandData = brand
    ? await getOneBrand(brand)
    : null;

  type BreadcrumbItemType = {
  label: string;
  href?: string;
};

const breadcrumbs: BreadcrumbItemType[] = [
  { label: "Home", href: "/" },
];

  if (brand) {
    breadcrumbs.push(
      { label: "Brands", href: "/brands" },
      { label: brandData?.name || "Brand" }
    );
  } else if (subcategory) {
    breadcrumbs.push(
      { label: "Categories", href: "/categories" },
      { label: subcategoryData?.category?.name || "Category" },
      { label: subcategoryData?.name || "Subcategory" }
    );
  } else {
    breadcrumbs.push({ label: "Products" });
  }

  return (
    <>
      <PageHeader
        title={
          brandData?.name ||
          subcategoryData?.name ||
          "Products"
        }
        subtitle="Explore products"
        icon={<FaBoxOpen />}
        breadcrumbs={breadcrumbs}
      />

      <FeaturedProductsSec
        showTitle={false}
        subcategory={subcategory}
        subcategoryName={subcategoryData?.name}
        brand={brand}
        brandName={brandData?.name}
      />
    </>
  );
}