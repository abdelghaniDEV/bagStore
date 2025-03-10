"use server";

export const getAllOrders = async (
  page: string,
  limit: string,
  search: string
) => {
  try {
    const response = await fetch(
      `http://localhost:2000/api/orders?page=${page}&limit=${limit}${
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
      `http://localhost:2000/api/orders/${orderID}`,
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
      `http://localhost:2000/api/orders/${orderID}/status`,
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

export const getSingleOrder = async (id: String) => {
  try {
    const response = await fetch(`http://localhost:2000/api/orders/${id}`);

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
