import OrderFomr from "@/components/OrderFomr";
import SelectPorductsOrder from "@/components/SelectPorductsOrder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CreateOrder() {
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-start gap-1 md:gap-2 pb-3 lg:pb-0 ">
          <Link href={"/admin/orders"} className="border p-2 md:p-3  ">
            <ArrowLeft />
          </Link>
          <div className=" items-center gap-2 mt-[-5px] lg:mt-0 ">
            <span className="text-[12px] ">Back To Orders list</span>
            <h1 className="text-[25px] lg:text-[30px] font-[600] leading-4 ">
              Create Order
            </h1>
          </div>
        </div>
        {/* <div className="flex justify-end gap-5">
          <Button onClick={(e) => handleSubmit(e)}>
          {loading ? (
                <Image src={loadingImg} width={30} alt="loading" />
              ) : (
                <span>Create Product</span>
              )}
          </Button>
        </div> */}
      </div>
      <div className="">
        <OrderFomr />
      </div>
    </div>
  );
}
