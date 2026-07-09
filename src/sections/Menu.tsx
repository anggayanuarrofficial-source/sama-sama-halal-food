import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    key: 'menu.rendang',
    image: '/images/hero-1.jpg',
    rating: 4.9,
    category: 'Padang',
  },
  {
    key: 'menu.nasgor',
    image: '/images/hero-2.jpg',
    rating: 4.8,
    category: 'Rice',
  },
  {
    key: 'menu.sate',
    image: '/images/hero-3.jpg',
    rating: 4.7,
    category: 'Grill',
  },
  {
    key: 'menu.penyet',
    image: '/images/gallery-2.jpg',
    rating: 4.8,
    category: 'Fried',
  },
  {
    key: 'menu.bakso',
    image: '/images/gallery-3.jpg',
    rating: 4.6,
    category: 'Soup',
  },
  {
    key: 'menu.mie',
    image: '/images/gallery-6.jpg',
    rating: 4.7,
    category: 'Noodles',
  },
];

export default function Menu() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRow1Ref = useRef<HTMLDivElement>(null);
  const scrollRow2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.menu-title > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-title', start: 'top 80%' },
        }
      );

      // Cards animation
      gsap.fromTo(
        '.menu-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.menu-grid', start: 'top 85%' },
        }
      );

      // Auto-scroll rows
      if (scrollRow1Ref.current) {
        gsap.to(scrollRow1Ref.current, {
          xPercent: -50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
      if (scrollRow2Ref.current) {
        gsap.to(scrollRow2Ref.current, {
          xPercent: 50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollItems = ['Noodles', 'Rice', 'Grill', 'Sweets', 'Drinks', 'Desserts', 'Noodles', 'Rice', 'Grill', 'Sweets', 'Drinks', 'Desserts'];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Auto-scroll text rows */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden opacity-[0.04] pointer-events-none">
        <div ref={scrollRow1Ref} className="flex whitespace-nowrap">
          {scrollItems.map((item, i) => (
            <span key={i} className="font-heading text-8xl md:text-9xl font-bold text-wood-900 px-8">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 overflow-hidden opacity-[0.04] pointer-events-none">
        <div ref={scrollRow2Ref} className="flex whitespace-nowrap">
          {scrollItems.map((item, i) => (
            <span key={i} className="font-heading text-8xl md:text-9xl font-bold text-emerald-500 px-8">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full container-padding relative z-10">
        {/* Title */}
        <div className="menu-title text-center mb-12 md:mb-16">
          <span className="inline-block font-body text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            {t('menu.subtitle')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-wood-900">
            {t('menu.title')}
          </h2>
        </div>

        {/* Menu Grid */}
        <div className="menu-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="menu-card group bg-white rounded-2xl overflow-hidden shadow-md border border-wood-100 menu-card-hover cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={t(`${item.key}.name`)}
                  className="menu-card-image w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                  <span className="font-body text-xs font-semibold text-wood-800">
                    {item.rating}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white font-body text-sm font-medium px-4 py-2 rounded-full">
                    {t('menu.view')}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <span className="font-body text-xs text-emerald-600 font-medium uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-wood-900 mt-1 mb-2">
                  {t(`${item.key}.name`)}
                </h3>
                <p className="font-body text-sm text-wood-500 mb-4 line-clamp-2">
                  {t(`${item.key}.desc`)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold text-emerald-600">
                    ¥{t(`${item.key}.price`)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
