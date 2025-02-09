import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FlipWords } from "@/components/ui/flip-words";

export default function Hero() {

    const words = ['Send requests instantly.', 'Analyze responses effortlessly.', 'Debug errors in seconds.', 'Optimize APIs with ease.']

    return (
        <div className="h-screen w-full rounded-md flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className=" p-4 max-w-7xl mx-auto relative z-10  w-full pt-20 md:pt-0">
                <h1 className="text-4xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Turbo Request
                </h1>
                <h1 className="bg-clip-text text-center mt-4 text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 text-4xl">
                    <FlipWords words={words} />
                </h1>
                <p className="mt-10 font-normal text-base text-muted-foreground max-w-lg text-center mx-auto">
                    Supercharge your API development with TurboRequest – a fast, intuitive testing platform to send, debug, and automate REST, GraphQL, and WebSocket requests.
                </p>
                <div className="flex justify-center pt-10 space-x-5">
                    <Link href='/api-sandbox'>
                        <Button variant='default' size='lg'>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                    <Link href='/about'>
                        <Button variant='outline' size='lg'>Learn More</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}