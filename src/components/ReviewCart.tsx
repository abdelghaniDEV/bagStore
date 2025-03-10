import React, { useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { reviewsItem } from "@/type";
import { EllipsisVertical, Eye, Star, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { deletReviews } from "@/actions/reviews.actions";
import {toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type reviewProps = {
  review: reviewsItem;
};

export default function ReviewCart({ review }: reviewProps) {
  const [open, setOpen] = useState(false); // Manage dialog open state
  const [openView, setOpenView] = useState(false);
  // console.log("rev",review)

  const handleDelete = async () => {
    try {
      await deletReviews(review._id);
      // setIsDelete(product._id);
      toast.success("Review deleted successfully");
      setOpen(false); // Close the dialog after successful deletion
      console.log("Success delete");
    } catch (err) {
      console.error("Error delete", err);
    }
  };
  return (
    <>
      <TableRow className=" md:text-[15px] text-[13px] mr-4">
        <TableCell className="">{review.fullName}</TableCell>
        <TableCell className="">{review.email}</TableCell>
        <TableCell className="">
          {new Date(review.created_at).toLocaleDateString()}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <Star className="text-white bg-yellow-300 rounded-full p-1" />
            <span>{review.rating}</span>
            <span className="text-[10px] text-main-text">Out Of 5</span>
          </div>
        </TableCell>
        <TableCell className="max-w-[360px] truncate">
          {review.comment}
        </TableCell>
        <TableCell>
          {/* <div
            className="flex items-center justify-center"
            onClick={() => setOpen(true)}
          >
            <ButtonDelete>Delete</ButtonDelete>
          </div> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border-none outline-none">
              <div className="flex items-center justify-center">
                <EllipsisVertical className="bg-main-primary p-1 w-8 h-8 rounded-[8px]" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-10 w-[100px] flex flex-col gap-1">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="bg-[#94C0FF] text-[#0167F6] focus:bg-[#0167F6] focus:text-white cursor-pointer"
                onClick={() => setOpenView(true)}
              >
                <div className="flex items-center gap-2">
                  <Eye />
                  <span>View</span>
                </div>
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
        </TableCell>
      </TableRow>
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
      <Dialog open={openView} onOpenChange={setOpenView}>
        <DialogTrigger asChild></DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <div>
            <span className="font-[500]">Product : </span>
            <div className="flex items-start gap-6 border-[1px] p-2 rounded-[10px]">
              <div className="">
                <Image
                  src={review.product.images[0]}
                  alt={review.product.name}
                  width={50}
                  height={50}
                  className="rounded-[5px]"
                />
              </div>
              <div className="flex flex-col gap-">
                <h4 className="lia leading-[15px] ">{review.product.name}</h4>
                <p className="text-main-text">
                  <span className="font-[500] text-[14px] text-black">catgeory :</span> {review.product.categories[0].name}
                </p>
                <span>{review.product.price} $</span>
              </div>
            </div>
            <p className="font-[500]">Comment:</p>
            <p>{review.comment}</p>

            <div className="flex items-center gap-2 py-2">
              <span className="text-[14px] font-[500] text-main-text">
                Rating :
              </span>
              <Star className="text-white bg-yellow-300 rounded-full p-1" />
              <span>{review.rating}</span>
              <span className="text-[10px] text-main-text">Out Of 5</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <p className="text-[14px] font-[500] text-main-text">
                Reviewer Name:
              </p>
              <p className="font-[500]">{review.fullName}</p>
              <p className="text-[14px] font-[500] text-main-text">
                Reviewer Email:
              </p>
              <p className="font-[500]">{review.email}</p>
              <p className="text-[14px] font-[500] text-main-text">
                Review Date:
              </p>
              <p className="font-[500]">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* <DialogFooter className="flex gap-4">
            <button
              onClick={() => set(false)}
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
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
}
