import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import React from "react";
import { Logo } from "@/app/Logo";

const gotham = localFont({
  src: [
    {
      weight: "400",
      path: "../../public/fonts/Gotham-400-Book.woff2",
    },
    {
      weight: "500",
      path: "../../public/fonts/Gotham-500-Medium.woff2",
    },
    {
      weight: "700",
      path: "../../public/fonts/Gotham-700-Bold.woff2",
    },
  ],
});

export const metadata: Metadata = {
  title: "🚀 WPPL 🚀",
  description: "Collabothon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gotham.className} antialiased`}>
        <div className="header">
          <Logo />
          <nav>
            <a href="#">Accounts & Payment Transactions</a>
            <a href="#">Financing & Foreign Trade</a>
            <a href="#">Investments & Risk Management</a>
            <a href="#">Services</a>
          </nav>
        </div>

        {children}

        <footer>© 2024 Commerzbank AG</footer>
      </body>
    </html>
  );
}
