
import ListProducts from "@/components/ListProducts";
import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Suspense } from "react";

export default function Products() {
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <Box className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Products</h1>
        </div>
        <Link
          href={"/admin/products/create-product"}
          className="flex justify-end gap-5"
        >
          <Button className="flex items-center gap-1">
            <span>Create Product</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <ListProducts />
      </Suspense>
    </div>
  );
}
