"use client";
import "./globals.css";
// import Head from "next/head";
import Navbar from "./components/navbar/Navbar";
import { NextAuthProvider } from "./components/Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <body>
          <Navbar />
          <main>{children}</main>
        </body>
      </html>
    </NextAuthProvider>
  );
}
