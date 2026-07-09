import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, CheckCircle, Leaf, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Shield, text: 'Halal Certified Ingredients' },
  { icon: CheckCircle, text: 'No Alcohol Used' },
  { icon: Leaf, text: 'Fresh & Natural' },
  { icon: Droplets, text: 'Clean Preparation' },
];

export default function Halal() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.halal-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.halal-feature',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.halal-features', start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="halal"
      ref={sectionRef}
      className="section-padding bg-wood-900 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 batik-pattern opacity-5" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="w-full container-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="halal-content">
            <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-6 py-3 mb-8">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="font-body text-sm font-semibold text-emerald-400 uppercase tracking-wider">
                {t('halal.badge')}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('halal.title')}
            </h2>
            <p className="font-heading text-xl md:text-2xl text-gold-400 italic mb-8">
              {t('halal.subtitle')}
            </p>

            {/* Description */}
            <div className="max-w-3xl mx-auto space-y-4 mb-12">
              <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
                {t('halal.p1')}
              </p>
              <p className="font-body text-base md:text-lg text-white/70 leading-relaxed">
                {t('halal.p2')}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="halal-features grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="halal-feature flex flex-col items-center gap-3 p-5 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <feature.icon className="w-8 h-8 text-emerald-400" />
                <span className="font-body text-sm text-white/80 text-center">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Halal logo placeholder */}
          <div className="mt-12 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-1">🌙</div>
                <div className="font-body text-[10px] text-emerald-400 font-semibold uppercase">
                  Halal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
