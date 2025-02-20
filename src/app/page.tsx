import Hero from '@/app/components/Home/Hero';
import Features from '@/app/components/Home/Features';
import Screen from '@/app/components/Home/Screen';
import CTA from "@/app/components/Home/CTA"

export default function Home() {
  return (
    <section>
      <Hero />  
      <Features />
      <Screen />
      <CTA />
    </section>
  );
}