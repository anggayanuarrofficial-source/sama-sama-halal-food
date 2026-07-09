import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Ahmad Fauzi',
    role: 'Mahasiswa Indonesia',
    avatar: 'AF',
    color: 'bg-emerald-100 text-emerald-700',
    rating: 5,
    text: 'Rasa nasi gorengnya benar-benar mirip seperti di Indonesia! Tempatnya bersih, nyaman, dan halal. Sangat cocok untuk mahasiswa seperti saya yang rindu masakan rumah.',
  },
  {
    name: 'Tanaka Yuki',
    role: 'Warga Jepang',
    avatar: 'TY',
    color: 'bg-gold-100 text-gold-700',
    rating: 5,
    text: 'Sate ayamnya sangat enak! Saya pertama kali mencoba makanan Indonesia dan langsung jatuh cinta. Pelayanannya ramah dan suasana restorannya sangat nyaman.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Wisatawan Australia',
    avatar: 'SM',
    color: 'bg-blue-100 text-blue-700',
    rating: 5,
    text: 'Found this gem while exploring Nagoya. The rendang was absolutely amazing! Knowing it is 100% halal made our dining experience even better. Highly recommended!',
  },
];

export default function Testimonials() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-title > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-title', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.testimonial-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.testimonials-grid', start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="section-padding bg-white relative"
    >
      <div className="w-full container-padding">
        {/* Title */}
        <div className="testimonials-title text-center mb-12 md:mb-16">
          <span className="inline-block font-body text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            {t('testimonials.subtitle')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-wood-900">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-cream-50 rounded-2xl p-6 md:p-8 border border-wood-100"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-200" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-gold-500 fill-gold-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-sm md:text-base text-wood-600 leading-relaxed mb-6">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm ${item.color}`}
                >
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-wood-900">
                    {item.name}
                  </h4>
                  <p className="font-body text-xs text-wood-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
