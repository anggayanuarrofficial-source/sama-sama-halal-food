import { Link } from 'react-router';
import { useLanguage } from '@/context/LanguageContext';
import { useMenu, type MenuItem } from '@/hooks/useMenu';
import { ArrowLeft } from 'lucide-react';

function itemName(item: MenuItem, language: string): string {
  if (language === 'jp') return item.name_ja || item.name;
  if (language === 'en') return item.name_en || item.name;
  return item.name;
}

function subName(item: MenuItem, language: string): string | null {
  // Tampilkan nama Jepang sebagai sub kalau bahasa aktif bukan Jepang
  if (language !== 'jp' && item.name_ja) return item.name_ja;
  if (language === 'jp' && item.name_en) return item.name_en;
  return null;
}

export default function MenuPage() {
  const { t, language } = useLanguage();
  const { categories, loading, error } = useMenu();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-wood-500">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-wood-500">Gagal memuat menu</div>;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-wood-900 text-white py-12 md:py-16">
        <div className="max-w-5xl mx-auto container-padding">
          <Link to="/" className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-body text-sm mb-6">
            <ArrowLeft className="w-4 h-4" />
            {t('nav.home')}
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold">
            {t('menu.fullTitle')}
          </h1>
        </div>
      </div>

      {/* Kategori */}
      <div className="max-w-5xl mx-auto container-padding py-12 md:py-16">
        {categories.map((cat) => {
          const available = cat.menu_items.filter((i) => i.is_available);
          if (available.length === 0) return null;
          return (
            <div key={cat.id} className="mb-14">
              <div className="flex items-baseline gap-3 mb-6 border-b-2 border-emerald-500 pb-3">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-wood-900">{cat.name}</h2>
                {cat.name_ja && <span className="font-body text-sm text-wood-400">{cat.name_ja}</span>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {available.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm border border-wood-100">
                    <img
                      src={item.image_url || '/images/placeholder-dish.jpg'}
                      alt={itemName(item, language)}
                      loading="lazy"
                      className="w-20 h-20 rounded-lg object-cover bg-wood-100 flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder-dish.jpg'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <h3 className="font-heading font-bold text-wood-900 leading-tight">
                          {itemName(item, language)}
                        </h3>
                        <span className="font-heading font-bold text-emerald-600 whitespace-nowrap">
                          {item.price ? `¥${item.price.toLocaleString()}` : '—'}
                        </span>
                      </div>
                      {subName(item, language) && (
                        <p className="font-body text-sm text-wood-400 mt-0.5 truncate">
                          {subName(item, language)}
                        </p>
                      )}
                      {item.description && (
                        <p className="font-body text-xs text-wood-500 mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
