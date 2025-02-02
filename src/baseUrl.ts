import { NextResponse } from "next/server";

export function middleware(req : any) {
    const { pathname } = req.nextUrl;
  
    // إذا كان المستخدم يحاول الوصول إلى `/`، يتم إعادة توجيهه إلى `/dashboard`
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  
    return NextResponse.next();
  }
  
  export const config = {
    matcher: "/", // تطبيق Middleware فقط على المسار `/`
  };