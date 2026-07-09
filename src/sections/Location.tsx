import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.location-title > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.location-title', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.location-content > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.location-content', start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.location-map',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.location-map', start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.537416547316!2d136.9043!3d35.1645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600377446564c5e7%3A0x20c9e7d3e3f5e5e5!2sSakae%2C%20Naka%20Ward%2C%20Nagoya%2C%20Aichi!5e0!3m2!1sen!2sjp!4v1700000000000!5m2!1sen!2sjp`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-cream-50 relative"
    >
      <div className="w-full container-padding">
        {/* Title */}
        <div className="location-title text-center mb-12 md:mb-16">
          <span className="inline-block font-body text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            {t('location.subtitle')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-wood-900">
            {t('location.title')}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info Cards */}
          <div className="location-content lg:col-span-2 space-y-4">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-wood-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-wood-900 uppercase tracking-wider mb-1">
                    {t('location.address')}
                  </h3>
                  <p className="font-body text-sm text-wood-600 leading-relaxed">
                    〒460-0008 Aichi, Nagoya,
                    <br />
                    Naka Ward, Sakae, 3 Chome-9-1
                    <br />
                    東和住吉ビル北館 2F
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SAMA-SAMA+Halal+Food+Nagoya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 font-body text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    {t('location.directions')}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 border border-wood-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-wood-900 uppercase tracking-wider mb-1">
                    {t('location.phone')}
                  </h3>
                  <a
                    href="tel:052-242-1220"
                    className="font-body text-lg font-semibold text-wood-900 hover:text-emerald-600 transition-colors"
                  >
                    052-242-1220
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-wood-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-body text-sm font-semibold text-wood-900 uppercase tracking-wider mb-1">
                    {t('location.hours')}
                  </h3>
                  <p className="font-body text-base text-wood-800 font-medium">
                    {t('location.hours.value')}
                  </p>
                  <p className="font-body text-sm text-wood-500 mt-1">
                    ¥1,000 - ¥2,000 per person
                  </p>
                </div>
              </div>
            </div>

            {/* Price Badge */}
            <div className="flex items-center gap-3 bg-wood-900 rounded-2xl p-5">
              <span className="font-heading text-2xl font-bold text-gold-400">
                ¥1,000-2,000
              </span>
              <span className="font-body text-sm text-white/60">
                / person
              </span>
            </div>
          </div>

          {/* Map */}
          <div className="location-map lg:col-span-3">
            <div className="bg-white rounded-2xl overflow-hidden border border-wood-100 shadow-sm h-full min-h-[400px]">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SAMA-SAMA Halal Food Location"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
