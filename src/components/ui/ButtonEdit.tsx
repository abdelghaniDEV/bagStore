import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ButtonEdit({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <i className="bx bx-edit-alt bg-[#76a963] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
      <div className="hidden  md:inline-flex bg-[#A3EEA7] items-center justify-center gap-1 jus text-[#0D8215] rounded-[20px] border-[1px] border-[#0D8215] py-2 px-[14px] text-center">
        <Edit className="w-4 h-4" />
        {children}
      </div>
    </div>
  );
}
