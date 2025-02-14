import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import Logout from "./Logout";
import NavLink from "./NavLink"

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

export default async function Navbar() {
    const session = await auth();

    return (
        <header className="fixed lg:px-24 px-3 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center">
                <Link href='/' className="mr-6 flex items-center space-x-2">
                    <span><Image className="invert" src='/logo.png' alt="logo" width={30} height={30} priority /></span>
                </Link>
                <nav className="flex flex-1 justify-center items-center space-x-10 text-sm font-medium">
                    {navItems.map((item) => (
                        <NavLink key={item.name} item={item} />
                    ))}
                </nav>
                <div className="flex items-center space-x-4">
                    <Link href='/contact'>
                        <Button variant='outline' size="sm">Contact</Button>
                    </Link>
                    {!session ? (
                        <Link href='/auth/login'>
                            <Button size="sm">Login</Button>
                        </Link>
                    ) : (
                        <div className="w-max relative flex gap-4">
                            <Button className="cursor-default" size='sm' variant='secondary'>
                                <Image
                                    unoptimized
                                    src={session.user?.image || '/default-avatar.png'}
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                    alt="profile picture"
                                />
                                {session.user?.name}
                            </Button>
                            <Logout />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}