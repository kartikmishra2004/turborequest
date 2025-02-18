import { Metadata } from "next";
import Sidebar from "@/app/components/Sidebar";
import PlayGround from "@/app/components/Playground";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: "Turbo Request – API Sandbox",
}

export default async function API_Sandbox() {
    const session = await auth();
    return (
        <section className="flex pt-14">
            <Sidebar session={session} />
            <PlayGround />
        </section>
    );
}