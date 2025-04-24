import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactForm() {
    return (
        <Card className="border-zinc-200 dark:border-zinc-800 w-[25rem]">
            <CardContent className="pt-6">
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-zinc-900 dark:text-zinc-50">Name</Label>
                        <Input
                            id="name"
                            placeholder="Your name"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-900 dark:text-zinc-50">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-zinc-900 dark:text-zinc-50">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="What is this regarding?"
                            className="px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-zinc-900 dark:text-zinc-50">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Your message here..."
                            className="min-h-[120px] px-3 py-1 rounded-md border bg-background text-sm"
                        />
                    </div>

                    <Button
                        type="button"
                        className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Send Message
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}