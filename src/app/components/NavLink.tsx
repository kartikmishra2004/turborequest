"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
    name: string;
    href: string;
}

interface NavLinkProps {
    item: NavItem;
}

export default function NavLink({ item }: NavLinkProps) {
    const pathname = usePathname();

    return (
        <Link
            href={item.href}
            className={`transition-colors tracking-wider lg:text-sm text-xs ${pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                } hover:text-primary`}>
            {item.name}
        </Link>
    );
}