import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Screen from '@/app/components/Screen';
import SmoothScroll from '@/components/ui/smooth-scroll';

export default function Home() {

  return (
    <section className="">
      <SmoothScroll />
      <Hero />
      <Features />
      <Screen />
    </section>
  );
}