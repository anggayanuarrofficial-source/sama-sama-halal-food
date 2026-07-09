import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Clock, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-text > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-stat',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Halal Badge 3D effect
  useEffect(() => {
    const badgeEl = badgeRef.current;
    if (!badgeEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX - dimensions.current.width / 2) / (dimensions.current.width / 2),
        y: (e.clientY - dimensions.current.height / 2) / (dimensions.current.height / 2),
      };
    };

    const handleResize = () => {
      if (badgeEl) {
        dimensions.current = {
          width: badgeEl.offsetWidth,
          height: badgeEl.offsetHeight,
        };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      const mouse = mousePos.current;
      const targetX = mouse.y * 15;
      const targetY = mouse.x * -15;
      if (badgeEl) {
        badgeEl.style.transform = `perspective(1000px) rotateX(${targetX}deg) rotateY(${targetY}deg)`;
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const stats = [
    { icon: Clock, value: '5+', label: t('about.stats.years') },
    { icon: Award, value: '50+', label: t('about.stats.dishes') },
    { icon: Users, value: '10K+', label: t('about.stats.customers') },
    { icon: Heart, value: '100%', label: 'Halal' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-cream-50 relative overflow-hidden"
    >
      {/* Decorative batik */}
      <div className="absolute top-0 right-0 w-96 h-96 batik-pattern opacity-20 translate-x-1/2 -translate-y-1/2" />

      <div className="w-full container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto">
          {/* Text Content */}
          <div ref={contentRef} className="about-text">
            <span className="inline-block font-body text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">
              {t('about.subtitle')}
            </span>
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-wood-900 mb-6 leading-tight">
              {t('about.title')}
            </h2>
            <p className="font-body text-base md:text-lg text-wood-600 leading-relaxed mb-4">
              {t('about.p1')}
            </p>
            <p className="font-body text-base md:text-lg text-wood-600 leading-relaxed mb-4">
              {t('about.p2')}
            </p>
            <p className="font-body text-base md:text-lg text-wood-600 leading-relaxed">
              {t('about.p3')}
            </p>
          </div>

          {/* Halal Badge */}
          <div className="flex justify-center items-center">
            <div
              ref={badgeRef}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 178, 172, 0.1), rgba(255,255,255,0.05), rgba(56, 178, 172, 0.1))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(26, 32, 44, 0.3), inset 0 0 20px rgba(255,255,255,0.05)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Outer ring */}
              <div
                className="absolute inset-2 md:inset-4 rounded-full border border-emerald-500 opacity-20"
                style={{ transform: 'translateZ(10px)' }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-6 md:inset-8 rounded-full border border-gold-500 opacity-40"
                style={{ transform: 'translateZ(20px)' }}
              />
              {/* Inner highlight */}
              <div
                className="absolute inset-12 md:inset-16 rounded-full bg-gradient-to-br from-white/20 to-transparent"
                style={{ transform: 'translateZ(30px)' }}
              />
              {/* Content */}
              <div
                className="relative z-10 text-center"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="text-4xl md:text-5xl mb-2">🌙</div>
                <div className="text-2xl md:text-3xl mb-2">✦</div>
                <p className="font-heading text-sm md:text-base font-bold text-wood-900 tracking-wider">
                  100% MUSLIM
                </p>
                <p className="font-heading text-sm md:text-base font-bold text-wood-900 tracking-wider">
                  FRIENDLY
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-24 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="about-stat text-center p-6 bg-white rounded-2xl shadow-sm border border-wood-100"
            >
              <stat.icon className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
              <div className="font-heading text-3xl md:text-4xl font-bold text-wood-900 mb-1">
                {stat.value}
              </div>
              <div className="font-body text-sm text-wood-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
