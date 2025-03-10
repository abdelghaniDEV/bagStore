import React from "react";
import { TableCell, TableRow } from "./ui/table";
import noImage from "../assets/no-image.jpg";
import Image from "next/image";
import ButtonsProduct from "./ButtonsProduct";

type productProps = {
  product: any;
  index: number;
  setIsDelete: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductCart({
  product,
  index,
  setIsDelete,
}: productProps) {
  // console.log("productCate", product);
  return (
    <TableRow className=" md:text-[15px] text-center text-[13px]">
      <TableCell>#{index + 1}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Image
            alt={product.name}
            src={product.images.length > 0 ? product.images[0] : noImage}
            width={40}
            height={40}
            style={{ width: "40px", height: "40px" }}
            className="rounded-[10px]"
          />
          <span className="text-[16px]">{product.name}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {product.categories.map((cate: any) => {
            return (
              <div key={cate._id} className="flex items-center gap-1">
                {cate.name} /
              </div>
            );
          })}
        </div>
      </TableCell>
      <TableCell className={`${product.stock <= 10 && "text-red-500 font-[600]"}`}>
        {product.stock} in Stock
      </TableCell>
      <TableCell>{product.price}$</TableCell>
      <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex items-center justify-center gap-2 bg-[#EFFCF3] border-[1px] border-[#14B456] text-[#14B456] py-[6px] px-[2px] rounded-[6px] ">
          <span className=" text-[13px] font-[600]">Publish</span>
        </div>
      </TableCell>

      <TableCell>
        <ButtonsProduct product={product} setIsDelete={setIsDelete} />
      </TableCell>
    </TableRow>
  );
}
