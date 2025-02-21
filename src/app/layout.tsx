import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/app/components/Extras/Navbar'
import MobileWarning from "@/app/components/Extras/MobileWarning";
import SessionWrapper from "@/app/components/Extras/SessionWrapper";
import { auth } from "@/auth";
import FooterWrapper from "@/components/ui/footer-wrapper";
import { AuthProvider } from "@/context/authContext";
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata: Metadata = {
  title: "Turbo Request – The Ultimate API Testing Tool",
  description: "TurboRequest is a fast and intuitive API testing platform for developers. Send, test, debug, and automate API requests for REST, GraphQL, and WebSockets."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const session = await auth();
  return (
    <html className="dark" lang="en">
      <SessionWrapper>
        <body className={`antialiased`}>
          <AuthProvider>
            <TooltipProvider>
              <main className='hidden md:block'>
                <Navbar session={session} />
                {children}
                <FooterWrapper />
              </main>
            </TooltipProvider>
          </AuthProvider>
          <main className="block md:hidden">
            <MobileWarning />
          </main>
        </body>
      </SessionWrapper>
    </html>
  );
}