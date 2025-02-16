"use client"
import Footer from '@/app/components/Footer';
import { usePathname } from 'next/navigation';

export default function FooterWrapper() {
    const pathname = usePathname()
    if (pathname !== '/api-sandbox') {
        return (
            <Footer />
        );
    }
    return null;
}