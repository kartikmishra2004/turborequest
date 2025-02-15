"use client"
import { X } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WelcomeBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "z-50 animate-in fade-in slide-in-from-top duration-500",
      )}>
      <Alert variant="secondary" className="rounded-none py-0.5">
        <div className="container mx-auto flex items-center justify-center px-4 py-1">
          <div className="w-full flex justify-center">
            <AlertDescription className="text-sm flex items-center gap-2 text-secondary-foreground">
              <span className="font-semibold text-foreground/80">Welcome!</span>
              <span className="text-muted-foreground lg:text-sm text-xs">
                Test, monitor, and document your APIs with our enhanced platform. Try our new GraphQL support!
              </span>
            </AlertDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 shrink-0 p-0 hover:bg-secondary/80"
            onClick={() => setIsVisible(false)}>
            <X className="h-3 w-3" />
            <span className="sr-only">Close welcome message</span>
          </Button>
        </div>
      </Alert>
    </div>
  );
}