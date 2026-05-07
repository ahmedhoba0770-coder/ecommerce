export async function getSubCategoriesOnCategory(categoryId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
  );
  const data = await res.json();
  return data.data;
}