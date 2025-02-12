import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/app/components/Navbar'
import Footer from "@/app/components/Footer";
import MobileWarning from "@/app/components/MobileWarning";
import SessionWrapper from "@/app/components/SessionWrapper";
import { auth } from "@/auth";
import SmoothScroll from "@/components/ui/smooth-scroll";


export const metadata: Metadata = {
  title: "Turbo Request – The Ultimate API Testing Tool",
  description: "TurboRequest is a fast and intuitive API testing platform for developers. Send, test, debug, and automate API requests for REST, GraphQL, and WebSockets."
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const session = await auth();

  return (
    <html className="dark" lang="en">
      <SessionWrapper>
        <body className={`antialiased`}>
          <main className='hidden md:block'>
            <SmoothScroll />
            <Navbar session={session} />
            {children}
            <Footer />
          </main>
          <main className="block md:hidden">
            <MobileWarning />
          </main>
        </body>
      </SessionWrapper>
    </html>
  );
}
