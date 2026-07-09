import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, Globe, Phone } from 'lucide-react';

const navLinks = [
  { key: 'nav.home', href: '#home' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.menu', href: '#menu' },
  { key: 'nav.gallery', href: '#gallery' },
  { key: 'nav.reviews', href: '#reviews' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: typeof language; label: string }[] = [
    { code: 'id', label: 'ID' },
    { code: 'en', label: 'EN' },
    { code: 'jp', label: 'JP' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full container-padding">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2"
          >
            <span
              className={`font-heading text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-wood-900' : 'text-white'
              }`}
            >
              SAMA-SAMA
            </span>
            <span
              className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-full transition-colors duration-300 ${
                scrolled
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/20 text-white'
              }`}
            >
              HALAL
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`font-body text-sm font-medium transition-all duration-300 hover:opacity-100 ${
                  scrolled
                    ? 'text-wood-800 hover:text-emerald-600'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Phone - Desktop */}
            <a
              href="tel:052-242-1220"
              className={`hidden md:flex items-center gap-2 font-body text-sm font-medium transition-all duration-300 ${
                scrolled ? 'text-wood-800' : 'text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>052-242-1220</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className={`flex items-center gap-1.5 font-body text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 ${
                  scrolled
                    ? 'text-wood-800 hover:bg-wood-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              {langDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-wood-100 py-2 min-w-[100px] animate-in fade-in slide-in-from-top-2 duration-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 font-body text-sm transition-colors ${
                        language === lang.code
                          ? 'bg-emerald-50 text-emerald-600 font-semibold'
                          : 'text-wood-700 hover:bg-wood-50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? 'text-wood-800 hover:bg-wood-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-lg shadow-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-padding py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="font-body text-base font-medium text-wood-800 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-lg transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="tel:052-242-1220"
            className="flex items-center gap-2 font-body text-base font-medium text-emerald-600 px-4 py-3 mt-2"
          >
            <Phone className="w-5 h-5" />
            <span>052-242-1220</span>
          </a>
        </div>
      </div>
    </header>
  );
}
