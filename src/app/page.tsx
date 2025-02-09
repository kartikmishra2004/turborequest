import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Screen from '@/app/components/Screen';

export default function Home() {
  return (
    <section className="h-[200vh]">
      <Hero />
      <Features />
      <Screen />
    </section>
  );
}