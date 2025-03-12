"use client"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import emailjs from "@emailjs/browser";

export default function SendMail() {

    const { data: session } = useSession()
    useEffect(() => {
        const checkUser = async () => {
            if (session) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-user`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: session?.user?.email,
                    }),
                });
                const response = await res.json();
                if (response.isNewUser === true) {
                    try {
                        const emailRes = await emailjs.send(
                            process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
                            process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
                            { user_name: session?.user?.name, user_email: session?.user?.email },
                            process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
                        )
                        if (emailRes.status === 200) {
                            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-new-user-state`, {
                                method: "PUT",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    email: session?.user?.email,
                                }),
                            })
                        }
                    } catch (error) {
                        console.error("Error sending email:", error);
                    }
                }
            }
        }
        checkUser();
    }, [session])
    return null;
}