import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Screen from '@/app/components/Screen';
import CTA from "@/app/components/CTA"

export default function Home() {

  return (
    <section className="">
      <Hero />
      <Features />
      <Screen />
      <CTA />
    </section>
  );
}