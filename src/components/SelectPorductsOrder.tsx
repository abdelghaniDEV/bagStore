"use client";
import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { getAllProducts } from "@/actions/productsActions";
import { Product, productOrder } from "@/type";
import Image from "next/image";
import { Card } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";
import Pagination from "./Pagination";
import { Skeleton } from "./ui/skeleton";

export default function SelectPorductsOrder() {
  const [search, setSerch] = useState<string>("");
  const [products, setProducts] = useState([]);
  const [selectProducts, setSelectProducts] = useState<productOrder[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(selectProducts);
  }, [selectProducts]);

  useEffect(() => {
    // fetch data for product select
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts(page, "5", search, "", "");
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products : ", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, page]);

  const handelSelectedProduct = (
    product: Product,
    color: string,
    size: string,
    quantity: number
  ) => {
    if (!selectProducts.find((p: productOrder) => p.product === product._id)) {
      setSelectProducts((prev: productOrder[]) => {
        return [
          ...prev,
          {
            product: product._id,
            price: product.price,
            name: product.name,
            image: product.images[0],
            quantity: quantity,
            size: size,
            color: color,
            totalPrice: quantity * product.price,
          },
        ];
      });
    }
  };


  const listSketelon = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <Card className=" flex gap-4 p-2" key={index}>
        <Skeleton className="w-[40px] h-[60px]" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
      </Card>
    ));
  };

  const listProducts = () => {
    return products.map((product: Product) => {
      let size = "";
      let color = "";
      let quantity = 1;
      return (
        <Card key={product._id} className=" p-2">
          <div className="flex gap-2">
            <div>
              <Image
                src={product.images[0]}
                alt={product.name}
                width={40}
                height={60}
                className="w-[50px] h-[60px]"
                unoptimized
              />
            </div>
            <div className="text-[14px]">
              <h4 className="text-[14px] leading-3 line-clamp-2">
                {product.name}
              </h4>
              <span className="text-[14px]">{product.price} $</span>
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  placeholder="quantity"
                  defaultValue={1}
                  className="w-[60px] h-8 p-1 text-[14px] text-main-text"
                  onChange={(e) => {
                    quantity = parseInt(e.target.value);
                  }}
                />
                {product.size.length > 0 && (
                  <Select
                    onValueChange={(value) => {
                      size = value;
                      console.log(size);
                    }}
                  >
                    <SelectTrigger className="w-[60px] h-8 p-1 text-[12px] text-main-text">
                      <SelectValue placeholder="size" />
                    </SelectTrigger>
                    <SelectContent className="text-[14px]">
                      <SelectItem value="light">Light</SelectItem>
                      {product.size.map((value: string, index: number) => {
                        return (
                          <SelectItem value={value} key={index} className="">
                            {value}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
                <Select
                  onValueChange={(value) => {
                    color = value;
                    console.log(color);
                  }}
                >
                  <SelectTrigger className="w-[60px] h-8 p-1 text-[12px] text-main-text">
                    <SelectValue placeholder="Color" />
                  </SelectTrigger>
                  <SelectContent className="text-[14px] w-[60px]">
                    {product.color.map((color: string, index: number) => {
                      return (
                        <SelectItem value={color} key={index} className="">
                          <div
                            className="w-5 h-5 rounded-[5px]"
                            style={{ backgroundColor: color }}
                          ></div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div
                  className="h-8 w-[60px] cursor-pointer border-[1px] rounded-[5px] flex items-center justify-center bg-main-primary border-main-secondary"
                  onClick={() => {
                    handelSelectedProduct(product, color, size, quantity);
                  }}
                >
                  Add
                </div>
              </div>
            </div>
          </div>
        </Card>
      );
    });
  };

  return (
    <div>
      <div>
        <h4 className="text-[25px] font-[500] ">Select Product</h4>
        <p className="text-gray-400 text-[14px]">
          Select the products you want to order.
        </p>
        <div className="grid grid-cols-1 gap-4">{/* product card */}</div>
      </div>
      <div className="pt-4 flex-col gap-2 flex">
        {selectProducts.map((product: productOrder) => {
          return (
            <Card
              key={product.product}
              className=" flex items-start  justify-between p-2"
            >
              <div className="flex gap-2">
                <div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={40}
                    height={60}
                    className="w-[50px] h-[60px]"
                    unoptimized
                  />
                </div>
                <div className="text-[12px]">
                  <h4 className="text-[14px] leading-3 line-clamp-2">
                    {product.name}
                  </h4>
                  <span className="text-[14px]">{product.price} $</span>
                  <div className="flex items-center gap-3">
                    {product.size && <span>Size : {product.size}</span>}
                    {product.color && (
                      <div className="flex items-center gap-1">
                        Color :{" "}
                        <div
                          className="w-5 h-5 rounded-[5px]"
                          style={{ backgroundColor: product.color }}
                        ></div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span>Quantity : {product.quantity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span>Total Price : {product.totalPrice} $</span>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="cur cursor-pointer"
                onClick={() => {
                  setSelectProducts(
                    selectProducts.filter(
                      (p: productOrder) => p.product !== product.product
                    )
                  );
                }}
              >
                <Trash className="bg-main-primary p-2 text-red-500 h-8 w-8 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110" />
              </div>
            </Card>
          );
        })}
      </div>
      <div className="pt-4">
        <div className="flex flex-col gap-2 relative">
          <Label>
            Select Products <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="fullName"
            onChange={(e) => setSerch(e.target.value)}
            placeholder="sarch Product"
          />
        </div>

        <div className="flex flex-col gap-2 py-4">
          {loading ? listSketelon() : listProducts()}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={parseInt(page)}
          setPage={setPage}
          page={parseInt(page)}
        />
      </div>
    </div>
  );
}
