"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CodeBlockDemo from '@/app/components/CodeBlock'

export default function CTA() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 pb-28">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
                <div className="absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full spotlight opacity-20 blur-xl" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-3 justify-center mb-8">
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Test Your APIs with
                    <br />
                    Confidence
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">Powerful, intuitive API testing platform for developers. Build, test, and deploy with ease.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap gap-4 justify-center mb-16" >
                    <Button size="lg">
                        Start Testing Now
                    </Button>
                    <Button size="lg" variant="outline">
                        View Docs
                    </Button>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} className="animate-float">
                    <CodeBlockDemo />
                </motion.div>
            </div>
        </div>
    );
};