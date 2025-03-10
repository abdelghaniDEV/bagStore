"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Grid2X2, List, ListFilter, Search } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Category } from "@/type";

interface FilterProductProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function FilterProduct({
  search,
  setSearch,
  category,
  setCategory,
  stock,
  setStock,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  category: string; // Add the category prop here for filtering by category in the filter component.
  setCategory: React.Dispatch<React.SetStateAction<string>>; // Add the setCategory prop here for filtering by category in the filter component.
  stock: string; // Add the stock prop here for filtering by stock status in the filter component.
  setStock: React.Dispatch<React.SetStateAction<string>>; // Add the setStock prop here for filtering by stock status in the filter component.
}) {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const categories = useSelector((state: RootState) => state.categories);
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="relative">
          <Input
            type="text"
            value={search}
            placeholder="Search By product #, name,category"
            className="px-10 border-b-[1px] w-[500px]"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2 left-2  " />
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="flex items-center gap-1 rounded-[8px] ">
            <div
              className="flex items-center gap-1 rounded-[8px] cursor-pointer"
              onClick={() => setOpenFilter(!openFilter)}
            >
              <ListFilter className="w-6 h-6" />
              <span className="text-[14px]">Filter</span>
            </div>
            {openFilter && (
              <div className="bg-white w-[200px]  absolute top-[40px] z-[10] right-[60px] rounded-[10px] border p-3">
                <div className="flex flex-col gap-3 ">
                  <div>
                    <h6 className=" text-[14px] mb-1">category : </h6>
                    <Select onValueChange={(e) => setCategory(e)}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="category" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="#">All</SelectItem>
                        {categories.map((category : Category) => {
                          return (
                            <SelectItem
                              key={category._id}
                              value={category.name}
                            >
                              {category.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <h6 className=" text-[14px] mb-1">Stock Status : </h6>
                    <Select onValueChange={(e) => setStock(e)}>
                      <SelectTrigger className="">
                        <SelectValue placeholder="stock Status" />
                      </SelectTrigger>
                      <SelectContent>
                      <SelectItem value="#">All</SelectItem>
                        <SelectItem value="instock">In Stock</SelectItem>
                        <SelectItem value="lowstock">Low Stock</SelectItem>
                        <SelectItem value="outstock">Out stock</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-[1px] p-1 rounded-[8px]">
            <List className="w-6 h-6" />
            <Grid2X2 className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
