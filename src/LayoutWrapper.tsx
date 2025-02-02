"use client"; // ✅ يجب أن يكون مكون عميل

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ احصل على المسار الحالي
  const isLoginPage = pathname === "/login"; // ✅ تحقق إذا كان المستخدم في صفحة تسجيل الدخول

  return (
    <div>
      {!isLoginPage && <Header />}{" "}
      {/* ✅ لا تعرض الـ Header إذا كنا في /login */}
      <div className="flex">
        {!isLoginPage && <Sidebar />}{" "}
        {/* ✅ لا تعرض الـ Sidebar إذا كنا في /login */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
