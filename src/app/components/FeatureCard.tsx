import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FeatureCard({
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
    return (
        <Card className="relative overflow-hidden group p-6 transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
                <div className="mb-4 inline-block p-3 bg-primary/10 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
                <p className="text-muted-foreground mb-4">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="bg-secondary/50">
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>
        </Card>
    );
}