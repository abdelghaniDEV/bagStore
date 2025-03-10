"use server";
import { revalidatePath } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// create a new CretaCategory
export const createCategory = async (data: { name: string; image?: any }) => {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.image) {
    formData.append("image", data.image[0]);
  }
  console.log("data")

  try {
    const response = await fetch("${apiUrl}/categories", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create category");
    }

    revalidatePath("/admin/categories"); // إعادة تحميل الصفحة بعد الإنشاء
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all CretaCategories
export const getAllCategories = async () => {
  try {
    const response = await fetch("${apiUrl}/categories");

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json()
    console.log("categories",categories)
    return await categories
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// delet category
export const deleteCategory = async (categoryID: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/categories/${categoryID}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete category");
    }

    revalidatePath("/admin/categories"); // إعادة تحميل الصفحة بعد الحذف
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
