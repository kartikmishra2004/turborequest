import { Metadata } from "next";
import ContactForm from "../components/Extras/ContactForm";

export const metadata: Metadata = {
    title: "Turbo Request – Contact",
}

export default function Contact() {
    return (
        <section className="min-h-screen flex justify-center items-center flex-col py-20">
            <div className="text-center mb-6">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Contact us</h2>
                </div>
            <ContactForm />
        </section>
    );
}