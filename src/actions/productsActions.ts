"use server";
import { revalidatePath } from "next/cache";

type formDataParameter = {
  name: string;
  description?: string;
  shortDescription?: string;
  discount?: number;
  price: number;
  stock: number;
  category: string[];
  images: any[];
  size: string[];
  color: string[];
};

export const postProduct = async (formData: formDataParameter) => {
  const sendData = new FormData();

  sendData.append("name", formData.name || "");
  sendData.append("description", formData.description || "");
  sendData.append("shortDescription", formData.shortDescription || "");
  sendData.append("price", formData.price ? formData.price.toString() : "0");
  sendData.append("stock", formData.stock ? formData.stock.toString() : "0");

  formData.category.forEach((category) =>
    sendData.append("categories", category)
  );

  formData.size.forEach((size) => sendData.append("size", size));
  formData.color.forEach((color) => sendData.append("color", color));

  if (formData.images.length > 0) {
    formData.images.forEach((image) => sendData.append("images", image));
  }

  try {
    const response = await fetch("http://localhost:2000/api/products", {
      method: "POST",
      body: sendData,
    });

    if (!response.ok) {
      throw new Error("Failed to create Product");
    }

    revalidatePath("/admin/products");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllProducts = async (
  page: string,
  limit: string,
  search?: string,
  stock?: string,
  category?: string
) => {
  try {
    const response = await fetch(
      `http://localhost:2000/api/products?page=${page}&limit=${limit}&search=${search}&stock=${stock}&category=${category}`
    );
    if (!response.ok) {
      throw new Error("Failed to get products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:2000/api/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to get products");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProduct = async (productID: string) => {
  try {
    const response = await fetch(
      `http://localhost:2000/api/products/${productID}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    revalidatePath("/admin/products");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  formData: formDataParameter
) => {
  const sendData = new FormData();

  if (formData.name) sendData.append("name", formData.name);
  if (formData.description)
    sendData.append("description", formData.description);
  if (formData.shortDescription)
    sendData.append("shortDescription", formData.shortDescription);
  if (formData.price) sendData.append("price", formData.price.toString());
  if (formData.stock) sendData.append("stock", formData.stock.toString());
  if(formData.discount) sendData.append("discount", formData.discount.toString())

  if (formData.category.length > 0) {
    formData.category.forEach((category) =>
      sendData.append("categories", category)
    );
  }

  if (formData.size.length > 0) {
    formData.size.forEach((size) => sendData.append("size", size));
  }

  if (formData.color.length > 0) {
    formData.color.forEach((color) => sendData.append("color", color));
  }

  // if (formData.images.length > 0) {
  //   formData.images.forEach((image) => sendData.append("images", image));
  // }
  if (formData.images.length > 0) {
    const existingImages: string[] = [];
    const newImages: File[] = [];

    formData.images.forEach((image) => {
      if (typeof image === "string") {
        existingImages.push(image);
      } else {
        newImages.push(image);
      }
    });

    sendData.append("existingImages", JSON.stringify(existingImages));

    newImages.forEach((image) => sendData.append("newImages", image));
  }

  console.log(sendData)

  try {
    const response = await fetch(
      `http://localhost:2000/api/products/${productId}`,
      {
        method: "PUT",
        body: sendData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update Product");
    }

    revalidatePath("/admin/products");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
