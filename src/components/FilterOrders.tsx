import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type FilterOrdersProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FilterOrders({ setSearch , search , setRefresh} : FilterOrdersProps) {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search By Order #, Customer, city,country,email ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-10 border-b-[1px] md:w-[500px]"
            // onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute top-2 left-2  " />
        </div>
      </div>
    </div>
  );
}
