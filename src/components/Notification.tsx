import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";

//   const items = [
//     { label: "New Orders", href: "/admin/orders" },
//     { label: "New Products", href: "/admin/products" },
//     { label: "Settings", href: "/admin/settings" }, ]
export default function Notification() {
  return (
    <div className="ove overflow-hidden">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline outline-none">
          <div className="">
            <Bell className=" border-2 p-2 h-9 w-9 rounded-[10px]" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[400px] mr-10">
          <DropdownMenuLabel>Notification</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <div>New Order</div>
            <div className="text-gray-500">3 hours ago</div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div>New Product</div>
            <div className="text-gray-500">2 days ago</div>
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
