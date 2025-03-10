"use client";
import { getSingleOrder } from "@/actions/ordersActions";
import OrdersItems from "@/components/OrdersItems";
import { Button } from "@/components/ui/button";
import ButtonDelete from "@/components/ui/ButtonDelete";
import ButtonEdit from "@/components/ui/ButtonEdit";
import { Card } from "@/components/ui/card";
import { orderItem, Product } from "@/type";
import {
  ArrowLeft,
  Car,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

const statusColors: Record<string, string> = {
  pending: "bg-[#F7E5CC] text-[#F2800D] border-[#F2800D]",
  confirmed: "bg-[#E6EAFB] text-[#204FC9] border-[#204FC9]",
  shipped: "bg-[#F0FBFE] text-[#13BBE1] border-[#13BBE1]",
  delivered: "bg-[#F0FBF4] text-[#13B458] border-[#13B458]",
  cancelled: "bg-[#FCF0EF] text-[#EA6B6D] border-[#EA6B6D]",
};

export default function OrderDetalis() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [order, setOrder] = useState<orderItem>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getSingleOrder(id);
        console.log("success", response);
        setOrder(response.order);
      } catch (err) {
        console.error("Error fetching product : ", err);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div>
            <h2 className="md:text-[30px] font-[500] leading-none">
              Order ID : <span>{order?.orderCode}</span>
            </h2>
            <p className="text-main-text text-[14px]">
              {order?.createdAt
                ? new Date(order.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                : "N/A"}
            </p>
          </div>
          <div
            className={`flex cursor-pointer capitalize w-[100px] items-center justify-center gap-1 border-[1px] ${
              statusColors[order?.status || ""]
            }  py-[5px] px-[2px] rounded-[6px]`}
          >
            <span className=" text-[13px] font-[600]">{order?.status}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Link href={"/admin/orders/create-order"}>
              <Button className="h-8 bg-[#76a963] text-white border-[#76a963] ">
                <Edit />
                {/* <span>Edit</span> */}
              </Button>
            </Link>
            <Button className="h-8 bg-[#FDD8E0] text-[#F4164F] border-[#F4164F]">
              <Trash />
              {/* <span>Delete</span> */}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col l gap-10 py-5">
        <div className="lg:w-[60%]">
          {order && <OrdersItems order={order} />}
        </div>
        <div className="lg:w-[40%] ">
          <Card className="p-4 ">
            <h3 className="font-[500]  text-[18px]">Contact Infotmation </h3>
            <div className="flex flex-col gap-2 text-[14px] mt-2 text-main-text">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="cap capitalize">{order?.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{order?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="cap capitalize">{order?.phone}</span>
              </div>
            </div>
          </Card>
          <Card className="p-4 mt-4 capitalize">
            <h3 className="font-[500]  text-[18px]">Shippen Address </h3>
            <div className="flex flex-col gap-2 text-[14px] mt-2 text-main-text">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="cap capitalize">{order?.fullName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cap capitalize text-black font-[500]">
                  Address :
                </span>
                <span>{order?.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cap capitalize text-black font-[500]">
                  Country :
                </span>
                <span className="cap capitalize">{order?.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cap capitalize text-black font-[500]">
                  City :
                </span>
                <span className="cap capitalize">{order?.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cap capitalize text-black font-[500]">
                  ZipCode :
                </span>
                <span className="cap capitalize">{order?.zipCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="cap capitalize text-black font-[500]">
                  Phone :
                </span>
                <span className="cap capitalize">{order?.phone}</span>
              </div>
            </div>
          </Card>
          <Card className="p-4 mt-4">
            <h3 className="font-[500]  text-[18px]">Order Summary</h3>
            <div className="text-[14px] text-main-text">
              <div className="flex items-center gap-2 justify-between">
                <span>Subtotal : </span>
                <span className="font-[500] text-black">
                  $ {order?.totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <span>Shipping : </span>
                <span className="font-[500] text-black">$ 0.00</span>
              </div>

              <div className="flex items-center gap-2 justify-between">
                <span>Total : </span>
                <span className="font-[500] text-black">
                  $ {order?.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
