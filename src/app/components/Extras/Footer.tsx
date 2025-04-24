import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="flex flex-col gap-8 py-8 md:flex-row md:py-12 px-24">
                <div className="flex-1 space-y-6">
                    <div className="flex gap-2 items-center">
                        <span><Image className="invert" priority src='/logo.png' alt="logo" width={30} height={30} /></span>
                        <h2 className="font-bold">Turbo Request</h2>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">The Ultimate Powerhouse for API Testing. Faster. Smarter. Stronger.</p>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Company</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground transition-colors hover:text-primary">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-muted-foreground transition-colors hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium">Connect</h3>
                        <div className="flex space-x-4">
                            <Link
                                target="_blank"
                                href="https://github.com/kartikmishra2004/xenoweb"
                                className="text-muted-foreground transition-colors hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                            <Link
                                target="_blank"
                                href="https://x.com/kartikmishra01_"
                                className="text-muted-foreground transition-colors hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link
                                target="_blank"
                                href="https://www.linkedin.com/in/kartikmishra2004/"
                                className="text-muted-foreground transition-colors hover:text-primary">
                                <Linkedin className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t py-6">
                <p className="text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Turbo Request, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    )
}