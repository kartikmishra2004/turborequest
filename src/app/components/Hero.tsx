import { Button } from '@/components/ui/button';
import Spline from '@splinetool/react-spline/next';
import { ArrowRight } from "lucide-react"

export default function Home() {
    return (
        <main className='max-h-screen flex border-b'>
            <div className="w-1/2 h-screen">
                <Spline scene="https://prod.spline.design/UfCCuwvKEnC5pNPU/scene.splinecode" />
            </div>
            <div className="w-1/2 flex pl-12">
                <div className="flex flex-col justify-center space-y-4">
                    <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-8xl max-w-lg">
                        Turbo Request
                    </h1>
                    <p className="text-muted-foreground max-w-lg sm:text-lg">
                        Supercharge your API development with TurboRequest – a fast, intuitive testing platform to send, debug, and automate REST, GraphQL, and WebSocket requests.
                    </p>
                    <div className="flex space-x-3">
                        <Button variant='default' size='lg'>
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button variant='outline' size='lg'>Learn More</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}