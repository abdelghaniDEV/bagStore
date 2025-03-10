"use client"; // ✅ يجب أن يكون مكون عميل

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import type { AppDispatch } from "@/redux/store";
import { fetchCategories } from "./redux/slices/categoriesSlice";
import { useDispatch } from "react-redux";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); //
  const isLoginPage = pathname === "/login"; //

  // const dispatch = useDispatch<AppDispatch>();
  const [showSidebar, setShowSidebar] = useState(false);

  // useEffect(() => {
  //   if(!isLoginPage) {
  //     dispatch(fetchCategories())
  //   }
  // },[isLoginPage])

  return (
    <Provider store={store}>
      <div className="min-h-screen">
        <div className="flex ">
          {!isLoginPage && (
            <Sidebar
              setShowSidebar={setShowSidebar}
              showSidebar={showSidebar}
            />
          )}

          <div className="flex flex-col px-3 md:px-8 w-full">
            {!isLoginPage && <Header setShowSidebar={setShowSidebar} />}
            <main className="flex-1 py-4">{children}</main>
          </div>
        </div>
      </div>
    </Provider>
  );
}
