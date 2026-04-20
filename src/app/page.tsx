import Navbar from '@/components/layout/Navbar';
import TickerStrip from '@/components/layout/TickerStrip';
import Hero from '@/components/sections/Hero';
import Markets from '@/components/sections/Markets';
import Exchange from '@/components/sections/Exchange';
import Features from '@/components/sections/Features';
import Socials from '@/components/sections/Socials';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <TickerStrip />
      <Hero />
      <Markets />
      <Exchange />
      <Features />
      <Socials />
      <Footer />
    </main>
  );
}
