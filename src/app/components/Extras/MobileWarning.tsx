import { ArrowRight, Monitor, Smartphone } from "lucide-react";

export default function MobileWarning() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <main className="container mx-auto px-4 py-16">
                <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-8">
                    <div className="text-center animate-fade-up">
                        <Smartphone className="w-16 h-16 mx-auto mb-6 text-destructive" />
                        <h1 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 text-3xl mb-3 font-extrabold">Mobile Access Restricted</h1>
                        <p className="text-muted-foreground text-lg mb-8">
                            This application is optimized for desktop viewing. Please switch to a desktop device for the best experience.
                        </p>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="flex items-center space-x-2 text-muted-foreground">
                                <Smartphone className="w-5 h-5" />
                                <ArrowRight className="w-4 h-4" />
                                <Monitor className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}