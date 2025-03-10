import ListOrders from "@/components/ListOrders";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

export default function Orders() {
  return (
    <div>
      <div className=" flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <ShoppingBag className="md:h-10 md:w-10 h-8 w-8" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Orders</h1>
        </div>
        <Link
          href={"/admin/orders/create-order"}
          className="flex justify-end gap-5"
        >
          <Button className="flex items-center gap-1">
            <span>Create Order</span>
            {/* <span className="text-[30px] font-[400]">+</span> */}
          </Button>
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <ListOrders />
      </Suspense>
    </div>
  );
}
