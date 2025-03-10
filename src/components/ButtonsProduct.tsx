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
import { deleteProduct } from "@/actions/productsActions";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

// interface ButtonsProductProps {
//   product: any;
//   setIsDelete: (productId: string) => void;
// }

export default function ButtonsProduct({ product, setIsDelete }: any) {
  const [open, setOpen] = useState(false); // Manage dialog open state

  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      setIsDelete(product._id);
      toast.success("Product deleted successfully");
      setOpen(false); // Close the dialog after successful deletion
      console.log("Success delete");
    } catch (err) {
      console.error("Error delete", err);
    }
  };

  return (
    <>
      <ToastContainer />
      <DropdownMenu>
        <DropdownMenuTrigger className="border-none outline-none">
          <div className="flex items-center justify-center">
            <EllipsisVertical className="bg-main-primary p-1 w-8 h-8 rounded-[8px]" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-10 w-[100px] flex flex-col gap-1">
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-[#94C0FF] text-[#0167F6] focus:bg-[#0167F6] focus:text-white">
            <div className="flex items-center gap-2">
              <Eye />
              <span>View</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-[#A3EEA7] text-[#0D8215] focus:bg-[#0D8215] focus:text-white">
            <Link
              href={`/admin/products/edit-product/${product._id}`}
              className="flex items-center gap-2"
            >
              <Edit />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-[#FDD8E0] text-[#F4164F] focus:bg-[#F4164F] focus:text-white cursor-pointer">
            <div
              className="flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <Trash />
              <span>Delete</span>
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
  );
}
