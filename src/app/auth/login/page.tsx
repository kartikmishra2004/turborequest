import { LoginForm } from "@/components/ui/login-form"
import { redirect } from "next/navigation";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Turbo Request – Login",
}

export default async function Login() {

    const session = await auth();

    if (session) {
        return redirect("/");
    }

    return (
        <section className="h-screen flex justify-center items-center">
            <BackgroundBeams />
            <LoginForm />
        </section>
    )
}