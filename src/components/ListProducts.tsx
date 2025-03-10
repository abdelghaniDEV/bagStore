"use client";
import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/actions/productsActions";
import ProductCart from "@/components/ProductCart";
import Pagination from "./Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || "1");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [stock, setStock] = useState(searchParams.get("stock") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );
  const [limit, setLimit] = useState("10");
  const [isDelete, setIsDelete] = useState<string>("");
  const [totalPages, setTotalPages] = useState();
  const router = useRouter();

  useEffect(() => {
    router.push(`?page=${page}&search=${search}&stock=${stock}&category=${category}`);
    console.log(category)
  }, [page, search , category , stock]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setLoading(false);
        const response = await getAllProducts(page, limit, search, stock , category);
        if (response) {
          setProducts(response.products);
          setTotalPages(response.totalPages);
          setLoading(true);
          console.log("products", response);
        }
      } catch (err) {
        setLoading(false);
        console.error("Error", err);
      }
    };
    FetchData();
  }, [page, limit, isDelete, search, stock , category ]);

  const listSketelon = () => {
    return Array.from({ length: Number(limit) }, (_, index) => (
      <TableRow key={index}>
        <TableCell className="text-center">
          <Skeleton className="h-[20px] w-[50px]" />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Skeleton className="h-[40px] w-[40px]" />
            <Skeleton className="h-[20px] w-[200px]" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[80px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[80px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[20px] w-[100px]" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-[40px] w-[20px]" />
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <FilterProduct stock={stock} setStock={setStock} category={category} setCategory={setCategory}  search={search} setSearch={setSearch} />
      <div className="py-4">
        <Table className="border">
          <TableHeader className="bg-[#F9F9F9]">
            <TableRow className="md:text-[14px] text-center text-[13px]">
              <TableHead>Rank</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="">Category</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Price</TableHead>
              <TableHead> Created_at</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
          <TableBody>
            {loading
              ? products?.map((product: any, index) => (
                  <ProductCart
                    product={product}
                    index={index}
                    key={product._id}
                    setIsDelete={setIsDelete}
                  />
                ))
              : listSketelon()}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      {Number(totalPages) > 1 && (
        <Pagination
          currentPage={Number(page)}
          totalPages={Number(totalPages)}
          setPage={setPage}
          page={Number(page)}
        />
      )}
    </div>
  );
}
