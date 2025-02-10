"use client"
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Workflow, BarChart3 } from "lucide-react";

function Features() {
    const features = [
        {
            icon: Zap,
            title: "Lightning-Fast Testing",
            description: "Execute thousands of API tests in parallel with our distributed testing infrastructure. Get results in seconds, not minutes.",
            badges: ["Parallel Execution", "Real-time Results", "Global Infrastructure"]
        },
        {
            icon: Shield,
            title: "Security First",
            description: "Enterprise-grade security with encrypted payloads, environment isolation, and comprehensive audit logs for every request.",
            badges: ["End-to-end Encryption", "Role-based Access", "Audit Trails"]
        },
        {
            icon: Workflow,
            title: "Automated Workflows",
            description: "Create complex testing scenarios with our intuitive workflow builder. Chain requests, handle dependencies, and validate responses automatically.",
            badges: ["Visual Builder", "Custom Scripts", "CI/CD Integration"]
        },
        {
            icon: BarChart3,
            title: "Advanced Analytics",
            description: "Gain deep insights into your API's performance with detailed metrics, trend analysis, and customizable dashboards.",
            badges: ["Performance Metrics", "Custom Reports", "Historical Data"]
        }
    ];

    return (
        <div className="bg-background text-foreground">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Powerful Features for Modern API Testing</h2>
                    <p className="mt-4 font-normal text-base text-muted-foreground max-w-lg text-center mx-auto">
                        Everything you need to test, monitor, and optimize your APIs with confidence
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature) => (
                        <FeatureCard key={feature.title} {...feature} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function FeatureCard({
    icon: Icon,
    title,
    description,
    badges
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    badges: string[];
}) {
    const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        setTransform({ x: rotateY, y: rotateX, scale: 1.02 });
    };

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0, scale: 1 });
    };

    return (
        <Card className="relative overflow-hidden group p-6 py-10 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transform-gpu" style={{ transform: `perspective(1000px) rotateX(${transform.y}deg) rotateY(${transform.x}deg) scale(${transform.scale})`, transition: 'all 0.3s ease-out' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: `translateZ(20px)`, }} />
            <div className="relative z-10" style={{ transform: `translateZ(50px)`, transformStyle: 'preserve-3d' }}>
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-xl transition-transform duration-300 ease-out group-hover:scale-110">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground transition-transform duration-300 ease-out group-hover:translate-y-[-2px]">
                    {title}
                </h3>
                <p className="text-muted-foreground mb-4 transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 transition-transform duration-300 ease-out group-hover:translate-y-[-1px]">
                    {badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-secondary/50 transition-transform duration-300 ease-out hover:scale-105">
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default Features;