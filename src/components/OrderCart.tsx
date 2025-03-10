import React from "react";
import { TableCell, TableRow } from "./ui/table";
import { orderItem } from "@/type";
import { EllipsisVertical } from "lucide-react";
import ButtonsOrder from "./ButtonsOrder";
import { OrderStatus } from "./OrderStatus";

type orderProps = {
  order: orderItem;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function OrderCart({ order , setRefresh}: orderProps) {
  return (
    <>
      <TableRow className="h-[50px] xl:text-[15px] text-[1épx]">
        <TableCell>{order.orderCode}</TableCell>
        <TableCell className="c capitalize">{order.fullName}</TableCell>
        <TableCell className="hidden xl:table-cell">{order.email}</TableCell>
        <TableCell>$ {order.totalPrice.toFixed(2)}</TableCell>
        <TableCell className="hidden md:table-cell">
          {new Date(order.createdAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false, 
          })}
        </TableCell>
        <TableCell className="hidden lg:table-cell">{order.totalItems} item</TableCell>
        <TableCell className="hidden md:table-cell">
          <OrderStatus orderID={order._id} status={order.status} setRefresh={setRefresh} />
        </TableCell>
        <TableCell className="text-center">
          <ButtonsOrder order={order} setRefresh={setRefresh}/>
        </TableCell>
      </TableRow>
    </>
  );
}
