"use server";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllOrders = async (
  page: string,
  limit: string,
  search: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/orders?page=${page}&limit=${limit}${
        search && `&search=${search}`
      }`
    );

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletOrders = async (orderID: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/orders/${orderID}`,
      {
        method: "DELETE",
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeStatus = async (orderID: string, status: string) => {
  console.log(status, orderID);
  try {
    const response = await fetch(
      `${apiUrl}/orders/${orderID}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to change order status:", error);
    throw error;
  }
};

export const getSingleOrder = async (id: string) => {
  try {
    const response = await fetch(`${apiUrl}/orders/${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
