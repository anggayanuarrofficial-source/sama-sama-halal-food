import { useLanguage } from '@/context/LanguageContext';
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.menu', href: '#menu' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.reviews', href: '#reviews' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Footer() {
  const { t } = useLanguage();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-wood-900 relative">
      {/* Top border */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="w-full container-padding py-16 md:py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-3xl font-bold text-white mb-3">
              SAMA-SAMA
            </h3>
            <p className="font-body text-sm text-white/60 leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-body text-xs text-emerald-400 font-medium">
                  Halal
                </span>
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="font-body text-sm text-white/60 hover:text-emerald-400 transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t('footer.hours')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-sm text-white/80">
                    {t('location.hours.value')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="font-body text-sm text-white/60 leading-relaxed">
                  〒460-0008 Aichi, Nagoya,
                  <br />
                  Naka Ward, Sakae, 3 Chome-9-1
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-5">
              {t('footer.contact')}
            </h4>
            <div className="space-y-3 mb-6">
              <a
                href="tel:052-242-1220"
                className="flex items-center gap-3 font-body text-sm text-white/80 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                052-242-1220
              </a>
            </div>

            {/* Social */}
            <h4 className="font-body text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {t('footer.follow')}
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40">
            {t('footer.copyright')}
          </p>
          <p className="font-body text-xs text-white/40">
            Made with love for Indonesian food lovers in Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
