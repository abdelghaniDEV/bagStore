"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import User from "./User";
import Notification from "./Notification";
import { useDispatch } from "react-redux";
import { fetchCategories } from "@/redux/slices/categoriesSlice";
import type { AppDispatch } from "@/redux/store";

type headerProps = {
  setShowSidebar: (show: boolean) => void;
};

export default function Header({ setShowSidebar }: headerProps) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories on header load (client side)
    // return () => {
    //   // Cleanup function
    // }; // Cleanup function to unmount the effect
  }, []);
  return (
    <div className="py-3 flex items-center justify-between">
      <div className="lg:hidden">
        <Menu className="h-8 w-8" onClick={() => setShowSidebar(true)} />
      </div>
      <div className="relative hidden md:block">
      
        <Input
          type="text"
          placeholder="Search Anything"
          className="pl-10 w-[400px] h-8  "
        />
        <Search className="absolute top-1 left-2 text-slate-300" />
      </div>
      
      <div className="flex items-center gap-4">
        <Notification />
        <User />
      </div>
    </div>
  );
}
