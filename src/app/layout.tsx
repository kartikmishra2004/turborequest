import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/app/components/Navbar'
import Footer from "@/app/components/Footer";
import MobileWarning from "@/app/components/MobileWarning"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turbo Request – The Ultimate API Testing Tool",
  description: "TurboRequest is a fast and intuitive API testing platform for developers. Send, test, debug, and automate API requests for REST, GraphQL, and WebSockets."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <main className='hidden md:block'>
          <Navbar />
          {children}
          <Footer />
        </main>
        <main className="block md:hidden">
          <MobileWarning />
        </main>
      </body>
    </html>
  );
}
