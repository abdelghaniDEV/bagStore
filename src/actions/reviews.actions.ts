"use server";

export type rating = {
  _id: string;
  fullName: string;
  email: string;
  comment: string;
  rating: number;
  image?: string;
  product: string; // reference to product model
  created_at: Date;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllReviews = async (page: string, limit: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/ratings?page=${page}&limit=${limit}`
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

export const deletReviews = async ( id : string) => {
  try {
    const response = await fetch(`${apiUrl}/ratings/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete reviews");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
