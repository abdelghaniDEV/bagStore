import ListReviews from "@/components/ListReviews";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import React, { Suspense } from "react";

export default function Reviews() {
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <MessageSquare className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Reviews</h1>
        </div>
        {/* <Link
          href={"/admin/products/create-product"}
          className="flex justify-end gap-5"
        >
          <Button className="flex items-center gap-1">
            <span>Create Product</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link> */}
        <Button className="flex items-center gap-1">
          <span>Create Reviews</span>
        </Button>
      </div>
      <Suspense fallback={<p>Loading...</p>}><ListReviews /></Suspense>
      
    </div>
  );
}
