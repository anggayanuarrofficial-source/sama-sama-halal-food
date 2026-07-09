import { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // TODO: ganti dengan nomor WhatsApp toko, format internasional tanpa + dan tanpa 0
  //       contoh Jepang: 819012345678
  const whatsappNumber = '';
  const hasWhatsapp = whatsappNumber.length > 0;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Halo%20SAMA-SAMA!%20Saya%20ingin%20reservasi%20meja.`;

  return (
    <>
      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Popup */}
      <div
        className={`fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-wood-100 p-5 w-72 transition-all duration-300 ${
          isOpen && visible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-wood-900">
              Chat dengan Kami
            </h4>
            <p className="font-body text-xs text-wood-500">
              Reservasi & Tanya Menu
            </p>
          </div>
        </div>
        {hasWhatsapp && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-body text-sm font-medium py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        )}
        <a
          href="tel:052-242-1220"
          className={`flex items-center justify-center gap-2 w-full ${hasWhatsapp ? 'mt-2 bg-wood-100 hover:bg-wood-200 text-wood-800' : 'bg-emerald-500 hover:bg-emerald-600 text-white'} font-body text-sm font-medium py-3 rounded-xl transition-colors`}
        >
          <Phone className="w-4 h-4" />
          Telepon
        </a>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
