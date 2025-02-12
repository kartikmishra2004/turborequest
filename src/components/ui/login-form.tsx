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

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {

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
                            <Button onClick={() => signIn('github', { redirect: false })} variant="outline" className="w-full">
                                <span><Github /></span>Login with GitHub
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}