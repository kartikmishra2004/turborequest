import { Metadata } from "next";
import Sidebar from "@/app/components/Sidebar";
import PlayGround from "@/app/components/Playground";

export const metadata: Metadata = {
    title: "Turbo Request – API Sandbox",
}

export default function API_Sandbox() {
    return (
        <section className="flex pt-14">
            <Sidebar />
            <PlayGround />
        </section>
    );
}