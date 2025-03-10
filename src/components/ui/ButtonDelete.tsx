import { Trash } from "lucide-react";
import React from "react";

export default function ButtonDelete({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" cursor-pointer">
      <i className="bx bx-trash-alt md:hidden bg-[#FDD8E0] text-[#F4164F] rounded-[8px] p-[10px] text-center"></i>
      <div className=" bg-[#FDD8E0] hidden md:inline-flex items-center gap-1 justify-center text-[#F4164F] border-[1px] border-[#F4164F]  rounded-[10px]  py-2 px-[14px] text-center">
        <Trash className="w-4 h-4" />
        {children}
      </div>
    </div>
  );
}
