
"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit, EllipsisVertical, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { orderItem } from "@/type";
import { deletOrders } from "@/actions/ordersActions";
import { ToastContainer, toast } from "react-toastify";

type orderProps = {
    order : orderItem;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ButtonsOrder({order , setRefresh} : orderProps) {
      const [open, setOpen] = useState(false); // Manage dialog open state

      const handleDelete = async () => {
        try {
          const response = await deletOrders(order._id)
          console.log("success Delete", response);
          setRefresh((prev) => !prev); // Refresh the page after successful deletion
          toast.success("Product deleted successfully");
          setOpen(false); // Close the dialog after successful deletion
        }catch (err) {
          console.error("Error delete", err);
        }
      }
  return (
    <>
        <ToastContainer />
        <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          <div className="flex items-center justify-center">
            <EllipsisVertical className="bg-main-primary p-1 w-8 h-8 rounded-[8px]" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-10 w-[150px]  flex flex-col gap-1">
          <DropdownMenuSeparator />
          <DropdownMenuItem className=" text-[#b58df2]">
            <Link href={`/admin/orders/view/${order._id}`} className="flex items-center gap-2">
              <Eye className="t  w-4 h-4" />
              <span>View Order</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className=" text-[#0D8215] ">
            <Link
              href={`/admin/products/edit-product/${order._id}`}
              className="flex items-center gap-2"
            >
              <Edit className="" />
              <span className="">Edit Order</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className=" text-[#F4164F] cursor-pointer ">
            <div
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Trash />
              <span>Delete Order</span>
            </div>
          </DropdownMenuItem>

          {/* Dialog Trigger */}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <p>
            This action cannot be undone. This will permanently delete this
            product and remove its data from our servers.
          </p>
          <DialogFooter className="flex gap-4">
            <button
              onClick={() => setOpen(false)}
              className="p-2 bg-secondary rounded-[8px]"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              className="bg-[#FDD8E0] p-2 text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
