import { Metadata } from "next";
import { auth } from "@/auth";
import Sandbox from "@/app/components/API-Sandbox/Sandbox";

export const metadata: Metadata = {
    title: "Turbo Request – API Sandbox",
}

export default async function API_Sandbox() {
    const session = await auth();
    return (
        <section className="flex pt-14">
            <Sandbox session={session} />
        </section>
    );
}