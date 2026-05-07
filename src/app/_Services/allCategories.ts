export async function getAllCategories() {
    const res = await fetch ("https://ecommerce.routemisr.com/api/v1/categories")
    if (!res.ok) {
        return []
    }

    const data = await res.json()
    return data.data
}