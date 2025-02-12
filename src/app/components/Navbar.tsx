"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Power } from "lucide-react";
import { Session } from "next-auth";

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "API Sandbox", href: "/api-sandbox" },
    { name: "Docs", href: "/docs" },
    { name: "About Us", href: "/about" },
];

interface NavbarProps {
    session?: Partial<Session> | null,
}

export default function Navbar({ session }: NavbarProps) {

    const [showDD, setShowDD] = useState(false)

    const pathname = usePathname();
    return (
        <header className="fixed lg:px-24 px-3 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <Link href='/' className="mr-6 flex items-center space-x-2">
                    <span><Image className="invert" src='/logo.png' alt="logo" width={30} height={30} /></span>
                </Link>
                <nav className="flex flex-1 justify-center items-center space-x-10 text-sm font-medium">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className={`transition-colors tracking-wider lg:text-sm text-xs ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}>
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    {!session ?
                        <Link href='/auth/login'>
                            <Button size="sm" >Login</Button >
                        </Link> :
                        <div className="w-max relative">
                            <Button onClick={() => setShowDD(!showDD)} size='sm' variant='secondary'>
                                <Image unoptimized src={session.user?.image || ''} width={20} height={20} className="rounded-full" alt="pfp" />
                                {session.user?.name}
                            </Button>
                            {
                                showDD && <div className="w-full flex justify-center items-center h-20 bg-zinc-950 absolute border rounded-md top-10">
                                    <Button onClick={() => signOut()} size='sm' variant='destructive'>
                                        <Power />Logout
                                    </Button>
                                </div>
                            }
                        </div>
                    }
                    <Link href='/contact'>
                        <Button variant='outline' size="sm">Contact</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}