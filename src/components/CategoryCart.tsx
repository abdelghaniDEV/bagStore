"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "./ui/table";
import Link from "next/link";
import { deleteCategory } from "@/actions/categoriesActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import ButtonEdit from "./ui/ButtonEdit";
import ButtonDelete from "./ui/ButtonDelete";
import ButtonView from "./ui/ButtonView";

type categoryProps = {
  category: {
    _id: string;
    name: string;
    image?: string;
    products: any[];
    created_at: string;
  };
  index: number;
};

export default function CategoryCart({ category, index }: categoryProps) {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteCategory = async () => {
    try {
      const response = await deleteCategory(category._id);
      dispatch(fetchCategories());
      console.log("success Delete", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TableRow key={category._id}>
      <TableCell>#{index + 1}</TableCell>
      <TableCell className="text-[18px]">
        <div className="flex items-center gap-2">
          <span className="">{category.name}</span>
        </div>
      </TableCell>
      <TableCell className="md:w-[360px]">{category.products.length}</TableCell>
      <TableCell>{new Date(category.created_at).toLocaleString()}</TableCell>
      <TableCell className="">
        <div className="text-center flex items-center gap-4 sm:gap-2 text-[13px]">
          <Link href={""} className="">
            <ButtonView>View</ButtonView>
          </Link>
          <Link href={`categories/edite-category/${category._id}`}>
            <ButtonEdit>Edit</ButtonEdit>
          </Link>
          <Dialog>
            <DialogTrigger className="">
              <ButtonDelete>Delete</ButtonDelete>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
              </DialogHeader>
              <div>
                <p>
                  This action cannot be undone. This will permanently delete
                  this Category and remove data from our servers.
                </p>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose className="flex gap-4">
                  <span className="p-2 bg-secondary rounded-[8px]">Close</span>
                  <span
                    onClick={() => handleDeleteCategory()}
                    className="bg-[#FDD8E0] p-2 text-[#F4164F] rounded-[8px] text-center hover:bg-[#FDD8E0]"
                  >
                    Delete
                  </span>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  );
}
