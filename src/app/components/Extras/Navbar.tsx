"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Logout from "@/app/components/Extras/Logout";
import WelcomeBar from "@/app/components/Home/WelcomeBar";

interface NavItem {
    name: string;
    href: string;
}

const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "API Sandbox", href: "/api-sandbox" },
];

interface NavbarProps {
    session?: Partial<Session> | null,
}

export default function Navbar({ session }: NavbarProps) {

    const pathname = usePathname();
    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                {session && pathname === '/' && <WelcomeBar />}
                <div className="container lg:px-24 px-3 flex h-14 max-w-screen-2xl items-center">
                    <Link href='/' className="mr-6 flex items-center space-x-2">
                        <span><Image className="invert" priority src='/logo.png' alt="logo" width={30} height={30} /></span>
                    </Link>
                    <nav className={`flex ${session ? 'lg:ml-[7rem] ml-0' : ''} flex-1 justify-center items-center space-x-10 text-sm font-medium`}>
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className={`transition-colors tracking-wider lg:text-sm text-xs ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Link href='/contact'>
                            <Button variant='outline' size="sm">Contact</Button>
                        </Link>
                        {!session ?
                            <Link href='/auth/login'>
                                <Button size="sm" >Login</Button >
                            </Link> :
                            <div className="w-max relative flex gap-6">
                                <Button className="cursor-default" size='sm' variant='secondary'>
                                    <Image unoptimized src={session.user?.image || ''} width={20} height={20} className="rounded-full" alt="pfp" />
                                    {session.user?.name}
                                </Button>
                                <Logout />
                            </div>
                        }
                    </div>
                </div>
            </header>
        </>
    );
}