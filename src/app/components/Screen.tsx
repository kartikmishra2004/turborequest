"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";

export default function Screen() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="font-normal text-4xl text-muted-foreground max-w-lg text-center mx-auto">
                            Test APIs Effortlessly, Debug<br />
                            <span className="text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                                Seamlessly!
                            </span>
                        </h1>
                    </>
                }>
                <Image
                    src='/screen.png'
                    alt="hero"
                    height={720}
                    width={1400}
                    className="mx-auto object-fill rounded-2xl border h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}