import React from "react";
import Navbar from "./Navbar";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import type { AppDispatch } from "@/redux/store";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}

export default function Sidebar({showSidebar , setShowSidebar} : SidebarProps) {


  return (
    <div
      className={`bg-[#F9F9F9] px-5 w-[250px] min-h-screen absolute z-[1000] lg:z-[10] 
      transform ${showSidebar ? "translate-x-0" : "-translate-x-full"} 
      lg:translate-x-0 transition-transform duration-300 ease-in-out lg:relative py-4`}
    >
      <div
        className="flex items-center justify-between px-2 lg:hidden py-3 text-gray-800"
        onClick={() => setShowSidebar(false)}
      >
        <X />
      </div>
      <Navbar />
    </div>
  );
}
