import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Screen from '@/app/components/Screen';
import CTA from "@/app/components/CTA"
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-foreground"></div>
      </div>
    );
  }
  return (
    <section>
      <Hero />
      <Features />
      <Screen />
      <CTA />
    </section>
  );
}