import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Menu from '@/sections/Menu';
import Halal from '@/sections/Halal';
import Gallery from '@/sections/Gallery';
import Testimonials from '@/sections/Testimonials';
import Location from '@/sections/Location';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Halal />
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
