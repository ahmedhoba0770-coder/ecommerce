import { getAllCategories } from "@/app/_Services/allCategories";
import { getOneBrand } from "@/app/_Services/oneBrand";
import { getOneProduct } from "@/app/_Services/oneProduct";

export async function buildBreadcrumbs(pathname: string, searchParams: URLSearchParams) {
  const items: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
  ];

  // ===== Brands Page =====
  if (pathname === "/brands") {
    items.push({ label: "Brands" });
    return items;
  }

  // ===== Categories Page =====
  if (pathname === "/categories") {
    items.push({ label: "Categories" });
    return items;
  }

  // ===== Products Page =====
  if (pathname === "/products") {
    const brandId = searchParams.get("brand");
    const subcategoryId = searchParams.get("subcategory");

    // 👉 حالة Brand
    if (brandId) {
      const brand = await getOneBrand(brandId);

      items.push({ label: "Brands", href: "/brands" });
      items.push({ label: brand?.name || "Brand" });

      return items;
    }

    // 👉 حالة Subcategory
    if (subcategoryId) {
      const categories = await getAllCategories();

      const foundCategory = categories.find((cat: any) =>
        cat.subcategories?.some((sub: any) => sub._id === subcategoryId)
      );

      const sub = foundCategory?.subcategories?.find(
        (s: any) => s._id === subcategoryId
      );

      items.push({ label: "Categories", href: "/categories" });
      items.push({ label: foundCategory?.name || "Category" });
      items.push({ label: sub?.name || "Subcategory" });

      return items;
    }

    // 👉 Products عادي
    items.push({ label: "Products" });
    return items;
  }

  // ===== Product Details =====
  if (pathname.startsWith("/products/")) {
    const productId = pathname.split("/").pop();
    const product = await getOneProduct(productId!);

    items.push({ label: "Products", href: "/products" });

    if (product?.brand) {
      items.push({
        label: product.brand.name,
        href: `/products?brand=${product.brand._id}`,
      });
    }

    items.push({ label: product?.title || "Product" });

    return items;
  }

  return items;
}