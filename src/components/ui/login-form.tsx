"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Github } from "lucide-react"
import { signIn } from "next-auth/react";
import emailjs from "@emailjs/browser";
import { useSession } from "next-auth/react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

    const { data: session } = useSession();

    const handleLogin = () => {
        signIn('github', { redirect: false });
        emailjs.send(
            "service_t6pezzm",
            "template_av3tazf",
            { user_name: session?.user?.name, user_email: session?.user?.email },
            "T_CtaUa1Ssex2XazV"
        )
            .then((response) => {
                console.log("Email sent successfully:", response);
            })
            .catch((error) => {
                console.error("Error sending email:", error);
            });
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="z-40 p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Continue by logging into your account below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="flex flex-col gap-6">
                            <Button onClick={handleLogin} variant="outline" className="w-full">
                                <span><Github /></span>Login with GitHub
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}