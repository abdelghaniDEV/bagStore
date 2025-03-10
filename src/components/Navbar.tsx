import { Box, LayoutDashboard, LayoutGrid, ShoppingBag, UserRoundCog, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex flex-col gap-7">
        <Link href={"/admin"} className="flex gap-3 items-center">
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        <Link href={"/admin/products"} className="flex gap-3 items-center">
          <Box />
          <span>Products</span>
        </Link>
        <Link href={"/admin/categories"} className="flex gap-3 items-center">
          <LayoutDashboard />
          <span>Categories</span>
        </Link>
        <Link href={"/admin/orders"} className="flex gap-3 items-center">
          <ShoppingBag />
          <span>Orders</span>
        </Link>
        <Link href={"/"} className="flex gap-3 items-center">
          <Users />
          <span>Customers</span>
        </Link>
        <Link href={"/"} className="flex gap-3 items-center">
          <UserRoundCog />
          <span>Profile</span>
        </Link>
      </ul>
    </nav>
  );
}
