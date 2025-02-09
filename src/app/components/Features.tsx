import { Zap, Shield, Workflow, BarChart3 } from "lucide-react";
import FeatureCard from "@/app/components/FeatureCard";

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

export default Features;