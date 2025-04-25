"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import { Check } from "lucide-react"

export default function ContactForm() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSend = async () => {
        setLoading(true);
        try {
            await fetch('/api/contact', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            setLoading(false);
            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setSent(true);
            setTimeout(() => {
                setSent(false);
            }, 2000);
        } catch (error) {
            console.log("Failed to send message!!", error);
            setLoading(false);
        }
    }

    return (
        <Card className="border-zinc-200 dark:border-zinc-800 w-[25rem]">
            <CardContent className="pt-6">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-50">Name</Label>
                        <Input
                            autoComplete="off"
                            onChange={handleChange}
                            value={form.name}
                            name="name"
                            id="name"
                            placeholder="Your name"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-50">Email</Label>
                        <Input
                            autoComplete="off"
                            onChange={handleChange}
                            value={form.email}
                            name="email"
                            id="email"
                            placeholder="your.email@example.com"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-zinc-900 dark:text-zinc-50">Subject</Label>
                        <Input
                            autoComplete="off"
                            onChange={handleChange}
                            value={form.subject}
                            name="subject"
                            id="subject"
                            placeholder="What is this regarding?"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-50">Message</Label>
                        <Textarea
                            autoComplete="off"
                            onChange={handleChange}
                            value={form.message}
                            name="message"
                            id="message"
                            placeholder="Your message here..."
                            className="min-h-[120px] px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>
                    <Button
                        disabled={!form.name || !form.email || !form.subject || !form.message}
                        onClick={handleSend}
                        type="button"
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        {loading ? (<div className="loader"></div>) : (sent ? (<Check className="h-4 w-4 mx-0.5" />) : "Send")}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}