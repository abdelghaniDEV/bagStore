"use client";
import { getAllOrders } from "@/actions/ordersActions";
import { Box, DollarSign, ShoppingBag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterOrders from "./FilterOrders";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderCart from "./OrderCart";
import { orderItem } from "@/type";

type ordersType = {
  status: string;
  orders: [];
  currentPage: number;
  totalPages: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
};

export default function ListOrders() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<ordersType>();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [refresh, setRefresh] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${page}${search && `&search=${search}`}`);
  }, [page , search , router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders(page, "10" , search);
        setOrders(response);
        console.log(response);
      } catch (err) {
        console.error("Error fetching orders : ", err);
      }
    };

    fetchOrders();
  }, [page, search , refresh]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-6">
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">Total Orders</h3>
          <div className="flex gap-[7px]">
            <ShoppingBag />
            <ShoppingBag className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
            <h1 className="text-[30px] font-[600]">{orders?.totalOrders}</h1>
          </div>
          <div className="flex items-center">
            <i className="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="text-[14px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">Total Revenue</h3>
          <div className="flex gap-[7px]">
            <DollarSign />
            <DollarSign className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
            <h1 className="text-[30px] font-[600]">{orders?.totalRevenue}</h1>
          </div>
          <div className="flex items-center">
            <i className="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="text-[14px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
        <div className="relative overflow-hidden flex flex-col gap-1 border-[2px] rounded-[20px] py-6 px-4  shadow-md bg-[#F9F9F9] text-black">
          <h3 className="text-[16px] font-[500]">Total Products</h3>
          <div className="flex gap-[7px]">
            <Box />
            <Box className="h-[150px] w-[150px] absolute top-3 right-[-40px] text-[#6AB08D]" />
            <h1 className="text-[30px] font-[600]">{orders?.totalProducts}</h1>
          </div>
          <div className="flex items-center">
            <i className="bx bxs-chevrons-up text-[#8BE78B]"></i>
            <h3 className="text-[14px]">
              <span className="text-[#8BE78B] font-[600]">+35 %</span> from last
              month
            </h3>
          </div>
        </div>
      </div>
      <FilterOrders search={search} setSearch={setSearch}  setRefresh={setRefresh} />
      <div className="my-4">
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[16px] text-center text-[13px]">
              <TableHead className="w-[100px]">Order</TableHead>
              <TableHead>Custemer</TableHead>
              <TableHead className="hidden xl:table-cell">Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden lg:table-cell">Items</TableHead>
              <TableHead className="hidden md:table-cell">status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.orders.map((order: orderItem) => {
              return (
                <OrderCart
                  key={order._id}
                  order={order}
                  setRefresh={setRefresh}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
