import Hero from '@/app/components/Hero';
import Features from '@/app/components/Features';
import Screen from '@/app/components/Screen';
import CTA from "@/app/components/CTA"
import { auth } from '@/auth';

export default async function Home() {
  await auth();
  return (
    <section className='min-h-screen'>
      <Hero />
      <Features />
      <Screen />
      <CTA />
    </section>
  );
}