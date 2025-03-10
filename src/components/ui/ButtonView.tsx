import { Eye } from "lucide-react";
import React from "react";

export default function ButtonView({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string; // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class if needed  // Add custom class
}) {
  return (
    <div className="">
      <i className="bx bx-edit-alt bg-[#94C0FF] md:hidden text-white rounded-[8px] p-[10px] text-center"></i>
      <div className={`${className} hidden md:inline-flex items-center justify-center gap-1 bg-[#94C0FF] text-[#0167F6] rounded-[20px] border border-[#0167F6] py-2 px-[14px]`}>
        <Eye className="w-4 h-4" />
        {children}
      </div>
    </div>
  );
}
