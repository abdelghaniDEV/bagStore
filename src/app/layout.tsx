import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/LayoutWrapper";
import { ToastContainer } from "react-toastify";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        <ToastContainer />

        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
