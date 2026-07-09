import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Interior Restoran', category: 'Interior' },
  { src: '/images/gallery-2.jpg', alt: 'Ayam Penyet', category: 'Food' },
  { src: '/images/gallery-3.jpg', alt: 'Bakso', category: 'Food' },
  { src: '/images/gallery-4.jpg', alt: 'Suasana Pengunjung', category: 'Atmosphere' },
  { src: '/images/gallery-5.jpg', alt: 'Chef Cooking', category: 'Kitchen' },
  { src: '/images/gallery-6.jpg', alt: 'Mie Goreng Jawa', category: 'Food' },
];

export default function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-title > *',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-title', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.gallery-item',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.gallery-grid', start: 'top 85%' },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      if (e.key === 'ArrowRight') setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const goTo = (dir: number) => {
    setCurrentIndex((prev) => (prev + dir + galleryImages.length) % galleryImages.length);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-padding bg-cream-50 relative"
    >
      <div className="w-full container-padding">
        {/* Title */}
        <div className="gallery-title text-center mb-12 md:mb-16">
          <span className="inline-block font-body text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-4">
            {t('gallery.subtitle')}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-wood-900">
            {t('gallery.title')}
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="gallery-grid grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`gallery-item group relative overflow-hidden rounded-xl md:rounded-2xl cursor-pointer ${
                index === 0 || index === 3 ? 'row-span-2' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative ${index === 0 || index === 3 ? 'h-full min-h-[300px] md:min-h-[500px]' : 'h-48 md:h-64'}`}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-wood-900/0 group-hover:bg-wood-900/40 transition-all duration-300 flex items-end">
                  <div className="p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-body text-xs text-emerald-400 font-medium uppercase tracking-wider">
                      {img.category}
                    </span>
                    <p className="font-heading text-lg md:text-xl text-white font-semibold">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-wood-900/95 backdrop-blur-lg flex items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1); }}
            className="absolute left-4 md:left-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1); }}
            className="absolute right-4 md:right-8 text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-in zoom-in-95 duration-200"
            />
            <div className="text-center mt-4">
              <span className="font-body text-sm text-emerald-400 font-medium uppercase tracking-wider">
                {galleryImages[currentIndex].category}
              </span>
              <p className="font-heading text-xl text-white mt-1">
                {galleryImages[currentIndex].alt}
              </p>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-6 bg-emerald-400' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
