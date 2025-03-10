"use client";
import React, { useState } from "react";
import userAvatar from "../assets/avatar.jpg";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {Award, LogOut, UserCircle } from "lucide-react";

export default function User() {
  const [showDrop, setShowDrop] = useState(false);
  return (
    <div>
      <DropdownMenu open={showDrop} onOpenChange={setShowDrop}>
        <DropdownMenuTrigger className="border-none outline-none">
          <div className="">
            <Image
              src={userAvatar}
              alt="User"
              className="w-9 h-9 lg:w-9 lg:h-9 rounded-[10px]"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] mx-4 mt-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex flex-col gap-2 font-[500]">
            <DropdownMenuItem>
              <Link href={"/admin/profile"} className="flex gap-2 items-center">
                <UserCircle className="" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex gap-2 items-center">
                <Award />
                <span>Admin</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex gap-2 items-center text-red-600">
                <LogOut />
                <span>Logout</span>
              </div>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
