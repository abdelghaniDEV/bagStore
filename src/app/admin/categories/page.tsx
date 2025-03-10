"use client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import CategoryCart from "@/components/CategoryCart";

type Category = {
  _id: string;
  name: string;
  products: any[];
  created_at: string;
};

export default function page() {
  const Categories = useSelector(
    (state: RootState) => state?.categories
  ) as Category[];
  return (
    <div>
      <div className=" lg:flex justify-between items-center mb-4 ">
        <div className="flex items-center gap-1 ">
          <LayoutDashboard className="h-10 w-10" />
          <h1 className="text-[25px] lg:text-[30px] font-[600] ">Categories</h1>
        </div>
        <Link
          href={"/admin/categories/create-category"}
          className="flex justify-end gap-5"
        >
          <Button className="flex items-center gap-1">
            <span>Create Category</span>
            <span className="text-[30px] font-[400]">+</span>
          </Button>
        </Link>
      </div>
      <div>
        <Table className="border">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[16px] text-center text-[13px]">
              <TableHead>Rank</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="">Products</TableHead>
              <TableHead>created_at</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Categories?.map((category, index) => {
              return (
                <CategoryCart
                  key={category._id}
                  category={category}
                  index={index}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
