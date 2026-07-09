import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ChevronRight, MapPin } from 'lucide-react';

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
];

export default function Hero() {
  const { t } = useLanguage();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotating background images
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
        '-=0.8'
      )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Mouse parallax for headline
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headlineRef.current) return;
      const nX = (window.innerWidth / 2 - e.pageX) / 20;
      gsap.to(headlineRef.current, {
        duration: 1,
        x: nX,
        ease: 'power4.out',
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Images with crossfade */}
      {heroImages.map((img, index) => (
        <div
          key={img}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: currentImage === index ? 1 : 0 }}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-wood-900/70 via-wood-900/50 to-wood-900/80"
      />

      {/* Batik pattern overlay */}
      <div className="absolute inset-0 batik-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 text-center container-padding max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-float">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="font-body text-sm text-white/90 tracking-wide">
            Nagoya, Japan
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white mb-4 tracking-tight"
        >
          SAMA-SAMA
        </h1>

        {/* Subheadline */}
        <p
          ref={subtitleRef}
          className="font-heading text-2xl sm:text-3xl md:text-4xl text-white/90 mb-3 italic"
        >
          {t('hero.subheadline')}
        </p>

        <p className="font-body text-base sm:text-lg text-white/70 mb-10 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#menu"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-body font-semibold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
          >
            {t('hero.cta.menu')}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-body font-semibold text-base px-8 py-4 rounded-full border border-white/20 transition-all duration-300"
          >
            {t('hero.cta.reserve')}
          </a>
        </div>

        {/* Image indicators */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentImage === index
                  ? 'w-8 bg-emerald-400'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
