"use client"
import React from 'react';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function NotFound() {

    const router = useRouter();

    return (
        <div className="min-h-screen text-primary flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="mb-8 animate-float">
                    <Ghost className="h-24 w-24 mx-auto animate-pulse" />
                </div>

                <h1 className="text-6xl font-bold mb-4">
                    404
                </h1>

                <h2 className="text-3xl font-semibold mb-6 text-gray-300">
                    Page Not Found
                </h2>

                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for seems to have vanished into the digital void.
                    Don&apos;t worry though, you can find your way back home.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant='outline' onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go Back
                    </Button>
                    <Link href='/'>
                        <Button>
                            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;